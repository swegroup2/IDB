const CACHED = true;
const COLOR_OFFSET = 0.1;

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
	
	if (CACHED) {
		await fetch("countries_cached.json")
			.then(response => response.json())
			.then(data => testData = data.arr);
	}
	else {
		const promises = d3.range(1,61)
			.map(i => fetch(`https://tipsymix.com/api/countries/${i}`)
				.then(response => response.json())
				.then(data => testData.push(data))
				.catch(e => {})
			);
		await Promise.all(promises);
	}

	buildMap(testData);
}

function buildMap(countries) {
	countries.forEach(country => country.code = cc.name2code(country.name));
	
	//compute number of cocktails
	let numCocktails = {};
	countries.forEach(country => {
		if (!(country.code in numCocktails))
			numCocktails[country.code] = 0;

		numCocktails[country.code] += country.cocktails.length;
	});

	//find max number of cocktails
	const maxCocktails = countries.map(country => country.cocktails.length)
		.reduce((acc, current) => Math.max(acc, current), 0);

	//compute fill values
	let data = {};
	Object.keys(numCocktails).forEach(k => {
		data[k] = {
			numberOfThings: numCocktails[k],
			fillColor: d3.interpolateYlOrBr(
				COLOR_OFFSET + numCocktails[k] / maxCocktails * (1-COLOR_OFFSET))
		};
	});

	const map = new Datamap({
		"element": document.querySelector("#map-container"),
		"fills": {
			"defaultFill": "#FFFFFF"
		},
		"data": data,
		"geographyConfig": {
            borderColor: '#DDDDDD',
            highlightBorderWidth: 2,
            // don't change color on mouse hover
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
            // only change border
            highlightBorderColor: '#B7B7B7',
            // show desired information in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data)
                	return `
                		<div class="hoverinfo">
                		<strong> ${geo.properties.name} </strong>
                		</div>`;
                
                // tooltip content
                return `
                	<div class="hoverinfo">
                    <strong> ${geo.properties.name} </strong>
                    <br>Cocktails: <strong> ${data.numberOfThings} </strong>
                    </div>`;
            }
        }
	});
}

load();
