let tickerDiv = document.querySelector('.ticker-table')
let eventIds = []
function loadFixtures() {
	let table = fixtureHeader()+fixtureBody()
	tickerDiv.innerHTML = table
}

function fixtureHeader() {
	let result = '<th>Team</th>'
	fEvents.forEach(event => {
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
function fixtureBody() {
	let result = ''
	fTeams.forEach(team => {
		let opponents = loadOpponent(team.id)
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

function loadOpponent(a) {
	result = ''
	fFixtures.forEach(x => {
		if(x.team_a === a && !eventIds.includes(x.event)) {
			let awayColor = x.team_a_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_a_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_a_difficulty === 4 ?
			'rgb(255, 23, 81)' : 'rgb(128, 7, 45)'
			nameAway = fTeams.find(tname => tname.id === x.team_h).short_name
			result +=`<td style="background: ${awayColor};">${nameAway} (A)</td>`
		}
		if(x.team_h === a && !eventIds.includes(x.event)) {
			let homeColor = x.team_h_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_h_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_h_difficulty === 4 ?
			'rgb(255, 23, 81)' : 'rgb(128, 7, 45)'
			nameHome = fTeams.find(tname => tname.id === x.team_a).short_name
			result+= `<td style="background: ${homeColor};">${nameHome} (H)</td>`
		}
	})
	return result
}

document.addEventListener('DOMContentLoaded', loadFixtures, false)