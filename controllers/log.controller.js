const Log = require('../models/log.model');

class LogController {
	static async add(_log) {
		return await Log.create(_log);
	}
	static async list() {
		return await Log.find();
	}
	static async findOne(_filter) {
		return await Log.findOne(_filter);
	}
	static async register(_description, _userId) {
		await this.add({
			date: new Date(),
			user: _userId,
			description: `${_action} wallet ${_wallet._id} of user ${_wallet.user}`,
		});
	}
}
module.exports = LogController;
