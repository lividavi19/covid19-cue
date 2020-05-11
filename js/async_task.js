// GET THE COUNTRIES
function countriesAsyncTask () {
	const options = {
		method: 'get',
		headers: {
			'Cache-Control': 'no-cache'
		}
	}

	// IMPLEMENTING FETCH API
	fetch('js/countries.json', options)
	.then(res=>{
		if (res.ok) {
			res.text()
			.then(data=>{
				data = JSON.parse(data)
				const countries = data.countries
				// console.log(countries)

				// populate the #select_country with the options
				for(i in countries){
					// create new 'option' element, then add 'value' and 'text' attributes to it
					const country_options = document.createElement('option')
					country_options.value = countries[i].iso2
					country_options.text = countries[i].name

					// pre select tanzania option
					getNode('#select_country').value = 'TZ'

					// append the #country_options into #select_country
					getNode('#select_country').appendChild(country_options)
				}
			})
		} else {
			console.log('Error '+res.status+': '+res.statusText)
		}
	})
	.catch(err=>{
		console.log('Error: '+err.status+': '+err.statusText)
	})
}

// THE STATS ENDPOINT
function statsAsyncTask (location) {
	// initialize loading signal
	getNode('#total_confirmed_number').innerText='...'
	getNode('#new_confirmed_number').innerText='...'
	getNode('#total_reccovered_number').innerText='...'
	getNode('#new_reccovered_number').innerText='...'
	getNode('#total_deaths_number').innerText='...'
	getNode('#new_deaths_number').innerText='...'
	const options = {
		method: 'get',
		headers: {
			'Subscription-Key': 'b0aaacac86f44d898bf1b2df828f61dc',
			'Cache-Control': 'no-cache'
		}
	}

	// IMPLEMENTING FETCH API
	fetch('https://api.smartable.ai/coronavirus/stats/'+location, options)
	.then(res=>{
		if (res.ok) {
			res.text()
			.then(data=>{
				data = JSON.parse(data)
				// console.log(data)
				console.log('last_updated: '+data.updatedDateTime)

				getNode('#total_confirmed_number').innerText=data.stats.totalConfirmedCases
				getNode('#new_confirmed_number').innerText=data.stats.newlyConfirmedCases
				getNode('#total_reccovered_number').innerText=data.stats.totalRecoveredCases
				getNode('#new_reccovered_number').innerText=data.stats.newlyRecoveredCases
				getNode('#total_deaths_number').innerText=data.stats.totalDeaths
				getNode('#new_deaths_number').innerText=data.stats.newDeaths
			})
		} else {
			// console.log('Error '+res.status+': '+res.statusText)
			console.log(res)

			getNode('#total_confirmed_number').innerText='-'
			getNode('#new_confirmed_number').innerText='-'
			getNode('#total_reccovered_number').innerText='-'
			getNode('#new_reccovered_number').innerText='-'
			getNode('#total_deaths_number').innerText='-'
			getNode('#new_deaths_number').innerText='-'
		}
	})
	.catch(err=>{
		console.log('Error: '+err.status+': '+err.statusText)

		getNode('#total_confirmed_number').innerText='-'
		getNode('#new_confirmed_number').innerText='-'
		getNode('#total_reccovered_number').innerText='-'
		getNode('#new_reccovered_number').innerText='-'
		getNode('#total_deaths_number').innerText='-'
		getNode('#new_deaths_number').innerText='-'
	})
}

// THE NEWS ENDPOINT
function newsAsyncTask (location) {
	const options = {
		method: 'get',
		headers: {
			'Subscription-Key': 'b0aaacac86f44d898bf1b2df828f61dc',
			'Cache-Control': 'no-cache'
		}
	}

	// IMPLEMENTING FETCH API
	fetch('https://api.smartable.ai/coronavirus/news/'+location, options)
	.then(res=>{
		if (res.ok) {
			res.text()
			.then(data=>{
				data = JSON.parse(data)
				console.log(data)
			})
		} else {
			console.log('Error '+res.status+': '+res.statusText)
		}
	})
	.catch(err=>{
		console.log('Error: '+err.status+': '+err.statusText)
	})
}
