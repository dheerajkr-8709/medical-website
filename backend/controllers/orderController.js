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

// Get all orders (Admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update status (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
