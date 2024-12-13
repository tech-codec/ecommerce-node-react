import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import AddEditUserModal from '../components/Modals/UserModals/AddEditUserModal';
import ViewUserModal from '../components/Modals/UserModals/ViewUserModal';
//import { usersData } from '../assets/data';
import { useTheme } from '../context/ThemeContext';
import { FaPencil, FaRegEye } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import DeleteUserModal from '../components/Modals/UserModals/DeleteUserModal';
import ResetPasswordUserModal from '../components/Modals/UserModals/ResetPasswordUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { extractUploads } from '../utils/truncateText';
import { addUser, adminUpdateUser, deleteUser, resetPasswordUser, updateStatusUser} from '../actions/userAction/user.action';
import { TbRadioactive, TbRadioactiveOff } from "react-icons/tb";
import { MdOutlineLockOpen } from "react-icons/md";
import { selectedROlejoin } from '../utils/selectedRoles';
import LoadingLoader from "../components/LoadingLoader"


const Users = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { theme } = useTheme()
  const userState = useSelector(state => state.user)
  const roleState = useSelector(state => state.roles)
  const dispatch = useDispatch()
  const { loading, usersData, error } = userState
  const { rolesData } = roleState
  const [users, setUsers] = useState(usersData);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // Gestion des données filtrées
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  // Gestion de la recherche et de la pagination
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  // Fonctions de gestion des utilisateurs
  const handleAdd = () => {
    setCurrentUser({ name: '', firstName: "", phoneNumber: "", email: '', roles: [] });
    setShowModal(true);
  };


  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleShowResetPassword = (user) => {
    setCurrentUser(user);
    setShowResetPasswordModal(true)
  };

  const handleResetPasswordSave = (user) => {
    const {password, confirmPassword} = user
    dispatch(resetPasswordUser(user._id, {password, confirmPassword}))
    setShowResetPasswordModal(false)
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleShowDelete = (id) => {
    setCurrentUserId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    dispatch(deleteUser(id))
    setShowDeleteModal(false)
  };

  const toggleStatusUser = (user) => {
    console.log("mon user: ", JSON.stringify(user));
    if (user) {

      const updatedFormUser = {
        _id: user._id || null,
        name: user.name || '',
        firstName: user.firstName || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        roles: user.roles || [],
        bio: user.bio || '',
        image: user.image || null,
        isActive: !user.isActive || false
      };

      // Mettez à jour la liste des utilisateurs avec la nouvelle valeur de formUser
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? updatedFormUser : u))
      );

      // Dispatch avec les nouvelles valeurs
      dispatch(updateStatusUser(updatedFormUser._id, { isActive: updatedFormUser.isActive }));

      console.log("mon user mis à jour: ", JSON.stringify(updatedFormUser));
      return updatedFormUser;

    }
  };

  // Utilitaire pour convertir FormData en objet simple
  // const formDataToObject = (formData) => {
  //   const obj = {};
  //   for (let [key, value] of formData.entries()) {
  //     obj[key] = value;
  //   }
  //   return obj;
  // };

  const handleSave = (userState, userFomdata) => {
    if (userState._id) {
      setUsers(prevUsers => prevUsers.map(u => (u._id === userState._id ? userState : u)));
      console.log("test pb: " + JSON.stringify(userState))
      dispatch(adminUpdateUser(userState._id, userFomdata))
    } else {
      setUsers(prevUsers => [...prevUsers, userState]);
      dispatch(addUser(userFomdata))
    }
    setShowModal(false);
    const { image } = userState
    console.log(`test pb2: et le id:${userState._id} " "  ${JSON.stringify(image)}`)
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  };
  // Calcul de la plage des entrées visibles
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, filteredUsers.length);

  return (
    loading
      ?
      <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
        <LoadingLoader />
        <p className='text-xl text-gray-500 text-center mt-3 '>patienté quelque minutes le temps que les données chargent</p>
      </div>
      :
    <div className="w-full">
      <div className=' mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} `}>Tous les utilisateurs</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Utilisateur</span></h4>
      </div>
      <div className="flex justify-between mb-4 flex-wrap gap-3">
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-green-700' onClick={handleAdd}>Ajouter un utilisateur</button>
        <input value={search} className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent' placeholder="Recherche..." onChange={handleSearchChange} />
        <button className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700' onClick={handleExport}>Exporter vers Excel</button>
      </div>

      <div className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto rounded-md shadow-2xl text-gray-500`}>
        <table className='w-1400px xl:w-full'>
          <thead>
            <tr>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>ID</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Photo</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Nom</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Prénom</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Email</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Rôle(s)</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Status</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Téléphone</th>
              <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{start + index}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}><img className='w-10 h-10 bg-repeat bg-center rounded-full' src={typeof user.image === 'string' ? apiUrl + extractUploads(user.image) : user.image instanceof File ? URL.createObjectURL(user.image) : "/uploads/images/avatar_image.png"} alt="image" /> </td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{user.name}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{user.firstName}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{user.email}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{selectedROlejoin(user.roles, rolesData)}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                  <div className={`w-14 h-8 flex items-center  ${user.isActive ? "bg-green-700 " : "bg-gray-600"} text-gray-500 rounded-3xl px-1 cursor-pointer`} onClick={() => toggleStatusUser(user)} >
                    <div className={`w-6 h-6 text-lg flex items-center justify-center bg-white rounded-full transform transition-transform duration-500 ease-in-out ${!user.isActive ? "translate-x-6" : "translate-x-0"} `}>
                      {user.isActive
                        ?
                        <TbRadioactive />
                        :
                        <TbRadioactiveOff />
                      }
                    </div>
                  </div>

                </td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{user.phoneNumber}</td>
                <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleEdit(user)}><span className='text-gray-500'><FaPencil /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleShowDelete(user._id)}><span className='text-red-800'><RiDeleteBin6Line /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleView(user)}><span className='text-gray-500'><FaRegEye /></span></button>
                  <button className="bg-transparent  px-2 py-1 m-1" onClick={() => handleShowResetPassword(user)}><span className='text-gray-500'><MdOutlineLockOpen /></span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          className="border border-gray-300 p-2 rounded-md bg-gray-300 shadow-2xl"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <div>
          <span className="text-sm text-gray-700 font-semibold">
            Affichage de {start} à {end} sur {filteredUsers.length} entrées
          </span>
        </div>
        <div className='flex items-center justify-between text-white'>
          <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2" disabled={page === 0} onClick={() => setPage(page - 1)}><span><IoChevronBackSharp /></span>Précédent</button>
          <button className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2" disabled={(page + 1) * rowsPerPage >= filteredUsers.length} onClick={() => setPage(page + 1)}>Suivant <span><IoChevronForwardSharp /></span> </button>
        </div>

      </div>

      <AddEditUserModal
        show={showModal}
        user={currentUser}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
      />

      <ResetPasswordUserModal
        show={showResetPasswordModal}
        user={currentUser}
        onSave={handleResetPasswordSave}
        onClose={() => setShowResetPasswordModal(false)}
      />

      <DeleteUserModal
        show={showDeleteModal}
        currentUserId={currentUserId}
        onDelete={handleDelete}
        onClose={() => setShowDeleteModal(false)}
      />

      <ViewUserModal
        show={showViewModal}
        user={viewUser}
        onClose={() => setShowViewModal(false)}
      />
    </div>
  );
};

export default Users;
