import userRepo from '../repositories/userRepository.js';
import { encrypt, compare } from '../utils/hashEncoder.js';
import generateToken from '../utils/createJWT.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// User registration
export const signup = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await userRepo.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'A user with this username and/or email already exists',
      });
    }

    const hashedPassword = await encrypt(password);
    const newUser = await userRepo.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    // create JWT with the id of the new user
    const token = generateToken({ id: newUser._id });

    res.status(201).json({
      message: 'User successfully created',
      user: newUser,
      token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepo.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // create JWT with the user id
    const token = generateToken({ id: user._id });

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Authorization error',
      error: error.message,
    });
  }
};

// Function to update password
export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: 'Required data was not provided' });
    }

    // Find user
    const user = await userRepo.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: 'Password has been updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res
      .status(500)
      .json({ message: 'Error updating password', error: error.message });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userRepo.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const secret = process.env.SECRET_JWT;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '15m' });

    const resetLink = `http://localhost:3001/api/v1/auth/reset-password?token=${user._id}/${token}`;

    await sendEmail(
      user.email,
      'Password Reset',
      `Click here to reset your password: ${resetLink}`
    );

    res
      .status(200)
      .json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error sending reset link', error: error.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  // const { userId, token, newPassword } = req.body;
  const token = req.query.token;

  // TODO: change this logic
  res
    .status(200)
    .json({ message: 'Password has been reset successfully', token });
  return;

  try {
    const user = await userRepo.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const secret = process.env.SECRET_JWT;
    jwt.verify(token, secret);

    const hashedPassword = await encrypt(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: 'Invalid or expired token', error: error.message });
  }
};
