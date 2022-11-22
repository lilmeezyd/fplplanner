let tickerDiv = document.querySelector('.ticker-table')
let eventIds = []

function loadNextFixtures(a) {
	let fixOption = ''
	let fixtureNum = eventState.events.filter(event => new Date(event.deadline_time) > new Date()).length
	for(let i = 1; i <= fixtureNum; i++) {
		if(i === fixtureNum && nxt_fixtures.options.length === fixtureNum) {
			fixOption += `<option value="${i}" selected="true">${i}</option>`
		} else {
			if(i === a) {
				fixOption += `<option value="${i}" selected="true">${i}</option>`
			} else {
				fixOption += `<option value="${i}">${i}</option>`
			}
		}
	} 
	nxt_fixtures.innerHTML = fixOption
}

nxt_fixtures.onchange = function() {
	loadTeamFixtures(+this.value)
}

function loadTeamFixtures(x=eventState.events.filter(event => new Date(event.deadline_time) > new Date()).length) {
	let table = fixtureHeader(x)+fixtureBody(x)
	tickerDiv.innerHTML = table
	document.querySelector('.next-fixtures span').innerText = x === 1 ? 'Gameweek' : 'Gameweeks'
	loadNextFixtures(x)
}

//Load fixture Header
function fixtureHeader(d) {
	let result = '<th>Team</th>'

	eventState.events
		.filter(event => new Date(event.deadline_time) > new Date())
		.filter((event, key) => key <= (d-1))
		.forEach(event => {
			newGW = event.name.replace('Gameweek ','GW')
			result += `<th>${newGW}</th>`
		})

	eventState.events
		.forEach(event => {
			if(new Date(event.deadline_time) < new Date()) {
				eventIds.push(event.id)
			}
		})	
	tableHeader = `
	<thead class="small"><tr>${result}</tr></thead>`
	return tableHeader
}

//Load Fixture Body
function fixtureBody(d) {
	let result = ''
	let eventztream = JSON.parse(sessionStorage.getItem('events'))
	if(eventztream === null) return;
	let filteredEvents = eventztream.filter(x => new Date(x.deadline_time) < new Date())
	const nextFixturesObj = {}
	for(let i=filteredEvents.length+1; i <= 38; i++) {
		nextFixturesObj[i] = i
	}

	axy = teamState.teams
	.map(team => returnRating(team.id, nextFixturesObj, filteredEvents.length, d))
	/*.sort((a,b) => {
		if(a.rating > b.rating) return 1
		if(a.rating < b.rating) return -1	
	})*/
	//console.log(axy)
	teamState.teams.forEach(team => {
		let opponents = loadOpponent(team.id, nextFixturesObj, filteredEvents.length, d)
		result += `<tr><td>
		<span class="ticker-image">
		<img src="./static/t${team.code}.png" alt="${team.name}">
		</span>
		<span class="ticker-team">${team.name}</span>
		</td>${opponents}</tr>`
	})
	tableBody = `
	<tbody class="small triple">${result}</tbody>
	`
	return tableBody
}

function returnRating(a, b, c, d) {
	let tempRating = { rating: 0}
	let nextFixtures = []
	validFixtures = fixtureState.fixtures
   					.filter(x => x.event !== null && !eventIds.includes(x.event) && (x.team_a === a || x.team_h === a))
	validFixtures.forEach((x, key) => {
		if(key === 0 && x.event !== b[c+1]) {
			nextFixtures.push({...x, event:b[c+1], 
				team_a_difficulty:0, team_h_difficulty:0
			})
		}
		nextFixtures.push(x)
	})

	//Loading Blank Gameweek
	nextFixtures.forEach((x, key) => {
		if(key === 0 && x.event !== b[c+1]) {
			nextFixtures.splice(0,1, {...x, event:b[c+1], 
				team_a_difficulty:0, team_h_difficulty:0}, x)
		}
	})

	nextFixtures
	.filter((fix, key) => key <= (d-1))
	.map(x => {
		if(x.team_a === a && !eventIds.includes(x.event)) {
			tempRating.rating += x.team_a_difficulty
		}
		if(x.team_h === a && !eventIds.includes(x.event)) {
			tempRating.rating += x.team_h_difficulty
		}
	})

	nextFixtures.push(tempRating)

	return nextFixtures
}

function loadOpponent(a, b, c, d) {
	let result = ''
	let nextFixtures = []
	validFixtures = fixtureState.fixtures
   					.filter(x => x.event !== null && !eventIds.includes(x.event) && (x.team_a === a || x.team_h === a))
	validFixtures.forEach((x, key) => {
		if(key === 0 && x.event !== b[c+1]) {
			nextFixtures.push({...x, event:b[c+1], 
				team_a_difficulty:0, team_h_difficulty:0
			})
		}
		nextFixtures.push(x)
	})

	//Loading Blank Gameweek
	nextFixtures.forEach((x, key) => {
		if(key === 0 && x.event !== b[c+1]) {
			nextFixtures.splice(0,1, {...x, event:b[c+1], 
				team_a_difficulty:0, team_h_difficulty:0}, x)
		}
	})

	
	nextFixtures
	.filter((fix, key) => key <= (d-1))
	.map(x => {
		if(x.team_a === a && !eventIds.includes(x.event)) {
			let awayColor = x.team_a_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_a_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_a_difficulty === 4 ?
			'rgb(255, 23, 81)' : x.team_a_difficulty === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
			nameAway = x.team_a_difficulty !== 0 ? teamState.teams.find(tname => tname.id === x.team_h).short_name : ''
			eAway = x.team_a_difficulty !== 0 ? '(A)' : ''
			result +=`<td style="background: ${awayColor};">${nameAway} ${eAway}</td>`
		}
		if(x.team_h === a && !eventIds.includes(x.event)) {
			let homeColor = x.team_h_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_h_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_h_difficulty === 4 ?
			'rgb(255, 23, 81)' : x.team_h_difficulty === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
			nameHome =  x.team_h_difficulty !== 0 ? teamState.teams.find(tname => tname.id === x.team_a).short_name : ''
			eHome = x.team_h_difficulty !== 0 ? '(H)': ''
			result+= `<td style="background: ${homeColor};">${nameHome} ${eHome}</td>`
		}
	})
	return result
}


