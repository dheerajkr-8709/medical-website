const Order = require('../models/Order');

// Create order (Guest Order)
exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, landmark, items, totalAmount, paymentMethod, distance } = req.body;
    
    const newOrder = new Order({
      customerName,
      phone,
      address,
      landmark,
      items,
      totalAmount,
      paymentMethod,
      distance
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders (supports phone filter)
exports.getOrders = async (req, res) => {
  try {
    const { phone } = req.query;
    let query = {};
    if (phone) {
      query.phone = phone;
    }
    
    console.log(`➡️ Fetching orders with query:`, JSON.stringify(query));
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Could not fetch orders" });
  }
};

// Update order status (Admin Only)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Placed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'];
    
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Broadcast status change via Socket.io
    const io = req.app.get('socketio');
    if (io) {
      io.to(order._id.toString()).emit('orderStatusUpdated', order);
    }
    
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
