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
			// console.log('Error '+res.status+': '+res.statusText)
			console.log(res)
		}
	})
	.catch(err=>{
		// console.log('Error: '+err.status+': '+err.statusText)
		console.log(err)
	})
}

// THE STATS ENDPOINT
function statsAsyncTask (location) {
	// initialize loading signal
	getNode('#last_updated_number').innerText='...'
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
				const updatedDateTime = new Date(data.updatedDateTime)
				const FORMATED_DATE_TIME = updatedDateTime.getFullYear()+'-'+preppendZero((updatedDateTime.getMonth()+1))+'-'+preppendZero(updatedDateTime.getDate())+' '+preppendZero(updatedDateTime.getHours())+':'+preppendZero(updatedDateTime.getMinutes())+':'+preppendZero(updatedDateTime.getSeconds())
				// console.log('last_updated: '+FORMATED_DATE_TIME)

				getNode('#total_confirmed_number').innerText=data.stats.totalConfirmedCases
				getNode('#new_confirmed_number').innerText=data.stats.newlyConfirmedCases
				getNode('#total_reccovered_number').innerText=data.stats.totalRecoveredCases
				getNode('#new_reccovered_number').innerText=data.stats.newlyRecoveredCases
				getNode('#total_deaths_number').innerText=data.stats.totalDeaths
				getNode('#new_deaths_number').innerText=data.stats.newDeaths
				getNode('#last_updated_number').innerText=FORMATED_DATE_TIME
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
			getNode('#last_updated_number').innerText='-'
		}
	})
	.catch(err=>{
		// console.log('Error: '+err.status+': '+err.statusText)
		console.log(err)

		getNode('#total_confirmed_number').innerText='-'
		getNode('#new_confirmed_number').innerText='-'
		getNode('#total_reccovered_number').innerText='-'
		getNode('#new_reccovered_number').innerText='-'
		getNode('#total_deaths_number').innerText='-'
		getNode('#new_deaths_number').innerText='-'
		getNode('#last_updated_number').innerText='-'
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
				// console.log(data)
				const UPDATED_TIME = data.updatedDateTime
				const NEWS_ARRAY = data.news
				// console.log(NEWS_ARRAY)

				// appendin news stuffs
				for(i in NEWS_ARRAY){
					// console.log(NEWS_ARRAY[i].excerpt)
					// create span and p tags
					new_title = document.createElement('span')
					new_title.classList.add('new_title')
					new_title.classList.add('text_uppercase')
					new_title.innerText = NEWS_ARRAY[i].title

					new_excerpt = document.createElement('p')
					new_excerpt.classList.add('new_excerpt')
					new_excerpt.innerText = NEWS_ARRAY[i].excerpt

					// create .new_body div
					new_body = document.createElement('div')
					new_body.classList.add('new_body')
					// append
					new_body.appendChild(new_title)
					new_body.appendChild(new_excerpt)

					// create a and button elements
					button = document.createElement('button')
					button.classList.add('pointer')
					button.classList.add('text_capitalize')
					button.innerText = 'Read More'
					new_link = document.createElement('a')
					new_link.appendChild(button)
					new_link.href = NEWS_ARRAY[i].ampWebUrl

					// create .a_new div
					a_new = document.createElement('div')
					a_new.classList.add('a_new')
					// append
					a_new.appendChild(new_body)
					a_new.appendChild(new_link)

					// append into section
					getNode('#news_sect').appendChild(a_new)
				}
			})
		} else {
			// console.log('Error '+res.status+': '+res.statusText)
			console.log(res)
		}
	})
	.catch(err=>{
		// console.log('Error: '+err.status+': '+err.statusText)
		console.log(err)
	})
}
