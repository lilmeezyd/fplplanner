let transferNumber = document.querySelector('.free-transfers .transfer-number')
let transferCost = document.querySelector('.cost-transfers .points-lost')
const tabItems = document.querySelectorAll('.tab-item');
const buttonItems = document.querySelectorAll('.button-item');
const playersOut = []
const playersIn = []
//const playersOutpurg = []
//const playersInpurg = []
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

function trackTransfers() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let a = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	let fts = a[0].fts
	let playersInL = playersIn.length
	let playersOutL = playersOut.length
	if(fts !== 'unlimited') {
		pointsCost = (fts - playersInL)*4
		transferCost.innerHTML = pointsCost > 0 ? 0 : pointsCost
	} else {
		transferCost.innerHTML = 0
	}
}

function trackInRealtime() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let a = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	let outLength = a[0].transfers[0].transfersOut.length
	playersOut.push(...a[0].transfers[0].transfersOut)
	playersIn.push(...a[0].transfers[1].transfersIn)
}

function loadTransfersOut() {
	let result = ''
	playersOut.sort((a,b) => {
		if(a.position < b.position) return 1
		if(a.position > b.position) return -1	
	}).forEach(x => result+=transferOut(x))
	document.querySelector('.transfer-out').innerHTML = result
}

function loadTransfersIn() {
	let result = ''
	playersIn.sort((a,b) => {
		if(a.position < b.position) return 1
		if(a.position > b.position) return -1
	}).forEach(x => result+=transferIn(x))
	document.querySelector('.transfer-in').innerHTML = result
}

function transferOut(a) {
	return `
	<div class="trans-wrapper"><div class="trans small"><span>${a.name}</span><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></span></div><div class="trans-team small">${a.playerteam}</div></div>
	`
}
function transferIn(a) {
	return `
	<div class="trans-wrapper"><div class="trans small"><span>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkGreen" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  	<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
	</svg>
    </span><span>${a.name}</span></div><div class="trans-team small">${a.playerteam}</div></div>
	`
}

function load_popup(a,b) {
	let hideInplayerButton
	let hideOutplayerButton
	switchBtn = (a === outplayer.name || a === inplayer.name) && 
				(b === outplayer.bench || b === inplayer.bench) ? 'Cancel' : 'Switch'
	disabled = b === true ? 'hide-btn' : 'show-btn'
	classname = b === true ? 'swap-button-out' :  'swap-button-in'
	transferBtn = (a === outplayer.name || a === inplayer.name) && b === outplayer.bench ? 'hide-btn' : 'show-btn'
	if(Object.keys(outplayer).length > 0 || Object.keys(inplayer).length > 0) {
		hideInplayerButton = b === true ? 'hide-btn' : 'show-btn'
	}
	if(Object.keys(inplayer).length > 0) {
		hideOutplayerButton = b === true ? 'show-btn' : 'hide-btn'
	}
	return `
	<div class="playerpop">
		<div class="namesection small">
			<span>${a}</span>
			<button class="btn-info btn-close btn-danger">X</button>
		</div>
		<div class="infobuttons">
			<button class="btn-info btn-info-block btn-danger transfer ${transferBtn} ${hideInplayerButton} ${hideOutplayerButton}">Transfer</button>
			<button class="btn-info btn-info-block btn-warn substitute">${switchBtn}</button>
			<button class="btn-info btn-info-block btn-cap ${disabled} ${transferBtn} ${hideOutplayerButton}">Make Captain</button>
			<button class="btn-info btn-info-block btn-vcap ${disabled} ${transferBtn} ${hideOutplayerButton}" >Make Vice Captain</button>
			<button class="btn-info btn-info-block btn-light btn-player-info ${transferBtn}">View Information</button>
		</div>
	`
}

