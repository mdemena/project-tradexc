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
}
module.exports = LogController;
