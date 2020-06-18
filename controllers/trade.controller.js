const Stock = require('../models/stock.model');
const WalletController = require('./wallet.controller');
const TransactionController = require('./transaction.controller');
const LogController = require('./log.controller');
const Transaction = require('../models/transaction.model');

class TradeController {
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
	static async buy(_userId, _symbol, _name, _type, _units) {
		try {
			const userWallet = WalletController.findOne({ user: _userId });
			const buyStock = this.findOne({ symbol: _symbol, user: _userId });
			let buyPrice = await this.getSymbolPrice(_symbol, _type);
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
				return this.set(buyStock);
			} else {
				const newStock = await Stock.create({
					user: _userId,
					symbol: _symbol,
					name: _name,
					type: _type,
					units: _units,
				});
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
	static async sell(_userId, _symbolId, _units) {
		try {
			const sellStock = await this.get(_symbolId);
			if (sellStock) {
				const userWallet = WalletController.findOne({ user: _userId });
				let sellPrice = await this.getSymbolPrice(
					sellStock.symbol,
					sellStock.type
				);
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
	static async listByUser(_userId) {
		return await Stock.find({ user: _userId });
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
		const functionName =
			_type === 'stock' ? 'GLOBAL_QUOTE' : 'CURRENCY_EXCHANGE_RATE';
		let apiUrl = `https://www.alphavantage.co/query?function=${functionName}&apikey=${key}`;
		switch (_type) {
			case 'crypto':
				apiUrl += `&from_currency=${_symbol}&to_currency=EUR`;
				break;
			default:
				apiUrl += `&symbol=${_symbol}`;
				break;
		}
		let price = 1;
		try {
			const responseFromAPI = await axios.get(apiUrl);
			switch (_type) {
				case 'crypto':
					price = responseFromAPI.data['Global Quote']['05. price'];
					break;
				default:
					price =
						responseFromAPI.data['Realtime Currency Exchange Rate'][
							'5. Exchange Rate'
						];
					break;
			}
			return price;
		} catch (err) {
			console.log('Error while getting the data: ', err);
			return price;
		}
	}
}

module.exports = TradeController;
