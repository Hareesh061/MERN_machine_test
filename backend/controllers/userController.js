const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = new User({ userName, password });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { registerUser, loginUser };
