const express = require('express');
const mongoose = require('mongoose');
const Auth = require('../controllers/auth.controller');
const User = require('../controllers/user.controller');
const bcrypt = require('bcryptjs');
const router = express.Router();

const saltRounds = 10;

// LOGOUT
router.get('/auth/logout', async (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
});

// LOGIN
router.get('/auth/login', async (req, res, next) => {
	res.render('auth/login');
});

router.post('/auth/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		validateData({ email, password }, 'auth/login');
		const userLogin = await Auth.login(email, password);
		req.session.user = userLogin;
		res.redirect('/');
		return;
	} catch (error) {
		res.render('auth/login', {
			errorMessage: err,
		});
		return;
	}
});

// SIGNUP
router.get('/auth/signup', async (req, res, next) => {
	res.render('auth/signup');
});

router.post('/auth/signup', async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		validateData({ email, password }, 'auth/signup');
		const passwordHash = await bcrypt.hashSync(password, saltRounds);
		const newUser = await Auth.signUp(name, email, passwordHash);
		res.redirect('/auth/login');
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			res.status(500).render('auth/signup', {
				errorMessage: error.message,
			});
		} else if (error.code === 11000) {
			res.status(500).render('auth/signup', {
				email: email,
				password: password,
				errorMessage: 'username or email exist...',
			});
		} else {
			next(error);
		}
	}
});

function validateData(data, urlRender) {
	if (!data.email || !data.password) {
		res.render(urlRender, {
			email: data.email,
			password: data.password,
			errorMessage: 'Email and password are mandatory',
		});
		return false;
	}
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!regex.test(data.password)) {
		res.status(500).render(urlRender, {
			email: data.email,
			password: data.password,
			errorMessage:
				'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.',
		});
		return;
	}
}

module.exports = router;
