const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
	{
		date: { type: Date, required: true },
		user: { type: mongoose.SchemaTypes.ObjectId, required: true },
		stock: { type: mongoose.SchemaTypes.ObjectId, required: true },
		type: { type: String, enum: ['buy', 'sell'], required: true },
		units: { type: Number, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);
transactionSchema.virtual('total').get(function () {
	return this.units * this.price;
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
