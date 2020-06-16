const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

class authController {
	static async login(_email, _password) {
		const userLogin = await User.findOne({ email: _email });
		if (!userLogin) {
			return { errorMessage: 'Email is not registered. Try and other email.' };
		} else if (bcrypt.compare(password, userLogin.passwordHash)) {
			return userLogin;
		} else {
			return { errorMessage: 'Password incorrect. Try again.' };
		}
	}
}