function loadInfo(a) {
	let player = players.find(x => x.id === a)
	let teamId = player.team
	let elementId = player.element_type
	playerName = `${player.first_name} ${player.second_name}` 
	pTeam = fTeams.find(x => x.id === teamId)
	pElement = elementTypes.find(x => x.id === elementId)
	return `
	<div class="playerpop1">
		<div class="info-details">
			<span class='large'>${playerName}</span>
			<span class='small'>${pTeam.name}</span>
			<span class='small'>${pElement.singular_name}</span>
		</div>
		<button class="btn btn-close btn-danger btn-player">X</button>
		<div class="games-info">
			<div class="games-info-buttons">
				<button class="btn btn-fpl btn-block  btn-game-results">Results</button>
				<button class="btn btn-block btn-fpl btn-game-fixtures">Fixtures</button>
			</div>
			<div class="games-info-fixtures">
				<table class="table">
					<thead>
						<tr>
							<th>Date</th>
							<th>GW</th>
							<th>Fixture</th>
							<th></th>
							<th>FDR</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>5 Aug</td>
							<td>1</td>
							<td><span>West Ham</span></td>
							<td><span>H</span></td>
							<td class="diff-3">3</td>
						</tr>
						<tr>
							<td>13 Aug</td>
							<td>2</td>
							<td><span>Liverpool</span></td>
							<td><span>A</span></td>
							<td class="diff-5">5</td>
						</tr>
						<tr>
							<td>20 Aug</td>
							<td>3</td>
							<td><span>Tottenham Hotspur</span></td>
							<td><span>H</span></td>
							<td class="diff-4">4</td>
						</tr>
						<tr>
							<td>28 Aug</td>
							<td>4</td>
							<td><span>Manchester United</span></td>
							<td><span>A</span></td>
							<td class="diff-2">2</td>
						</tr>
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
							<th>Points</th>
							<th>Goals</th>
							<th>Assists</th>
							<th tooltip="Expected Goals">xG</th>
							<th>xA</th>
							<th>BC</th>
							<th>xGc</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class='table-sticky'>1</td>
							<td class='table-sticky-1'><span>West Ham</span></td>
							<td><span>H</span></td>
							<td>10</td>
							<td>1</td>
							<td>1</td>
							<td>0.88</td>
							<td>0.33</td>
							<td>3</td>
						</tr>
						<tr>
							<td class='table-sticky'>2</td>
							<td class='table-sticky-1'><span>Liverpool</span></td>
							<td><span>A</span></td>
							<td>10</td>
							<td>1</td>
							<td>1</td>
							<td>0.88</td>
							<td>0.33</td>
							<td>3</td>
						</tr>
						<tr>
							<td class='table-sticky'>3</td>
							<td class='table-sticky-1'><span>Tottenham Hotspur</span></td>
							<td><span>H</span></td>
							<td>10</td>
							<td>1</td>
							<td>1</td>
							<td>0.88</td>
							<td>0.33</td>
							<td>3</td>
						</tr>
						<tr>
							<td class='table-sticky'>4</td>
							<td class='table-sticky-1'><span>Manchester United</span></td>
							<td><span>A</span></td>
							<td>10</td>
							<td>1</td>
							<td>1</td>
							<td>0.88</td>
							<td>0.33</td>
							<td>3</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	`
}

function returncaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true"></circle>
	<path d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z" fill="#fff" aria-hidden="true"></path>
	</svg>`
}
function returnTcaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true" fill="white"></circle>
	<path d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z" fill="#000" aria-hidden="true"></path>
	</svg>`
}

function returnvcaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="vice-captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true"></circle><polygon points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375" transform="translate(5.25 6)" fill="#fff" aria-hidden="true"></polygon>
	</svg>`
}

function returnvTcaptain() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" class="vice-captain">
	<title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true" fill="white"></circle><polygon points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375" transform="translate(5.25 6)" fill="#000" aria-hidden="true"></polygon>
	</svg>`
}


function loadMessage(a) {
	let found = playersOut.some(x => x.name === a)
	let msg = found ? 'Transferred OUT' : 'Transferred IN'
	return `<span>&nbsp;${a}&nbsp;${msg}</span>`
}

function loadMessage5(a) {
	let msg = 'Subbed OFF'
	return `<span>&nbsp;${a.name}&nbsp;${msg}</span>`
}

function loadMessage6(a) {
	let msg = 'Subbed ON'
	return `<span>&nbsp;${a.name}&nbsp;${msg}</span>`
}

function loadMessage2(a,b) {
	return `<span>&nbsp;Already have ${a} ${b}</span>`
}

function loadMessage1(a) {
	return `<span>&nbsp;You Already have 3 players from ${a}</span>`
}