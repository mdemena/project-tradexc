const Transaction = require('../models/transaction.model');

class TransactionController {
	static async add(_transaction) {
		const newTransaction = await Transaction.create(_transaction);
		if (newTransaction) {
			await this.registerLog(newTransaction, 'New');
		}
		return newTransaction;
	}
	static async list() {
		return await Transaction.find().populate('user').populate('stock');
	}
	static async listByUser(_userId) {
		return await Transaction.find({ user: _userId })
			.populate('user')
			.populate('stock');
	}
	static async findOne(_filter) {
		return await Transaction.findOne(_filter);
	}
	static async registerLog(_transaction, _action) {
		await LogController.register(
			`${_action} transaction ${_transaction._id} of user ${_transaction.user}`,
			_transaction.user
		);
	}
}
module.exports = TransactionController;
