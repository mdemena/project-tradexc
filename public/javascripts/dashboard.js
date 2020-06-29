$(document).ready(async function () {
	// Set new default font family and font color to mimic Bootstrap's default styling
	Chart.defaults.global.defaultFontFamily =
		'Nunito,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#858796';

	// Pie Chart Example
	const apiUrlPie = `/app/trade/getSymbolsByUser`;

	try {
		const resFromAPI = await axios.get(apiUrlPie);
		console.log(resFromAPI);
		const graphLabels = resFromAPI.data.map(
			(item) => item._id.name + '(' + item._id.symbol + ')'
		);
		const pieValues = resFromAPI.data.map((item) => parseFloat(item.amount));
		const profitValues = resFromAPI.data.map((item) =>
			(
				(parseFloat(item.units) * parseFloat(item.actualPrice) -
					parseFloat(item.amount)) /
				parseFloat(item.amount)
			).toFixed(2)
		);
		const profitAvg =
			profitValues.reduce((t, a) => (t += parseFloat(a)), 0) /
			profitValues.length;
		document.getElementById('profitAvg').innerHTML =
			profitAvg.toFixed(2) + ' %';
		document.querySelector('.progress-bar.bg-info').style.width =
			profitAvg.toFixed(2) + '%';
		document
			.querySelector('.progress-bar.bg-info')
			.setAttribute('aria-valuenow', profitAvg);
		// const graphData = document.querySelectorAll('.data-graph');
		// const graphLabels = [...graphData].map((data) => data['dataset'].name);
		// const graphValues = [...graphData].map((data) =>
		// 	parseFloat(data['dataset'].amount)
		// );
		const graphBColor = [];
		const graphHColor = [];
		pieValues.forEach((data) => {
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
						label: '%',
						data: pieValues,
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

		const ctxProfit = document.getElementById('profitChart');
		const myProfitChart = new Chart(ctxProfit, {
			type: 'horizontalBar',
			data: {
				labels: graphLabels,
				datasets: [
					{
						data: profitValues,
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
					display: false,
					position: 'right',
				},
				cutoutPercentage: 80,
			},
		});
	} catch (err) {
		console.log('Error while getting the data: ', err);
	}

	const apiUrl = `/app/trade/getEvolutionSymbolsByUser`;

	try {
		const responseFromAPI = await axios.get(apiUrl);
		const chartLabels = responseFromAPI.data.labels;
		const chartDatasets = responseFromAPI.data.datasets;
		const helperDatasets = chartDatasets.map((dataChart) => {
			const colorDataset = getRandomGraphColor().background;
			try {
				return {
					label: dataChart.symbol,
					data: dataChart.dataset,
					lineTension: 0.3,
					fill: false,
					borderColor: colorDataset,
					pointRadius: 3,
					pointBackgroundColor: colorDataset,
					pointBorderColor: colorDataset,
					pointHoverRadius: 3,
					pointHoverBackgroundColor: colorDataset,
					pointHoverBorderColor: colorDataset,
					pointHitRadius: 10,
					pointBorderWidth: 2,
				};
			} catch (err) {}
		});
		const ctxEvo = document.getElementById('evolutionChart');
		const myEvoChart = new Chart(ctxEvo, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: helperDatasets,
			},
			options: {
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 10,
						right: 25,
						top: 25,
						bottom: 0,
					},
				},
				scales: {
					xAxes: [
						{
							time: {
								unit: 'date',
							},
							gridLines: {
								display: false,
								drawBorder: false,
							},
							ticks: {
								maxTicksLimit: 7,
							},
						},
					],
					yAxes: [
						{
							ticks: {
								maxTicksLimit: 5,
								padding: 10,
								// Include a EUR sign in the ticks
								callback: function (value, index, values) {
									return value.toFixed(2) + ' EUR';
								},
							},
							gridLines: {
								color: 'rgb(234, 236, 244)',
								zeroLineColor: 'rgb(234, 236, 244)',
								drawBorder: false,
								borderDash: [2],
								zeroLineBorderDash: [2],
							},
						},
					],
				},
				legend: {
					display: true,
				},
				tooltips: {
					backgroundColor: 'rgb(255,255,255)',
					bodyFontColor: '#858796',
					titleMarginBottom: 10,
					titleFontColor: '#6e707e',
					titleFontSize: 14,
					borderColor: '#dddfeb',
					borderWidth: 1,
					xPadding: 15,
					yPadding: 15,
					displayColors: false,
					intersect: false,
					mode: 'index',
					caretPadding: 10,
					callbacks: {
						label: function (tooltipItem, chart) {
							var datasetLabel =
								chart.datasets[tooltipItem.datasetIndex].label || '';
							return (
								datasetLabel + ': ' + tooltipItem.yLabel.toFixed(2) + ' EUR'
							);
						},
					},
				},
			},
		});
	} catch (err) {
		console.log('Error while getting the data: ', err);
	}
});
