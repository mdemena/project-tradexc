const Wallet = require('../models/user.model');
const LogController = require('../controllers/log.controller');

class WalletController {
	static async getByUserId(_id) {
		const wallet = await Wallet.findOne({ user: _id });
		if (wallet) {
			wallet.populate('user');
		}
		return wallet;
	}
	static async get(_id) {
		const wallet = await Wallet.findById(_id);
		if (wallet) {
			wallet.populate('user');
		}
		return wallet;
	}
	static async set(_wallet) {
		const editWallet = await Wallet.findByIdAndUpdate(_wallet._id, _wallet);
		if (editWallet) {
			editWallet.populate('user');
			await this.registerLog(editWallet, 'Editing');
		}
		return editWallet;
	}
	static async add(_wallet) {
		const newWallet = await Wallet.create(_wallet);
		if (newWallet) {
			await this.registerLog(newWallet, 'New');
			this.deposit(newWallet._id, 'deposit', newWallet.amount);
		}
		return newWallet;
	}
	static async deposit(_id, _amount) {
		return await this.addMovement(_id, 'deposit', _amount);
	}
	static async widthdraw(_id, _amount) {
		try {
			return await this.addMovement(_id, 'widthdraw', _amount);
		} catch (err) {
			throw err;
		}
	}
	static async addMovement(_id, _type, _amount) {
		const movWallet = await this.get(_id);
		if (movWallet) {
			switch (_type) {
				case 'buy':
				case 'widthdraw':
					if (movWallet.amount - _movement.amount < 0) {
						throw new Error(
							`You don't have sufficient amount for this widthdraw`
						);
					} else {
						movWallet.amount -= _movement.amount;
					}
					break;
				default:
					movWallet.amount += _movement.amount;
					break;
			}
			movWallet.movements.push({
				date: new Date(),
				type: _type,
				amount: _amount,
			});
			await this.registerLog(movWallet, 'New movement in');
			return this.set(movWallet);
		}
		return movWallet;
	}
	static async delete(_id) {
		const delWallet = await Wallet.findByIdAndRemove(_id);
		if (delWallet) {
			await this.registerLog(delWallet, 'Deleting');
		}
		return delWallet;
	}
	static async list() {
		return await Wallet.find();
	}
	static async findOne(_filter) {
		return await Wallet.findOne(_filter);
	}
	static async registerLog(_wallet, _action) {
		await LogController.register(
			`${_action} wallet ${_wallet._id} of user ${_wallet.user}`,
			_wallet.user
		);
	}
}

module.exports = WalletController;
