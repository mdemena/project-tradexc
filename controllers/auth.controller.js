const User = require('../controllers/user.controller');
const bcrypt = require('bcryptjs');

class authController {
	static async login(_email, _password) {
		const userLogin = await User.findOne({ email: _email });
		if (!userLogin) {
			throw new Error('Email is not registered. Try and other email.');
		} else if (bcrypt.compare(password, userLogin.passwordHash)) {
			return userLogin;
		} else {
			throw new Error('Password incorrect. Try again.');
		}
	}
	static async signUp(_name, _email, _password) {
		try {
			return await User.add({
				name: _name,
				email: _email,
				password: _password,
			});
		} catch (err) {
			throw err;
		}
	}
}

module.exports = authController;