import { ping } from '../repositories/healthRepository.js';

export const healthCheck = async (_, res) => {
  return res.status(200).json({ status: 'ok' });
};

export const healthWithDbCheck = async (_, res) => {
  try {
    await ping();
    return res.status(200).json({ status: 'ok', component: 'db' });
  } catch (e) {
    console.error('ERROR HealthController:', e);
    return res.status(500).json({ status: 'nok', component: 'db' });
  }
};
