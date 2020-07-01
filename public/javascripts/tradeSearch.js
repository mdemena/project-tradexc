document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById('typeStock').checked =
		document.getElementById('typeId').value === 'stock';
	document.getElementById('typeCrypto').checked = !document.getElementById(
		'typeStock'
	).checked;
});

document.getElementById('typeStock').addEventListener('click', (event) => {
	document.getElementById('typeId').value = 'stock';
});
document.getElementById('typeCrypto').addEventListener('click', (event) => {
	document.getElementById('typeId').value = 'crypto';
});

async function searchSymbol(_keywords) {
	const _type = document.getElementById('typeId').value;
	const apiUrl = `/app/trade/searchSymbol/${_type}/${_keywords}`;
	console.log(apiUrl);
	try {
		const responseFromAPI = await axios.get(apiUrl);
		return responseFromAPI.data;
	} catch (err) {
		console.log('Error while getting the data: ', err);
	}
}

async function getSymbolPrice(_symbol) {
	const _type = document.getElementById('typeId').value;
	const apiUrl = `/app/trade/getSymbolPrice/${_type}/${_symbol}`;
	let price = 1;
	try {
		const responseFromAPI = await axios.get(apiUrl);
		console.log(responseFromAPI.data);
		return responseFromAPI.data;
	} catch (err) {
		console.log('Error while getting the data: ', err);
		return price;
	}
}
function autocomplete(inp) {
	var currentFocus;
	inp.addEventListener('input', async function (e) {
		var a,
			b,
			i,
			val = this.value;

		closeAllLists();
		if (!val || val.length < 4) {
			return false;
		}
		arr = await searchSymbol(val);
		currentFocus = -1;

		a = document.createElement('DIV');
		a.setAttribute('id', this.id + 'autocomplete-list');
		a.setAttribute('class', 'autocomplete-items');
		this.parentNode.appendChild(a);
		for (i = 0; i < arr.length; i++) {
			if (
				arr[i]['2. name'].substr(0, val.length).toUpperCase() ==
				val.toUpperCase()
			) {
				b = document.createElement('DIV');
				b.innerHTML +=
					'<strong>' + arr[i]['2. name'].substr(0, val.length) + '</strong>';
				b.innerHTML +=
					arr[i]['2. name'].substr(val.length) +
					'(' +
					arr[i]['1. symbol'] +
					')';
				b.innerHTML +=
					"<input type='hidden' value='" +
					arr[i]['2. name'] +
					'(' +
					arr[i]['1. symbol'] +
					")'>";
				b.innerHTML +=
					"<input type='hidden' value='" + arr[i]['1. symbol'] + "'>";
				b.innerHTML +=
					"<input type='hidden' value='" + arr[i]['2. name'] + "'>";
				b.addEventListener('click', async function (e) {
					inp.value = this.getElementsByTagName('input')[0].value;
					document.getElementById(
						'symbolCodeId'
					).value = this.getElementsByTagName('input')[1].value;
					document.getElementById(
						'symbolNameId'
					).value = this.getElementsByTagName('input')[2].value;
					document.getElementById('priceId').value = await getSymbolPrice(
						this.getElementsByTagName('input')[1].value
					);

					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});

	inp.addEventListener('keydown', function (e) {
		var x = document.getElementById(this.id + 'autocomplete-list');
		if (x) x = x.getElementsByTagName('div');
		if (e.keyCode == 40) {
			currentFocus++;

			addActive(x);
		} else if (e.keyCode == 38) {
			currentFocus--;

			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		if (!x) return false;

		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;

		x[currentFocus].classList.add('autocomplete-active');
	}
	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove('autocomplete-active');
		}
	}
	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName('autocomplete-items');
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	document.addEventListener('click', function (e) {
		closeAllLists(e.target);
	});
}

let auto = document.getElementById('symbolId');
autocomplete(auto);

document.getElementById('unitsId').addEventListener('change', (elem) => {
	const price = document.getElementById('priceId').value;
	const wallet = document.getElementById('walletAmountId').value;
	if (elem.target.value * price <= wallet) {
		document.getElementById('totalId').value = elem.target.value * price;
	}
	console.log(elem.target.value);
});
