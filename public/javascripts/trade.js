$(document).ready(function () {
	$('#tradeTable').DataTable({ paging: true, ordering: true, info: false });
	$('#transactionsTable').DataTable({
		paging: true,
		ordering: true,
		info: false,
		order: [[0, 'desc']],
		lengthMenu: [
			[10, 25, 50, -1],
			[10, 25, 50, 'All'],
		],
	});
});

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
	'Nunito,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
const graphData = document.querySelectorAll('.data-graph');
const graphLabels = [...graphData].map((data) => data['dataset'].name);
const graphValues = [...graphData].map((data) =>
	parseFloat(data['dataset'].amount)
);
const graphBColor = [];
const graphHColor = [];
[...graphData].forEach((data) => {
	let graphColors = getRandomGraphColor();
	graphBColor.push(graphColors.background);
	graphHColor.push(graphColors.hover);
});
const ctxTrade = document.getElementById('balanceInvestPie');
const myPieChart = new Chart(ctxTrade, {
	type: 'doughnut',
	data: {
		labels: graphLabels,
		datasets: [
			{
				data: graphValues,
				backgroundColor: graphBColor,
				hoverBackgroundColor: graphHColor,
				hoverBorderColor: 'rgba(234, 236, 244, 1)',
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		tooltips: {
			backgroundColor: 'rgb(255,255,255)',
			bodyFontColor: '#858796',
			borderColor: '#dddfeb',
			borderWidth: 1,
			xPadding: 15,
			yPadding: 15,
			displayColors: false,
			caretPadding: 10,
		},
		legend: {
			display: true,
			position: 'right',
		},
		cutoutPercentage: 80,
	},
});
