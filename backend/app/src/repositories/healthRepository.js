import client from '../clients/mongooseClient.js';

export async function ping() {
  
  await client.get();

  return { status: 'ok' };
}

