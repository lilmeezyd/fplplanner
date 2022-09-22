let transferNumber = document.querySelector('.free-transfers .transfer-number')
let transferCost = document.querySelector('.cost-transfers .points-lost')
const tabItems = document.querySelectorAll('.tab-item');
const buttonItems = document.querySelectorAll('.button-item');
const playersOut = []
const playersIn = []
let pointsCost = 0

function selectButtons(e) {
	removeBorder()
	removeShow()

	this.classList.add('tab-border')

	buttonItem = document.querySelector(`#${this.id}-tab`)

	buttonItem.classList.add('show')
	if(this.id === 'chip') {
		document.querySelector(`.transfer-rows`).classList.remove('show')
	}
}

function removeBorder(e) {
	tabItems.forEach(x => x.classList.remove('tab-border'))
}

tabItems.forEach(item => item.addEventListener('click', selectButtons))

function removeShow(e) {
	buttonItems.forEach(x => x.classList.remove('show'))
}
function loadFixtures() {
	document.querySelector('.btn-game-fixtures').addEventListener('click', function() {
		document.querySelector('.games-info-results').style.display = 'none'
		document.querySelector('.games-info-fixtures').style.display = 'flex'
	})
}
function loadResults() {
	document.querySelector('.btn-game-results').addEventListener('click', function() {
		document.querySelector('.games-info-results').style.display = 'flex'
		document.querySelector('.games-info-fixtures').style.display = 'none'
	})
}

function trackTransfers(curGameweek) {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory')) 
	let a = retrievedGameweeks.filter(x => x.id === curGameweek)
	let b = retrievedHistory.filter(x => x.id === curGameweek)
	let fts = b[0].fts
	let playersInL = playersIn.length
	let playersOutL = playersOut.length
	if(fts !== 'unlimited') {
		pointsCost = (fts - playersInL)*4
		transferCost.innerHTML = pointsCost > 0 ? 0 : pointsCost
	} else {
		transferCost.innerHTML = 0
	}
}

function trackInRealtime(curGameweek) {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let a = retrievedGameweeks.filter(x => x.id === curGameweek)
	let outLength = a[0].transfers[0].transfersOut.length
	playersOut.push(...a[0].transfers[0].transfersOut)
	playersIn.push(...a[0].transfers[1].transfersIn)
}

function loadTransfersOut() {
	let result = ''
	newPlayersOut = []
		playersOut.forEach(x => {
		playerState.players.forEach(y => {
			if(y.id === x.element) {
				newPlayersOut.push({...x, element_type:y.element_type, web_name:y.web_name, team:y.team})
			}
		})
	})
	newPlayersOut.sort((a,b) => {
		if(a.element_type < b.element_type) return 1
		if(a.element_type > b.element_type) return -1	
	}).forEach(x => result+=transferOut(x))
	document.querySelector('.transfer-out').innerHTML = result
}

function loadTransfersIn() {
	let result = ''
	newPlayersIn = []
		playersIn.forEach(x => {
		playerState.players.forEach(y => {
			if(y.id === x.element) {
				newPlayersIn.push({...x, element_type:y.element_type, web_name:y.web_name, team:y.team})
			}
		})
	})
	newPlayersIn.sort((a,b) => {
		if(a.element_type < b.element_type) return 1
		if(a.element_type > b.element_type) return -1
	}).forEach(x => result+=transferIn(x))
	document.querySelector('.transfer-in').innerHTML = result
}

function transferOut(a) {
	playerTeam = teamState.teams.find(x => x.id === a.team).name
	return `
	<div class="trans-wrapper"><div class="trans small"><span>${a.web_name}</span><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></span></div><div class="trans-team small">${playerTeam}</div></div>
	`
}
function transferIn(a) {
	playerTeam = teamState.teams.find(x => x.id === a.team).name
	return `
	<div class="trans-wrapper"><div class="trans small"><span>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkGreen" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  	<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
	</svg>
    </span><span>${a.web_name}</span></div><div class="trans-team small">${playerTeam}</div></div>
	`
}

