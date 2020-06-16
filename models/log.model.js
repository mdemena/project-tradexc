const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    date: {type:Date, required:true},
	user: { type: mongoose.SchemaTypes.ObjectId, required: true },
	description: { type: String, required: true },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;