const User = require('../models/user.model');
const WalletController = require('../controllers/wallet.controller');

class UserController {
	static async get(_id) {
		return await User.findById(_id);
	}
	static async set(_user) {
		const editUser = await User.findByIdAndUpdate(_user._id, _user);
		return editUser;
	}
	static async add(_user) {
		const newUser = await User.create(_user);
		WalletController.add({ user: newUser._id, amount: 10000, movements: [] });
		return newUser;
	}
	static async delete(_id) {
		return await User.findByIdAndRemove(_id);
	}
	static async list() {
		return await User.find();
	}
	static async findOne(_filter) {
		return await User.findOne(_filter);
	}
}

module.exports = UserController;
