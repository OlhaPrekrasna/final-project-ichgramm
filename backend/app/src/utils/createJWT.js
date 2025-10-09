import jwt from 'jsonwebtoken';

// секретный ключ 
const SECRET = process.env.SECRET_JWT || 'supersecret';
const EXPIRES_IN = '7d';

// функция для генерации токена
export default function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

