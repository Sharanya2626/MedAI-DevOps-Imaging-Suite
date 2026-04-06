import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const user = await User.create({ name, email, password, role: 'Clinician' });
  res.status(201).json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }
};
