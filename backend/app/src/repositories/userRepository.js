import User from '../models/userModel.js';

class UserRepository {
  async find(query = {}) {
    return await User.find(query);
  }

  async findOne(filter = {}) {
  
    return await User.findOne(filter).select('+password');
  }

  async create(data) {
    const newUser = await User.create(data);
    const { password, ...res } = newUser.toJSON();
    return res;
  }

  async updateById(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select('-password');
  }

  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();

