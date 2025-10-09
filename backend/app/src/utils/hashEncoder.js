import bcrypt from 'bcrypt';

export async function encrypt(str) {
  const hash = await bcrypt.hash(str, 10);

  return hash;
}

export async function compare(str, hash) {
  return bcrypt.compare(str, hash);
}
