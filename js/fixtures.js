let tickerDiv = document.querySelector('.ticker-table')
let eventIds = []
function loadTeamFixtures() {
	let table = fixtureHeader()+fixtureBody()
	tickerDiv.innerHTML = table
}

//Load fixture Header
function fixtureHeader() {
	let result = '<th>Team</th>'
	eventState.events.forEach(event => {
		if(new Date(event.deadline_time) > new Date()) {
			newGW = event.name.replace('Gameweek ','GW')
			result += `<th>${newGW}</th>`
		} else {
			eventIds.push(event.id)
		}
	})
	tableHeader = `
	<thead class="small"><tr>${result}</tr></thead>`
	return tableHeader
}

//Load Fixture Body
function fixtureBody() {
	let result = ''
	let eventztream = JSON.parse(sessionStorage.getItem('events'))
	let filteredEvents = eventztream.filter(x => new Date(x.deadline_time) < new Date())
	const nextFixturesObj = {}
	for(let i=filteredEvents.length+1; i <= 38; i++) {
		nextFixturesObj[i] = i
	}
	teamState.teams.forEach(team => {
		let opponents = loadOpponent(team.id, nextFixturesObj, filteredEvents.length)
		result += `<tr><td>
		<span class="ticker-image">
		<img src="./static/t${team.code}.png" alt="${team.name}">
		</span>
		<span class="ticker-team">${team.name}</span>
		</td>${opponents}</tr>`
	})
	tableBody = `
	<tbody class="small">${result}</tbody>
	`
	return tableBody
}

function loadOpponent(a, b, c) {
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
		if(key === 4 && x.event !== b[c+5]) {
			nextFixtures.splice(4,1, {...x, event:b[c+5], 
				team_a_difficulty:0, team_h_difficulty:0}, x)
		}
	})
	/*for(let i = 1; i < nextFixtures.length-1; i++ ) {
		if(i && nextFixtures[i-1].event !== b[c+1]) {
			nextFixtures.splice(i,1, {...nextFixtures[i-1], event:b[c+1], 
				team_a_difficulty:0, team_h_difficulty:0}, nextFixtures[i-1])}
	}*/
	nextFixtures
	.forEach(x => {
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


