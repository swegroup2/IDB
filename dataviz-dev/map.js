const cc = {
	countries: null,
	name2code: function(name) {
		if (!cc.countries)
			return false;

		const space = /[\s,]+/g;
		const nameParts = name.toLowerCase().split(space);
		
		//try to find any matching names
		const country = cc.countries.find(country => {
			const cnameParts = country.name.toLowerCase().split(space);
			for (let part of nameParts)
				if (cnameParts[0] === part)
					return true;
			return false;
		});

		if (!country) {
			debugger;
			return false;
		}
		return country.alpha3;
	}
};

async function load() {
	//load country conversion data
	await fetch("countries.json")
		.then(response => response.json())
		.then(data => cc.countries = data);
	
	//make API queries
	let testData = [];
	const promises = d3.range(1,61)
		.map(i => fetch(`https://tipsymix.com/api/countries/${i}`)
			.then(response => response.json())
			.then(data => testData.push(data))
			.catch(e => {})
		);
	await Promise.all(promises);

	buildMap(testData);
}

function buildMap(countries) {
	countries.forEach(country => country.code = cc.name2code(country.name));
	
	let data = {};
	countries.forEach(country => data[country.code] = {
		fillKey: country.brands.length > 1 ? "many" : country.brands.length > 0 ? "one" : "none"
	});

	const map = new Datamap({
		"element": document.querySelector("#map-container"),
		"fills": {
			"defaultFill": "#A0A0A0",
			"none": "#000000",
			"one": "#FF7700",
			"many": "#FF0000"
		},
		"data": data
	});
}

load();
