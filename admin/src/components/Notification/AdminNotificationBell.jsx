import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Bell } from 'lucide-react';
import { removeTrailingZeros } from '../../utils/truncateText';
import formatNumberWithSeparators from '../../utils/numberSeparator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../actions/orderAction/order.action';
import { useTheme } from '../../context/ThemeContext';

const socket = io(import.meta.env.VITE_API_SOCKET_URL);

const AdminNotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {

    socket.on('connect', () => {
      console.log('✅ Connecté au WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('❌ Déconnecté du WebSocket');
    });

    socket.on('newOrder', (data) => {
      console.log("🆕 Nouvelle commande reçue:", data);
    });
    // Écouter toutes les nouvelles commandes
    socket.on('newOrder', (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      playNotificationSound();
    });

    // Charger les notifications existantes
    fetchNotifications();

    return () => {
      socket.off('newOrder');
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${apiUrl}/notifications`);
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.play().catch((e) => console.log('Audio play failed:', e));
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Marquer toutes les notifications comme lues quand on ouvre le panneau
      setUnreadCount(0);
      markAllAsRead();
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${apiUrl}/notifications/mark-all-read`, {
        method: 'PUT',
      });
      const updatedNotifications = notifications.map((notif) => ({
        ...notif,
        isRead: true,
      }));
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleOrderClick = (orderId) => {
    dispatch(getOrder(orderId));
    navigate(`/order-detail/${orderId}`);
  };

  return (
    <div className="relative">
      {/* Bouton cloche avec compteur */}
      <button
        onClick={handleBellClick}
        className={`relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none`}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panneau de notifications */}
      {isOpen && (
        <div className={`absolute w-64 299bp:-right-16 md:right-0 lg:-left-48 mt-2 299bp:w-80 md:w-96 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'} rounded-lg shadow-xl z-50`}>
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className="text-lg font-semibold">Notifications des commandes</h3>
          </div>
          <div className="max-h-[600px] h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500">
                Aucune nouvelle commande
              </p>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  onClick={() => handleOrderClick(notification.order)}
                  className={`p-4 border-b cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${!notification.isRead ? theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50' : ''}`}
                >
                  <p className="text-sm">total produits: {notification.totalProduct}, prix total: {formatNumberWithSeparators(removeTrailingZeros(notification.totalPrice).toFixed(2), ' ')} €</p>
                  <p className="text-xs mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationBell;