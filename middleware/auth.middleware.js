exports.withAuth = (req, res, next) => {
	if (req.session.currentUser) {
		next();
	}
	res.redirect('/auth/login');
};