function load_popup(id) {
	let hideInplayerButton
	let hideOutplayerButton
	player = playerState.players.find(x => x.id === id)
	pickedPlayer = picks.find(x => x.element === id)
	switchBtn = (player.id === outplayer.element || player.id === inplayer.element) ? 'Cancel' : 'Switch'
	disabled = pickedPlayer.multiplier === 0 ? 'hide-btn' : 'show-btn'
	classname = pickedPlayer.multiplier === 0 ? 'swap-button-out' :  'swap-button-in'
	transferBtn = (player.id === outplayer.element || player.id === inplayer.element) ? 'hide-btn' : 'show-btn'
	if(Object.keys(outplayer).length > 0 || Object.keys(inplayer).length > 0) {
		hideInplayerButton = 'hide-btn'
	}
	if(Object.keys(inplayer).length > 0) {
		hideOutplayerButton =  'hide-btn'
	}
	return `
	<div class="playerpop">
		<div class="namesection small">
			<span>${player.first_name}&nbsp;${player.second_name}</span>
			<button class="btn-info btn-close btn-danger">X</button>
		</div>
		<div class="infobuttons">
			<button class="btn-info btn-info-block btn-danger transfer ${transferBtn} ${hideInplayerButton} ${hideOutplayerButton}">Transfer</button>
			<button class="btn-info btn-info-block btn-warn substitute">${switchBtn}</button>
			<button class="btn-info btn-info-block btn-cap ${disabled} ${transferBtn} ${hideOutplayerButton}">Make Captain</button>
			<button class="btn-info btn-info-block btn-vcap ${disabled} ${transferBtn} ${hideOutplayerButton}" >Make Vice Captain</button>
			<button class="btn-info btn-info-block btn-light btn-player-info ${transferBtn} ${hideInplayerButton} ${hideOutplayerButton}">View Information</button>
		</div>
	`
}

function playerOpponent(a) {
	let result = ''
	fixtureState.fixtures.forEach(x => {
		if(x.team_a === a && !eventIds.includes(x.event)) {
			nameAway = teamState.teams.find(tname => tname.id === x.team_h).name
			dateAway = x.kickoff_time != null ? new Date(x.kickoff_time).toDateString() : ''
			eventAway = x.event !== null ? x.event : ''
			let awayColor = x.team_a_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_a_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_a_difficulty === 4 ?
			'rgb(255, 23, 81)' : 'rgb(128, 7, 45)'
			rowAway = `<tr>
			<td style="font-weight: bolder;">${dateAway}</td><td style="font-weight: bolder;">${eventAway}</td><td>${nameAway} (A)</td>
			<td style="background: ${awayColor};">${x.team_a_difficulty}</td></tr>`
			result += rowAway
		}
		if(x.team_h === a && !eventIds.includes(x.event)) {
			nameHome = teamState.teams.find(tname => tname.id === x.team_a).name
			dateHome = x.kickoff_time != null ? new Date(x.kickoff_time).toDateString() : ''
			eventHome = x.event !== null ? x.event : ''
			let homeColor = x.team_h_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_h_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_h_difficulty === 4 ?
			'rgb(255, 23, 81)' : 'rgb(128, 7, 45)'
			rowHome = `<tr>
			<td style="font-weight: bolder;">${dateHome}</td><td style="font-weight: bolder;">${eventHome}</td><td>${nameHome} (H)</td>
			<td style="background: ${homeColor};">${x.team_h_difficulty}</td></tr>`
			result += rowHome
		}
	})
	return result
}

function playerHistory(a) {
	let result = ''
	let playerData = JSON.parse(sessionStorage.getItem('playerData'))
	playerData.history.forEach(x => {
		let hTeam = teamState.teams.find(tname => tname.id === x.opponent_team).name
		let home = x.was_home ? 'H':'A'
		let row = `<tr><td class='table-sticky'>${x.round}</td>
		<td class='table-sticky-1'>${hTeam}&nbsp;&nbsp;(${home}) </td>
		<td>${x.team_h_score} : ${x.team_a_score}</td>
		<td>${x.minutes}</td>
		<td>${x.total_points}</td>
		<td>${x.goals_scored}</td>
		<td>${x.assists}</td>
		<td>${x.clean_sheets}</td>
		</tr>`
		result += row
	})
	return result
}

//document.querySelector('btn-close-info').onclick = function() {
//	sessionStorage.removeItem('playerData')
//}

// Loading Player info data// Loading or changing captain 
function loadInfo(a) {
	let player = playerState.players.find(x => x.id === a)
	let teamId = player.team
	let elementId = player.element_type
	playerName = `${player.first_name} ${player.second_name}` 
	pTeam = teamState.teams.find(x => x.id === teamId)
	pElement = elementTypesState.elementTypes.find(x => x.id === elementId)
	return `
	<div class="playerpop1">
		<div class="info-details">
			<span class='large'>${playerName}</span>
			<span class='small'>${pTeam.name}</span>
			<span class='small'>${pElement.singular_name}</span>
			<button class="btn btn-close btn-close-info btn-danger btn-player">X</button>
		</div>
		<div class="games-info">
			<div class="games-info-buttons">
				<button class="btn btn-fpl btn-block  btn-game-results">Results</button>
				<button class="btn btn-block btn-fpl btn-game-fixtures">Fixtures</button>
			</div>
			<div class="games-info-fixtures">
				<table class="table" style="width: 100%">
					<thead>
						<tr>
							<th>Date</th>
							<th>GW</th>
							<th>Fixture</th>
							<th>FDR</th>
						</tr>
					</thead>
					<tbody class="t-fixtures">
						${playerOpponent(teamId)}
					</tbody>
				</table>
			</div>
			<div class="games-info-results">
				<table class="table">
					<thead>
						<tr>
							<th class='table-sticky'>GW</th>
							<th class='table-sticky-1'>Fixture</th>
							<th></th>
							<th>Mins</th>
							<th>Points</th>
							<th>Goals</th>
							<th>Assists</th>
							<th>CS</td>
						</tr>
					</thead>
					<tbody>
							${playerHistory(a)}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	`
}

// Loading or changing captain 
function returncaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true"></circle>
	<path d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z" fill="#fff" aria-hidden="true"></path>
	</svg>`
}

// Loading or changing triple captain 
function returnTcaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true" fill="white"></circle>
	<path d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z" fill="#000" aria-hidden="true"></path>
	</svg>`
}

// Loading or changing triple captain 
function returnvcaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="vice-captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true"></circle><polygon points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375" transform="translate(5.25 6)" fill="#fff" aria-hidden="true"></polygon>
	</svg>`
}

// Loading or changing vice triple captain 
function returnvTcaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="vice-captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true" fill="white"></circle><polygon points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375" transform="translate(5.25 6)" fill="#000" aria-hidden="true"></polygon>
	</svg>`
}


function loadMessage(a) {
	let found = playersOut.some(x => x.element === a)
	let name = playerState.players.find(x => x.id === a).web_name
	let msg = found ? 'Transferred OUT' : 'Transferred IN'
	return `<span>&nbsp;${name}&nbsp;${msg}</span>`
}

function loadMessage5(a) {
	let msg = 'Subbed OFF'
	player = playerState.players.find(x => x.id === a.element)
	return `<span>&nbsp;${player.web_name}&nbsp;${msg}</span>`
}

function loadMessage6(a) {
	let msg = 'Subbed ON'
	player = playerState.players.find(x => x.id === a.element)
	return `<span>&nbsp;${player.web_name}&nbsp;${msg}</span>`
}

function loadMessage2(a,b) {
	return `<span>&nbsp;Already have ${a} ${b}</span>`
}

function loadMessage1(a) {
	aTeam = teamState.teams.find(x => x.id === a).name
	return `<span>&nbsp;You Already have 3 players from ${aTeam}</span>`
}