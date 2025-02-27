// Gestion des erreurs globales
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Import des modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();
require('./config/db');

// Import des routes
const authRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');
const RoleRoutes = require('./routes/role.routes');
const CategoryRoutes = require('./routes/category.routes');
const ProductRoutes = require('./routes/product.routes');
const OrderRoutes = require('./routes/order.routes');
const StripeRoutes = require('./routes/stripe.routes');
const NotificationRoutes = require('./routes/notification.routes');
const DashboardRoutes = require('./routes/dashboard.routes');

// Import des middlewares
const { requiAuth } = require('./milddleware/auth');
const recordVisit = require('./milddleware/recordVisit');

// Initialisation d'Express et du serveur HTTP
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const CLIENT_URL= process.env.CLIENT_URL  
const ADMIN_URL = process.env.ADMIN_URL

// Configuration de CORS
const allowedOrigins = [
 CLIENT_URL,
 ADMIN_URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Permet l'envoi des cookies
  optionsSuccessStatus: 200
};

// const corsOptions = {
//   origin: function (origin, callback) {
//     return callback(null, true);
//   },
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// Middlewares globaux
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/uploads', express.static(path.join(__dirname, 'shared/uploads')));
app.use(recordVisit);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.ADMIN_URL,
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('authenticate', (userId) => {
    console.log(`👤 Utilisateur authentifié: ${userId}`);
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/roles', RoleRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/notifications', NotificationRoutes);
app.use('/api/stripe', StripeRoutes);
app.use('/api/dashboard', DashboardRoutes);

// Route d'autorisation utilisateur
app.get('/api/userAutorised', requiAuth, (req, res) => {
  res.status(200).send(req.userautorised);
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔑 Refresh Token Type: ${typeof process.env.REFRESH_TOKEN}`);
});
