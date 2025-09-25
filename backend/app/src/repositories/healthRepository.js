import client from '../clients/mongooseClient.js';

export async function ping() {
  // trigger client connect and wait if it succeed
  await client.get();

  return { status: 'ok' };
}

// import client from '../clients/mongoDbClient.js';

// const dbName = 'ichgramm';

// export async function ping() {
//   try {
//     await client.connect();
//     await client.db(dbName).command({ ping: 1 });
//     console.log(
//       'Pinged your collection. You successfully connected to MongoDB!'
//     );
//     return { status: "ok", message: 'Connection successful' };
//   } catch (error) {
//     console.error('Connection error:', error);
//     return { status: "nok", error: error.message };
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
