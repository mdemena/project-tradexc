const User = require('../models/user.model');
const WalletController = require('../controllers/wallet.controller');
const LogController = require('../controllers/log.controller');

class UserController {
	static async get(_id) {
		return await User.findById(_id);
	}
	static async set(_user) {
		const editUser = await User.findByIdAndUpdate(_user._id, _user, {
			new: true,
		});
		if (editUser) {
			await this.registerLog(editUser, 'Editing');
		}
		return editUser;
	}
	static async add(_user) {
		try {
			const newUser = await User.create(_user);
			const newWallet = await WalletController.add({
				user: newUser._id,
				amount: 0,
				movements: [],
			});
			await this.registerLog(newUser, 'New');
			return { newUser, newWallet };
		} catch (err) {
			throw err;
		}
	}
	static async delete(_id) {
		const delUser = await User.findByIdAndRemove(_id);
		if (delUser) {
			await this.registerLog(delUser, 'Deleting');
		}
		return delUser;
	}
	static async list() {
		return await User.find();
	}
	static async findOne(_filter) {
		return await User.findOne(_filter);
	}
	static async registerLog(_user, _action) {
		await LogController.register(`${_action} user ${_user._id}`, _user._id);
	}
}

module.exports = UserController;
