import jwt from 'jsonwebtoken';

// секретный ключ (обязательно вынеси в .env)
const SECRET = process.env.JWT_SECRET || 'supersecret';
const EXPIRES_IN = '7d';

// функция для генерации токена
export default function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}



// import crypto from 'crypto';

// const token = crypto.randomBytes(64).toString('base64');
// // console.log(token);

// export default token;
