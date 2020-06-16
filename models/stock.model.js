const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	user: { type: mongoose.SchemaTypes.ObjectId, required: true },
	symbol: { type: String, required: true },
	name: { type: String, required: true },
	units: { type: Number, required: true },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;