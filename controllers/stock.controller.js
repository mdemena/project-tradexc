const Stock = require('../models/stock.model');
const WalletController = require('../controllers/wallet.controller');
const TransactionController = require('../controllers/transaction.controller');
const LogController = require('../controllers/log.controller');
const Transaction = require('../models/transaction.model');

class StockController {
	static async get(_id) {
		const stock = await Stock.findById(_id);
		if (stock) {
			stock.populate('user');
			stock.populate('stock');
		}
		return stock;
	}
	static async add(_stock) {
		const newStock = await Stock.create(_stock);
		if (newStock) {
			this.registerLog(newStock, 'New');
		}
		return newStock;
	}
	static async set(_stock) {
		const editStock = await Stock.findByIdAndUpdate(_stock._id, _stock);
		if (editStock) {
			this.registerLog(newStock, 'Editing');
		}
		return editStock;
	}
	static async buy(_userId, _symbol, _type, _units) {
		try {
			const userWallet = WalletController.findOne({ user: _userId });
			const buyStock = this.findOne({ symbol: _symbol, user: _userId });
			let buyPrice = await this.getSymbolPrice(_symbol);
			let buyAmount = _units * buyPrice;
			WalletController.addMovement(userWallet._id, {
				date: new Date(),
				type: 'buy',
				amount: buyAmount,
			});
			if (buyStock) {
				buyStock.units += _stock.units;
				await TransactionController.add({
					date: new Date(),
					user: userWallet.user,
					stock: buyStock._id,
					type: 'buy',
					units: _stock.units,
					price: buyPrice,
				});
				await this.registerLog(buyStock, 'Buy');
				return this.set(hasStock);
			} else {
				const newStock = await Stock.create(_stock);
				await TransactionController.add({
					date: new Date(),
					user: userWallet.user,
					stock: newStock._id,
					type: 'buy',
					units: _stock.units,
					price: buyPrice,
				});
				await this.registerLog(hasStock, 'Buy');
				return newStock;
			}
		} catch (err) {
			throw err;
		}
	}
	static async sell(_userId, _symbolId, _type, _units) {
		try {
			const sellStock = await this.get(_symbolId).populate('stock');
			if (sellStock) {
				const userWallet = WalletController.findOne({ user: _userId });
				let sellPrice = await this.getSymbolPrice(sellStock.stock.symbol);
				let sellAmount = _units * sellPrice;
				sellStock.units -= _units;
				const editStock = this.set(sellStock);
				await TransactionController.add({
					date: new Date(),
					user: _userId,
					stock: sellStock._id,
					type: 'sell',
					units: _units,
					price: sellPrice,
				});
				WalletController.addMovement(userWallet._id, {
					date: new Date(),
					type: 'sell',
					amount: sellAmount,
				});
				await this.registerLog(sellStock, 'Sell');
				return editStock;
			}
		} catch (err) {
			throw err;
		}
	}

	static async addMovement(_id, _movement) {
		const movWallet = await this.get(_id);
		if (movWallet) {
			movWallet.movements.push(_movement);
			await this.registerLog(movWallet, 'New movement in');
		}
		return this.set(movWallet);
	}
	static async list() {
		return await Stock.find();
	}
	static async findOne(_filter) {
		return await Stock.findOne(_filter);
	}
	static async registerLog(_stock, _action) {
		await LogController.register(
			`${_action} stock ${_stock._id} of user ${_stock.user}`,
			_stock.user
		);
	}
	static async getSymbolPrice(_symbol, _type) {
		const key = process.env.API_KEY;
		const functionName = 'GLOBAL_QUOTE';
		const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${_symbol}&apikey=${key}`;

		try {
			const responseFromAPI = await axios.get(apiUrl);
			return responseFromAPI.data['Global Quote']['05. price'];
		} catch (err) {
			console.log('Error while getting the data: ', err);
			return 1;
		}
	}
}

module.exports = StockController;
