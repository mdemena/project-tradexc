$(document).ready(function () {
	$('#walletTable').DataTable({ paging: true, ordering: true, info: false });
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
			position: 'bottom',
		},
		cutoutPercentage: 80,
	},
});

// Line Chart Example
const graphDataChart = document.querySelectorAll('#line');
const graphLabelsChart = [...graphDataChart].map(
	(dataLine) => dataLine['dataset'].date
);
const graphValuesChart = [...graphDataChart].map((dataLine) =>
	parseFloat(dataLine['dataset'].amount)
);
const ctxWallet = document.getElementById('lineChart').getContext('2d');
const myLineChart = new Chart(ctxWallet, {
	type: 'line',
	data: {
		labels: graphLabelsChart,
		datasets: [
			{
				label: 'BALANCE',
				data: graphValuesChart,
				backgroundColor: graphBColor,
				borderColor: graphHColor,
				borderWidth: 1,
			},
		],
	},
	options: {
		responsive: true,
	},
});
