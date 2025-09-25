import mongoose from 'mongoose';

class MongooseClient {
  #uri = process.env.MONGO_URL;
  #client;

  constructor() {
    this.#client = mongoose;
    this.connect();
  }

  get() {
    return this.#client;
  }

  connect() {
    this.#client
      .connect(this.#uri)
      .catch((err) => console.error('Connect error: ', err));
  }
}

export default new MongooseClient();
