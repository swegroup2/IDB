const testData = [
	{
		"brands": [], 
		"capital": "Sucre", 
		"cocktails": [
			{
				"id": 1, 
				"label": "Singani", 
				"url": "tipsymix.com/api/cocktails/singani"
			}
		], 
		"color": 255, 
		"continent": "South America", 
		"description": "Bolivia is a country in central South America, with a varied terrain spanning Andes Mountains, the Atacama Desert and Amazon Basin rainforest. At more than 3,500m, its administrative capital, La Paz, sits on the Andes Altiplano plateau with snow-capped Mt. Illimani in the background. Nearby is glass-smooth Lake Titicaca, the continents largest lake, straddling the border with Peru.", 
		"id": 1, 
		"image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Bolivia_%28state%29.svg", 
		"ingredients": [], 
		"name": "Bolivia", 
		"stdname": "bolivia", 
		"summary": "Bolivia is a country in central South America.", 
		"tags": [
			"andes", 
			"lake", 
			"bolivia"
		]
	},
	{
		"brands": [], 
		"capital": "Seoul", 
		"cocktails": [
		{
			"id": 2, 
			"label": "Soju", 
			"url": "tipsymix.com/api/cocktails/soju"
		}
		], 
		"color": 255, 
		"continent": "Asia", 
		"description": "South Korea, an East Asian nation on the southern half of the Korean Peninsula, shares one of the worlds most heavily militarized borders with North Korea. Its equally known for its green, hilly countryside dotted with cherry trees and centuries-old Buddhist temples, plus its coastal fishing villages, sub-tropical islands and high-tech cities such as Seoul, the capital.", 
		"id": 2, 
		"image": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg", 
		"ingredients": [], 
		"name": "South Korea", 
		"stdname": "south_korea", 
		"summary": "South Korea is an East Asian nation.", 
		"tags": [
		"korea", 
		"half", 
		"korean"
		]
	},
	{
		"brands": [
		{
			"id": 21, 
			"label": "Smirnoff", 
			"url": "tipsymix.com/api/brands/smirnoff"
		}
		], 
		"capital": "Brasilia", 
		"cocktails": [
		{
			"id": 3, 
			"label": "Cachaca", 
			"url": "tipsymix.com/api/cocktails/cachaca"
		}
		], 
		"color": 255, 
		"continent": "South America", 
		"description": "Brazil, a vast South American country, stretches from the Amazon Basin in the north to vineyards and massive Iguau Falls in the south. Rio de Janeiro, symbolized by its 38m Christ the Redeemer statue atop Mount Corcovado, is famed for its busy Copacabana and Ipanema beaches as well as its enormous, raucous Carnaval festival, featuring parade floats, flamboyant costumes, and samba music and dance.", 
		"id": 3, 
		"image": "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg", 
		"ingredients": [], 
		"name": "Brazil", 
		"stdname": "brazil", 
		"summary": "Brazil is a vast South American country.", 
		"tags": [
		"brazil", 
		"stretches", 
		"iguau"
		]
	}
];

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

		if (!country)
			return false;
		return country.alpha3;
	}
};

async function load() {
	await fetch("countries.json")
		.then(response => response.json())
		.then(data => cc.countries = data);
	
	buildMap(testData);
}

function buildMap(countries) {
	const codes = countries.map(country => cc.name2code(country.name));
	
	let data = {};
	codes.forEach(code => data[code] = {
		fillKey: "filled"
	});

	const map = new Datamap({
		"element": document.querySelector("#map-container"),
		"fills": {
			"defaultFill": "#0xA0A0A0",
			"filled": "#FF0000"
		},
		"data": data
	});
}

load();
