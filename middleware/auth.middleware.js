exports.withAuth = (req, res, next) => {
	if (req.session.user) {
		next();
	}
	res.redirect('/auth/login');
};
