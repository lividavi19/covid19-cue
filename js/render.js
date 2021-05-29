const _get = async (url, successCallback, failCallback) => {
	try {
		const response = await fetch(url, {
            "headers": {
                "x-rapidapi-key": "f89cabf9c4mshe6bfd149e4d7211p1e0be8jsn0b0ace15f0ca",
                "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com"
            }
        });
		
		if (response.ok) {
			const textData = await response.clone().text();
			const jsonData = await response.clone().json();
			const blobData = await response.clone().blob();
			
			successCallback ({
				response: response,
				text: textData,
				json: jsonData,
				blob: blobData
			});
		} else {
			failCallback (response);
		}
	} catch (error) {
		failCallback (error);
	}
};

// render countries
const renderCountries = () => {
	_get(`countries.json`, res=>{
		const countries = res.json.countries;
		// template html string
		let optionTemplate = ``;

		// loop through the countries array
		countries.forEach (country => {
			optionTemplate += `<option value="${country.iso2}">${country.name}</option>`;
		});

		// append template to parent node
		getNode(`select`).innerHTML = optionTemplate;
		getNode(`select`).value = `TZ`;
	}, err=>{
		console.log(err);
	});
};

// render stats
const renderStatistics = location => {
	// loading signal
	setText(`.case_number`, `...`);

	_get(`https://coronavirus-smartable.p.rapidapi.com/stats/v1/${location}/`, res=>{
		const updatedDateTime = res.json.updatedDateTime;
		const stats = res.json.stats;

		// logs info into the console
		// console.log(updatedDateTime);
		// console.log(stats);

		// maambukizi
		getNode(`#maambukizi`).textContent = `${stats.totalConfirmedCases}`;
		getNode(`#maambukizi_mapya`).textContent = `${stats.newlyConfirmedCases}`;

		// waliopona
		getNode(`#waliopona`).textContent = `${stats.totalRecoveredCases}`;
		getNode(`#waliopona_wapya`).textContent = `${stats.newlyRecoveredCases}`;

		// vifo
		getNode(`#vifo`).textContent = `${stats.totalDeaths}`;
		getNode(`#vifo_vipya`).textContent = `${stats.newDeaths}`;

		// sasishwa
		const sasishwaMuda = new Date(updatedDateTime);
		getNode(`#sasishwa`).textContent = `${sasishwaMuda.getFullYear()}-${preppendZero(sasishwaMuda.getMonth()+1)}-${preppendZero(sasishwaMuda.getDate())}, ${preppendZero(sasishwaMuda.getHours())}:${preppendZero(sasishwaMuda.getMinutes())}`;
	}, err=>{
		console.log(`error`);
		setText(`.case_number`, `-`);
	});
};