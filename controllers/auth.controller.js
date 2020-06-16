const User = require('../models/user.model');
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
}

module.exports = authController;
