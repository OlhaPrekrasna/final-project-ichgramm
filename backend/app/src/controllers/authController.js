import userRepo from '../repositories/userRepository.js';
import { encrypt, compare } from '../utils/hashEncoder.js';
import generateToken from '../utils/createJWT.js';

// Регистрация пользователя
export const signup = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await userRepo.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this username and/or email already exists',
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

    // создаём JWT с id нового пользователя
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

// Авторизация пользователя
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepo.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // создаём JWT с id пользователя
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

// Функция для обновления пароля
// export const updatePassword = async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     const { email, newPassword } = req.body;

//     if (!email || !newPassword) {
//       return res
//         .status(400)
//         .json({ message: 'The required data was not transmitted' });
//     }

//     // Хеширую новый пароль перед сохранением
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Нахожу пользователя по email
//     const user = await userRepo.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Обновляю пароль пользователя
//     userRepo.password = hashedPassword;

//     // Сохраняю обновления
//     await userRepo.save();

//     return res
//       .status(200)
//       .json({ message: 'The password has been updated successfully' });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return res
//       .status(500)
//       .json({ message: 'Error updating password', error: error.message });
//   }
// };

// "password": "123456",



//////////////////////////////////////////////////////////

// import userRepo from '../repositories/userRepository.js';
// import { encrypt, compare } from '../utils/hashEncoder.js';
// import generatedToken from '../utils/createJWT.js';

// // Регистрация пользователя
// export const signup = async (req, res) => {
//   const { username, email, password, first_name, last_name } = req.body;

//   try {
//     const existingUser = await userRepo.findOne({ $or: [{ username }, { email }]});
//     if (existingUser) {
//       return res.status(400).json({
//         message: 'User with this username and/or email already exists',
//       });
//     }

//     const hashedPassword = await encrypt(password);
//     const newUser = await userRepo.create({
//       username,
//       email,
//       password: hashedPassword,
//       first_name,
//       last_name,
//     });

//     const token = generatedToken;

//     res.status(201).json({
//       message: 'User successfully created',
//       user: newUser,
//       token,
//     });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({
//       message: 'Error creating user',
//       error: error.message,
//     });
//   }
// };

// // Авторизация пользователя
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Ищу пользователя по email
//     const user = await userRepo.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Incorrect email' });
//     }

//     // Проверяю пароль
//     const isMatch = await compare(password, userRepo.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Incorrect password' });
//     }

//     // Генерирую токен
//     const token = generatedToken;
//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: 'Authorization error', error: error.message });
//   }
// };

// export const checkUser = async (req, res) => {
//   const { email } = req.body;
//   // Проверяю пользователя
//   const user = await userRepo.findOne({ email });
//   if (user) {
//     res.status(200).json({ message: 'User found' });
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// };

////////////////////////////////////////////////////////////////////////


