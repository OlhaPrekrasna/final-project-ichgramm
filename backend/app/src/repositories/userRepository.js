import User from '../models/userModel.js';

class UserRepository {
  async find(query = {}) {
    return await User.find(query);
  }

  async findOne(filter = {}) {
    // Добавляем +password, чтобы при поиске можно было сравнить хэш
    return await User.findOne(filter).select('+password');
  }

  async create(data) {
    const newUser = await User.create(data);
    const { password, ...res } = newUser.toJSON();
    return res;
  }
}

export default new UserRepository();



/////////////////////////////////////////////////

// import User from '../models/userModel.js';

// class UserRepository {
//   async find(query = {}) {
//     return await User.find(query);
//   }

//   async findOne(username = null, email = null) {
//     if (!username && !email) {
//       throw new Error('At least one of username or email must be provided for search');
//     }

//     return await User.findOne({ $or: [{ email }, { username }] });
//   }

//   async create(data) {
//     const newUser = await User.create(data);
//     const { password, ...res } = newUser.toJSON();

//     return res;
//   }
// }


// export async function findOne(query = {}, options = {}) {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(users);
    
//     return await collection.findOne(query, options);
    ///////////// const users = [];
    ///////////// result.forEach((row) => users.push(User.create(row)));
//   } catch (error) {
//     console.error('Error finding record:', error);
//   } finally {
//     await client.close();
//   }
// }

// export default new UserRepository();

/////////////////////////////////////////////////////////

// export async function create(data) {
//   // timestamp
//   const user = {
//     ...data,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     return await collection.insertOne(user);
//   } catch (error) {
//     console.error('Error creating record:', error);
//   } finally {
//     await client.close();
//   }
// }

// export async function findUserById(id) {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     const objectId = new ObjectId(id);

//     const user = await collection.findOne({ _id: objectId });

//     return user;
//   } catch (error) {
//     console.error('Error finding user by id:', error);
//   } finally {
//     await client.close();
//   }
// }

////////////////////////////////////////////////////////////

// export async function updateOne(filter, update, options = {}) {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     const result = await collection.updateOne(filter, update, options);
//     return {
//       success: true,
//       matchedCount: result.matchedCount,
//       modifiedCount: result.modifiedCount,
//     };
//   } catch (error) {
//     console.error('Error updating record:', error);
//     return { success: false, error: error.message };
//   } finally {
//     await client.close();
//   }
// }

// export async function deleteOne(filter, options = {}) {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     const result = await collection.deleteOne(filter, options);
//     return {
//       success: true,
//       deletedCount: result.deletedCount,
//     };
//   } catch (error) {
//     console.error('Error deleting record:', error);
//     return { success: false, error: error.message };
//   } finally {
//     await client.close();
//   }
// }

// export async function findUserByEmail(email) {
//   return await findOne({ email: email });
// }

// export async function createPost(postData) {
//   const postRecord = {
//     ...postData,
//     createdAt: new Date(),
//     likes: 0,
//     comments: [],
//   };

//   return await write(postRecord);
// }

// export async function findPostsByUser(userId) {
//   return await find({ userId: userId });
// }
