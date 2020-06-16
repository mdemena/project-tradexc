const Wallet = require('../models/user.model');
const Log = require('../controllers/log.controller');
const LogController = require('../controllers/log.controller');

class WalletController {
	static async get(_id) {
		const wallet = await Wallet.findById(_id);
		wallet.populate('user');
		return wallet;
	}
	static async set(_wallet) {
		const editWallet = await Wallet.findByIdAndUpdate(_wallet._id, _wallet);
		if (editWallet) {
			editWallet.populate('user');
			await registerLog(editWallet, 'Editing');
		}
		return editWallet;
	}
	static async add(_wallet) {
		const newWallet = await Wallet.create(_wallet);
		if (newWallet) {
			await registerLog(newWallet, 'New');
			this.addMovement(newWallet._id, {
				date: new Date(),
				type: 'deposit',
				amount: newWallet.amount,
			});
		}
		return newWallet;
	}
	static async addMovement(_id, _movement) {
		const movWallet = await this.get(_id);
		if (movWallet) {
			movWallet.movements.push(_movement);
			await registerLog(movWallet, 'New movement in');
		}
		return this.set(movWallet);
	}
	static async delete(_id) {
		const delWallet = await Wallet.findByIdAndRemove(_id);
		if (delWallet) {
			await registerLog(delWallet, 'Deleting');
		}
		return delWallet;
	}
	static async list() {
		return await Wallet.find();
	}
	static async findOne(_filter) {
		return await Wallet.findOne(_filter);
	}
}

async function registerLog(_wallet, _action) {
	await LogController.add({
		date: new Date(),
		user: _wallet.user,
		description: `${_action} wallet ${_wallet._id} of user ${_wallet.user}`,
	});
}

module.exports = WalletController;
