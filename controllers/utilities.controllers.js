class UtilitiesController {
	static async getLastNDays(_daysLeft) {
		const arr = [];
		let startDate = new Date().today;
		const endDate = new Date(startDate.getDate() - _daysLeft);

		while (startDate <= endDate) {
			arr.push(new Date(startDate));
			startDate.setDate(startDate.getDate() + 1);
		}

		return arr;
	}
}

module.exports = UtilitiesController;
