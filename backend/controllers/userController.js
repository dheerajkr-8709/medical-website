const User = require('../models/User');

// Mock login/register based on phone number
exports.loginOrRegister = async (req, res) => {
  try {
    const { phone, name, address } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({
        phone,
        name: name || 'Valued Customer',
        address: address || { street: 'Runnisaidpur', city: 'Sitamarhi', state: 'Bihar', zip: '843328' }
      });
      await user.save();
      console.log(`🆕 New user registered: ${phone}`);
    } else {
      user.lastLogin = Date.now();
      await user.save();
      console.log(`✅ User logged in: ${phone}`);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Sync cart
exports.syncCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cart: cart },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error('❌ Sync Cart Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { cart: [] });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
