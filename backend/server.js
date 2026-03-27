const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(morgan('dev'));

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

// Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Socket.io for real-time status updates
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinOrder', (orderId) => {
    socket.join(orderId);
    console.log(`Socket ${socket.id} joined order ${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Export io to be used in controllers
app.set('socketio', io);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Database Connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medical-shop')
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB Connection Error:', err));
