import jwt from 'jsonwebtoken';

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_JWT);
  const { id } = decoded;

  return id;
};

export default getUserIdFromToken;
