goal = document.getElementById('goal')
defend = document.getElementById('defend')
mid = document.getElementById('mid')
forw = document.getElementById('forw')
benchelement = document.querySelector('.bench_element')
let outplayer = ''
let inplayer = ''
const changeBench = []
let swap = ''
let tgoal
let tgoal1



function loadTeam() {
	document.querySelector('.player-num').innerHTML = picks.length
	result0 = ''
	result1 = ''
	result2 = ''
	result3 = ''
	result4 = ''
	picks.forEach(a => {
		let player = playerState.players.find(x => x.id === a.element)
		if(player.element_type === 1 && (a.multiplier !== 0)) {
			result0 += loadPlayer(a, player)
		}
		if(player.element_type === 1 && a.multiplier === 0) {
			result4 += loadBench(a, player)
		}
		if(player.element_type === 2 && (a.multiplier !== 0)) {
			result1 += loadPlayer(a, player)
		}
		if(player.element_type === 2 && a.multiplier === 0) {
			result4 += loadBench(a, player)
		}
		if(player.element_type === 3 && (a.multiplier !== 0)) {
			result2 += loadPlayer(a, player)
		}
		if(player.element_type === 3 && a.multiplier === 0) {
			result4 += loadBench(a, player)
		}
		if(player.element_type === 4 && (a.multiplier !== 0)) {
			result3 += loadPlayer(a, player)
		}
		if(player.element_type === 4 && a.multiplier === 0) {
			result4 += loadBench(a, player)
		}
	})
	goal.innerHTML = result0
	defend.innerHTML = result1
	mid.innerHTML = result2
	forw.innerHTML = result3
	benchelement.innerHTML = result4

	remainBudget = document.querySelector('.remain-budget')
	spent = picks.reduce((x,y) => x+(+y.price), 0)
	//remainingBudget = budget-spent
	//remainBudget.textContent = remainingBudget.toFixed(1)+'m'
	//remainingBudget >= 0 ? remainBudget.classList.remove('info-danger') : remainBudget.classList.remove('info-success')
	//remainingBudget >= 0 ? remainBudget.classList.add('info-success') : remainBudget.classList.add('info-danger')
	/*if(remainingBudget < 0 || team.length < 15) {
    	document.querySelector('#nextGameweek').setAttribute('disabled', true)
	} else {
		document.querySelector('#nextGameweek').removeAttribute('disabled')
	}*/
	loadTransfersOut()
	loadTransfersIn()
	transfer = document.querySelectorAll('.transfer-button')
	Array.from(transfer).forEach(x => 
		x.onclick = function () {
			playerId = +x.parentElement.id
			playerposition = x.parentElement.getAttribute('position')
			playerIndex = picks.findIndex(x => x.element === playerId)
			playername = playerState.players.find(x => x.id === playerId).web_name
			//playersOutpurg.push(team[playerIndex])
			playersOut.push(picks[playerIndex])
			document.querySelector('.message').style.display = 'block'
			document.querySelector('.details-one').style.paddingBottom = 0
			document.querySelector('.message').classList.add('danger')
			document.querySelector('.message').classList.remove('success')
			document.querySelector('.message').innerHTML = loadMessage(playerId)
			picks.splice(playerIndex,1)
			removedisabled(playerId)
			document.querySelector('.player-num').innerHTML = picks.length
			loadTransfersOut()
			loadTeam()
			hideallswapbtn()
	
	})

	
	swapout = document.querySelectorAll('.swap-button-out')
	Array.from(swapout).forEach(x => {
		x.onclick = function () {
			swapButtonOut(this)
			}
	})


	swapin = document.querySelectorAll('.swap-button-in')
	Array.from(swapin).forEach(x => {
			x.onclick = function () {
				swapButtonIn(x)
			}
	})	

	playerinfo = document.querySelectorAll('.player-info-button')
	Array.from(playerinfo).forEach(x => {
		x.onclick = function() {
			playerId = +x.parentElement.id
			setPlayerData(playerId)
			document.querySelector('.playerpopup').innerHTML = loadInfo(playerId)
			document.querySelector('.playerpopup').style.display = 'block'
			//document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = '17px'
			popupclose = document.querySelector('.btn-player')
			popupclose.addEventListener('click', function() {
				document.querySelector('.playerpopup').innerHTML = ''
				document.querySelector('.playerpopup').style.display = 'none'
				document.body.style.overflow = ''
				document.body.style.paddingRight = ''
			})

			loadFixtures()
			loadResults()
		}
	})

	Array.from(document.querySelectorAll('.btn-details')).forEach(x => {
	x.onclick = function() {
		playerId = +x.parentElement.id
		player = picks.find(x => x.element === playerId)
		document.querySelector('.playerpopup').innerHTML = load_popup(playerId)
		document.querySelector('.playerpopup').style.display = 'block'
		//document.body.style.overflow = 'hidden'
		//document.body.style.paddingRight = '17px'
		//playerpop = document.querySelector('.playerpop')
		popupclose = document.querySelector('.btn-close')
		popupclose.addEventListener('click', function() {
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		})
		document.querySelector('.transfer').onclick = function() {
			playerId = +x.parentElement.id
			playerposition = x.parentElement.getAttribute('position')
			playerIndex = picks.findIndex(x => x.element === playerId)
			playername = playerState.players.find(x => x.id === playerId).web_name
			playersOut.push(picks[playerIndex])
			document.querySelector('.message').style.display = 'block'
			document.querySelector('.details-one').style.paddingBottom = 0
			document.querySelector('.message').classList.add('danger')
			document.querySelector('.message').classList.remove('success')
			document.querySelector('.message').innerHTML = loadMessage(playerId)
			picks.splice(playerIndex,1)
			removedisabled(playerId)
			loadTeam()
			hideallswapbtn()
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		}
		document.querySelector('.substitute').onclick = function() {
			let swapButton = x.parentElement.querySelector('.swap-button').classList
			swapButton.contains('swap-button-out') ? 
			swapButtonOut(x.parentElement.querySelector('.swap-button')) :
			swapButtonIn(x.parentElement.querySelector('.swap-button'))
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''

		}
		document.querySelector('.btn-cap').onclick = function() {
			let oldcaptain = picks.find(x => x.is_captain)
			player = picks.find(x => x.element === playerId)
			oldcaptain.is_captain = false
			oldcaptain.multiplier = 1
			oldcaptain.is_vice_captain = player.is_vice_captain === true ? true : false 
			player.is_captain = true
			player.multiplier = 2
			player.is_vice_captain = false
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
			loadTeam()
		}
		document.querySelector('.btn-vcap').onclick = function() {
			let oldcaptain = picks.find(x => x.is_vice_captain)
			player = picks.find(x => x.element === playerId)
			oldcaptain.is_vice_captain = false
			oldcaptain.is_captain = player.is_captain === true ? true : false
			player.is_vice_captain = true
			player.is_captain = false
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
			loadTeam()
		}
		document.querySelector('.btn-player-info').onclick = function() {
			document.querySelector('.playerpopup').innerHTML = loadInfo(playerId)
			document.querySelector('.playerpopup').style.display = 'block'
			popupclose = document.querySelector('.btn-player')
			popupclose.addEventListener('click', function() {
				document.querySelector('.playerpopup').innerHTML = ''
				document.querySelector('.playerpopup').style.display = 'none'
				document.body.style.overflow = ''
				document.body.style.paddingRight = ''
			})

		outplayer = ''
		inplayer = ''
		loadFixtures()
		loadResults()
		}
	}
})

	


	playerinfo = document.querySelectorAll('.player-info-button')
	//trackInRealtime()

}

document.querySelector('.show-fpl').addEventListener('click', function() {
	document.querySelector('.transfer-rows').classList.toggle('show')
})

function swapButtonOut(a) {
			playerId = +a.parentElement.id
			playerposition = +a.parentElement.getAttribute('position')
			positonnumber = picks.filter(x => x.element_type === playerposition && x.multiplier !== 0).length
			captain = picks.find(x => x.is_captain)
			vcaptain = picks.find(x => x.is_vice_captain)
			player = picks.find(x => x.element === playerId)
			let playerContainer = a.parentElement.parentElement.parentElement
			playerContainer.classList.toggle('player-active')

			if(playerposition === 4) {
				elementWrapper = a.parentElement.parentElement.parentElement.parentElement
				forwardElem = elementWrapper.querySelectorAll('[position="4"]').length
				if(forwardElem === 1) {
					elementWrapper.querySelector('.pitch_unit').style.flexGrow = 0
				}
			}
			if(playerposition === 1) {
				elementWrapper = a.parentElement.parentElement.parentElement.parentElement
				elementWrapper.querySelector('.pitch_unit').style.flexGrow = 0
			}


			function inout() {
				playerIndex = picks.findIndex(x => x.element === playerId)
				player = playerState.players.find(x => x.id === a.element)
				outplayer = picks[playerIndex]
				document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = loadMessage5(outplayer)
				if(playerposition === 1){
					tgoal = picks.filter(x => x.element_type === 1 && x.multiplier === 0)
					tgoal1 = picks.filter(x => x.element_type !== 1)
					addSwap(tgoal)
					hideswapbtn(tgoal1)
					return hidetransferbtn()
				}
				if(playerposition === 2){
					if(positonnumber === 3) {
						tgoal = picks.filter(x => x.element_type === 2 && x.multiplier === 0)
						tgoal1 = picks.filter(x => (x.multiplier !== 0 && x.element !== playerId) || (x.multiplier === 0 && x.element_type  !== 2))
						addSwap(tgoal)
						hidetransferbtn()
						return hideswapbtn(tgoal1)
						
					} else {
						tgoal = picks.filter(x => x.element_type !== 1 && x.multiplier === 0)
						tgoal1 = picks.filter(x => x.element_type === 1 || (x.multiplier !== 0 && x.element !== playerId))
						addSwap(tgoal)
						hidetransferbtn()
						return hideswapbtn(tgoal1)
						
					}
				}
				if(playerposition === 3){
					if(positonnumber === 2) {
						tgoal = picks.filter(x => x.element_type === 3 && x.multiplier === 0)
						tgoal1 = picks.filter(x => (x.multiplier !== 0 && x.element !== playerId) || (x.multiplier === 0 && x.element_type !== 3))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					} else {
						tgoal = picks.filter(x => x.element_type !== 1 && x.multiplier === 0)
						tgoal1 = picks.filter(x => x.element_type === 1 || (x.multiplier !== 0 && x.element !== playerId))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					}
				}
				if(playerposition === 4){
					if(positonnumber === 1) {
						tgoal = picks.filter(x => x.element_type === 4 && x.multiplier === 0)
						tgoal1 = picks.filter(x => (x.multiplier !== 0 && x.element !== playerId) || (x.multiplier === 0 && x.element_type !== 4))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					} else {
						tgoal = picks.filter(x => x.element_type !== 1 && x.multiplier === 0)
						tgoal1 = picks.filter(x => x.element_type === 1 || (x.multiplier !== 0 && x.element !== playerId))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					}
				}
			}
			
			function outin() {
				playerIndex = tgoal.findIndex(x => x.multiplier !== 0 && x.element_type === playerposition && x.element == playerId)
			    outplayer = tgoal[playerIndex]
			    document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = loadMessage5(outplayer)
			    if(outplayer.is_captain) {
			    	inplayer.is_captain = true;
			    	outplayer.is_captain = false
			    }
			    if(outplayer.is_vice_captain) {
			    	inplayer.is_vice_captain = true
			    	outplayer.is_vice_captain = false
			    }
				swapplayer(outplayer, inplayer)
				tgoal.length = 0
				outplayer = ''
				inplayer = ''
			}
			//Object.keys(inplayer).length > 0 && outin() || inout()
			if(playerContainer.classList.contains('player-active')) {
				if(Object.keys(inplayer).length > 0) {
					outin();
				} else {
					inout()
				}
			} else {
				showtransferbtn()
				showswapbtn()
				outplayer = ''
				loadTeam()
			}
		
}

function swapButtonIn(a) {
			playerId = +a.parentElement.id
			playerposition = +a.parentElement.getAttribute('position')
			teamdefenders = picks.filter(x => x.multiplier !== 0 && x.element_type === 2).length
			teammidfielders = picks.filter(x => x.multiplier !== 0 && x.element_type === 3).length
			teamforwards = picks.filter(x => x.multiplier !== 0 && x.element_type === 4).length
			let playerContainer = a.parentElement.parentElement
			playerContainer.classList.toggle('player-active')
			function outin() {
				playerIndex = picks.findIndex(x => x.multiplier === 0 && x.element_type === playerposition && x.element == playerId)
			    inplayer = picks[playerIndex]
			    document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.remove('danger')
				document.querySelector('.message').classList.add('success')
				document.querySelector('.message').innerHTML = loadMessage6(inplayer)
			    if(outplayer.is_captain) {
			    	inplayer.is_captain = true;
			    	outplayer.is_captain = false
		    		}
		    	if(outplayer.is_vice_captain) {
		    		inplayer.is_vice_captain = true
		    		outplayer.is_vice_captain = false
		    		}

				swapplayer(outplayer, inplayer)
				loadTeam()
				tgoal.length = 0
				inplayer = ''
				outplayer = ''
			}
			function inout() {
				playerIndex = picks.findIndex(x => x.multiplier === 0 && x.element_type === playerposition && x.element == playerId)
				inplayer = picks[playerIndex]
				changeBench.push(inplayer)
				document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.remove('danger')
				document.querySelector('.message').classList.add('success')
				document.querySelector('.message').innerHTML = loadMessage6(inplayer)
				if(playerposition === 1){
					tgoal = picks.filter(x => x.element_type === 1 && x.multiplier !== 0)
					tgoal1 = picks.filter(x => (x.multiplier === 0 && x.element !== playerId) || (x.multiplier !== 0 && x.element_type !== 1))
					addSwap(tgoal)
					hideswapbtn(tgoal1)
					return hidetransferbtn()
				}
				if(playerposition === 2){
					if(teamforwards === 1) {
						tgoal = picks.filter(x => x.element !== playerId && ( x.element_type !== 4 && x.element_type !== 1 || (x.multiplier === 0 && x.element_type !== 1)))
						tgoal1 = picks.filter(x => x.element_type === 4 && x.multiplier !== 0 || x.element_type === 1)
						hideswapbtn(tgoal1)
						addSwap(tgoal)
						hidetransferbtn()
					} else {
						tgoal = picks.filter(x => x.element !== playerId && x.element_type !== 1)
						tgoal1 = picks.filter(x => x.element_type === 1)
						hideswapbtn(tgoal1)
						hidetransferbtn()
						return addSwap(tgoal)
					}
				}
				if(playerposition === 3){
					if(teamforwards === 1) {
						tgoal = picks.filter(x => x.element !== playerId && (x.element_type !== 4 && x.element_type !== 1 || (x.multiplier === 0 && x.element_type !== 1)))
						tgoal1 = picks.filter(x => x.element_type === 4 && x.multiplier !== 0 || x.element_type === 1)
						hideswapbtn(tgoal1)
						addSwap(tgoal)
						hidetransferbtn()
					} else if(teamdefenders === 3) {
						tgoal = picks.filter(x => x.element !== playerId &&  (x.element_type !== 2 && x.element_type !== 1 || (x.multiplier === 0 && x.element_type !== 1)))
						tgoal1 = picks.filter(x => x.element_type === 2 && x.multiplier !== 0 || x.element_type === 1)
						hideswapbtn(tgoal1)
						addSwap(tgoal)
						hidetransferbtn()
					} else {
						tgoal = picks.filter(x => (x.element_type !== 1 && x.multiplier !== 0)||(x.element !== playerId && x.element_type !== 1))
						tgoal1 = picks.filter(x => x.element_type === 1)
						hideswapbtn(tgoal1)
						addSwap(tgoal)
						hidetransferbtn()
					}
				}
				if(playerposition === 4){
					if(teamdefenders === 3) {
						tgoal =  picks.filter(x => x.element !== playerId &&  (x.element_type !== 2 && x.element_type !== 1 || (x.multiplier === 0 && x.element_type !== 1)))
						tgoal1 = picks.filter(x => x.element_type === 2 && x.multiplier !== 0 || x.element_type === 1)
						hideswapbtn(tgoal1)
						addSwap(tgoal)
						hidetransferbtn()
					} else {
						tgoal = picks.filter(x => (x.element_type !== 1 && x.multiplier !== 0)||(x.element !== playerId && x.element_type !== 1))
						tgoal1 = picks.filter(x => x.element_type === 1)
						hideswapbtn(tgoal1)
						hidetransferbtn()
						addSwap(tgoal)
						
					}
				}
			}
			//tgoal = team.filter(x => x.position !== 'goalkeeper' && !x.bench)
			//tgoal1 = team.filter(x => x.position === 'goalkeeper' || (x.bench && x.name !== playername))
			//Object.keys(outplayer).length > 0 && outin()
			if(Object.keys(outplayer).length > 0) {
				outin();
			} else {
				inout()
			}
			
			
		if(Object.keys(outplayer === 0) && changeBench.length === 2) {
				changeBenchOrder();
			}
}

function changeBenchOrder() {
	let playerA = changeBench[0].position
	let playerB = changeBench[1].position
	changeBench[0].position = 0 
	changeBench[1].position = 0
	changeBench[0].position = playerB
	changeBench[1].position = playerA 
	loadTeam()
	changeBench.length = 0
	inplayer = ''
}

function loadPlayer(a, player) {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	let teamObj = teamState.teams.find(x => x.id === player.team)
	let news = player.chance_of_playing_next_round
	let teamId = player.team
	let team_name = teamObj.name
	let positionObj = elementTypesState.elementTypes.find(x => x.id === player.element_type)
	player.image = positionObj.id === 1 ? `./static/shirt_${teamObj.code}_1-66.webp`:
		`./static/shirt_${teamObj.code}-66.webp`
	captain = a.is_captain === true && currentHistory[0].tcap.event !== weekNdeadline[1] ? returncaptain() : 
	a.is_vice_captain === true && currentHistory[0].tcap.event !== weekNdeadline[1]  ? returnvcaptain() : 
	a.is_captain === true && currentHistory[0].tcap.event === weekNdeadline[1] ? returnTcaptain() :
	a.is_vice_captain === true && currentHistory[0].tcap.event === weekNdeadline[1] ? returnvTcaptain() :""
	let backgroundColor = news == 0 ? 'darkred' : news == 25 ? 'darkorange' :
			news == 50 ? 'orange' : news == 75 ? 'yellow' : 'rgba(0,0,55,0.9)'
	let color = news == 25 ? 'rgba(0,0,55,0.9)' :
			news == 50 ? 'rgba(0,0,55,0.9)' : news == 75 ? 'rgba(0,0,55,0.9)' :'white'		
	return `
	<div class="pitch_unit">
	<div class="element_container">
									<div size="element_container" class="element_container-two"  team="${team_name}" position="${player.element_type}" id="${player.id}">
										<button type="button" class="btn-details">
											<img src="${player.image}" size="image">
											<div class="details-cont">
												<div class="data_name"
												style="background:${backgroundColor}; color:${color};">${player.web_name}</div>
												<div class="data_fixtures x-small">
												${nextFixtures(teamId,player)}
												</div>
											</div>
										</button>
										<button class="player-info-button player-info-pitch">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
						  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
						  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
						 </svg>
										</button>
										<button class="transfer-button">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
												  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
												</svg>
										</button>
										<button class="swap-button-out swap-button">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
											  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
											  </svg>
										</button>
										<div class="captain">${captain}</div>
									</div>
					</div>
					</div>`
}

function loadBench(a, player) {
	let teamObj = teamState.teams.find(x => x.id === player.team)
	let news = player.chance_of_playing_next_round
	let teamId = player.team
	let team_name = teamObj.name
	let short_name = teamObj.short_name
	let positionObj = elementTypesState.elementTypes.find(x => x.id === player.element_type)
	player.image = positionObj.id === 1 ? `./static/shirt_${teamObj.code}_1-66.webp`:
		`./static/shirt_${teamObj.code}-66.webp`
	order = a.position === 13 ? 'one' : a.position === 14 ? 'two' : a.position === 15 ? 'three' : a.position === 12 ? 'goalie' : ''
	let backgroundColor = news == 0 ? 'darkred' : news == 25 ? 'darkorange' :
			news == 50 ? 'orange' : news == 75 ? 'yellow' : 'rgba(0,0,55,0.9)'
	let color = news == 25 ? 'rgba(0,0,55,0.9)' :
			news == 50 ? 'rgba(0,0,55,0.9)' : news == 75 ? 'rgba(0,0,55,0.9)' :'white'		
	return `<div class="bench_unit ${order}" id="${a.position}" size='pitch'>
								<h3 class="bench_unit_heading">
									<span class="bean tooltip">${positionObj.singular_name_short}</span>
								</h3>
								<div class="bean1">
									<div size="element_container" class="styledPitchElement" position="${player.element_type}" team="${team_name}" id="${player.id}">
										<button type="button" class="btn-details">
											<img src="${player.image}" size="image">
											<div class="details-cont">
												<div class="data_name" style="background:${backgroundColor}; color:${color};">${player.web_name}</div>
												<div class="data_fixtures x-small">
												${nextFixtures(teamId, player)}
												</div>
											</div>
										</button>
										<button class="player-info-button player-info-pitch">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
						  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
						  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
						 </svg>
										</button>
										<button class="transfer-button">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
											  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
											  </svg>
										</button>
										<button class="swap-button-in swap-button">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkgreen" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
											  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
											  </svg>
										</button>
									</div>
								</div>
							</div>`			
}

/* Load Each Player's Fixtures */
function nextFixtures(a,b) {
	let resultFix = ''
	let resultFour = ''
	eventztream = JSON.parse(sessionStorage.getItem('events'))
	filteredEvents = eventztream.filter(x => new Date(x.deadline_time) < new Date(weekNdeadline[0]))
	newEventId = filteredEvents.length + 4
	let nextFix = fixtureState.fixtures
					.filter(x => x.event > weekNdeadline[1]-1  && (x.team_a === a || x.team_h === a))
					.splice(0,1)
	let nextFour = fixtureState.fixtures
					.filter(x => x.event > weekNdeadline[1]-1 && (x.team_a === a || x.team_h === a))
					.splice(1,3)
	let nextFourFix = fixtureState.fixtures
					.filter(x => x.event > weekNdeadline[1]-1 && (x.team_a === a || x.team_h === a))
					.splice(0,4)			
	let newNextFour = []
	//let newNextFourOne = []											

	const realFour = {
		'zero' : filteredEvents.length + 1,
		'one': filteredEvents.length + 2,
		'two': filteredEvents.length + 3,
		'three': filteredEvents.length + 4
	}

	let hTeam, aTeam
	// Highghting blank gameweeks
	nextFourFix.forEach((x, key) => {
		if(key === 0 && x.event !== realFour['zero']) {
			hTeam = x.team_h === b.team ? x.team_h : 0
			aTeam = x.team_a === b.team ? x.team_a : 0
			newNextFour.push({...x, event:realFour['zero'], 
				team_h:hTeam, team_a:aTeam, team_a_difficulty:0, team_h_difficulty:0})
		}
		newNextFour.push(x) 
	})

	newNextFour.forEach((x, key) => {
		if(key === 1 && x.event !== realFour['one']) {
			hTeam = x.team_h === b.team ? x.team_h : 0
			aTeam = x.team_a === b.team ? x.team_a : 0
			newNextFour.splice(1,1, {...x, event:realFour['one'], 
				team_a_difficulty:0, team_h_difficulty:0, team_h:hTeam, team_a:aTeam,}, x)
		}
	})
	newNextFour.forEach((x, key) => {
		if(key === 2 && x.event !== realFour['two']) {
			hTeam = x.team_h === b.team ? x.team_h : 0
			aTeam = x.team_a === b.team ? x.team_a : 0
			newNextFour.splice(2,1, {...x, event:realFour['two'], 
				team_a_difficulty:0, team_h_difficulty:0, team_h:hTeam, team_a:aTeam,}, x)
		}
	})
	newNextFour.forEach((x, key) => {
		if(key === 3 && x.event !== realFour['three']) {
			hTeam = x.team_h === b.team ? x.team_h : 0
			aTeam = x.team_a === b.team ? x.team_a : 0
			newNextFour.splice(3,1, {...x, event:realFour['three'], 
				team_a_difficulty:0, team_h_difficulty:0, team_h:hTeam, team_a:aTeam,}, x)
		}
	})

	// Loading Blank Fixtures
	/*newNextFour.forEach((x, key) => {
		if(key === 1 && x.event !== realFour['one']) {
			newNextFour.splice(1,1,{...x, event:realFour['one'], team_a_difficulty:0, team_h_difficulty:0})
		}
	})*/
	nextOne = newNextFour.splice(0,1)
	nextThree = newNextFour.splice(0,3)
	nextOne.forEach(x => {
		if(x.team_a === a) {
			nameAway = nameAway = x.team_h === 0 ? 'blk' : teamState.teams.find(tname => tname.id === x.team_h).short_name.toLowerCase()
			let awayColor = x.team_a_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_a_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_a_difficulty === 4 ?
			'rgb(255, 23, 81)' : x.team_a_difficulty === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
			spanAway = `<span style="background: ${awayColor}">${nameAway}</span>`
			resultFix+=spanAway
		}
		if(x.team_h === a) {
			nameHome = x.team_a === 0 ? 'BLK' : teamState.teams.find(tname => tname.id === x.team_a).short_name
			let homeColor = x.team_h_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_h_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_h_difficulty === 4 ?
			'rgb(255, 23, 81)' : x.team_h_difficulty === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
			spanHome = `<span style="background: ${homeColor}">${nameHome}</span>`
			resultFix += spanHome
		}
	})
	nextThree.forEach((x,key) => {
		if(x.team_a === a) {
			nameAway = x.team_h === 0 ? 'blk' : teamState.teams.find(tname => tname.id === x.team_h).short_name.toLowerCase()
			let awayColor = x.team_a_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_a_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_a_difficulty === 4 ?
			'rgb(255, 23, 81)' : x.team_a_difficulty === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
			spanAway = `<span style="background: ${awayColor}">${nameAway}</span>`
			resultFour+=spanAway
		}
		if(x.team_h === a) {
			nameHome = x.team_a === 0 ? 'BLK' : teamState.teams.find(tname => tname.id === x.team_a).short_name
			let homeColor = x.team_h_difficulty === 2 ? 'rgb(1, 252, 122)' : 
			x.team_h_difficulty === 3 ? 'rgb(231, 231, 231)' : x.team_h_difficulty === 4 ?
			'rgb(255, 23, 81)' : x.team_h_difficulty === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
			spanHome = `<span style="background: ${homeColor}">${nameHome}</span>`
			resultFour += spanHome
		}
	})

	result = `<div class="next-fix">
					${resultFix}
			  </div>
			  <div class="up-fix">
				   ${resultFour}
			  </div>`
	return result
}

function showtransferbtn() {
	Array.from(transfer).forEach(x => {
		x.style.display = 'block'
	})
}

function showswapbtn() {
	Array.from(document.querySelectorAll('.swap-button')).forEach(x => {
		x.style.display = 'block'
	})
}

function hidetransferbtn() {
	Array.from(transfer).forEach(x => {
		x.style.display = 'none'
	})
}

function hideallswapbtn() {
	Array.from(document.querySelectorAll('.swap-button')).forEach(x => {
		x.style.display = 'none'
	})
	/*Array.from(document.querySelectorAll('.player-info-button'))forEach(x => {
		x.style.display = 'none'
	})*/
}

function hideswapbtn(a) {
	Array.from(document.querySelectorAll('.swap-button')).forEach(x => {
		playerId = +x.parentElement.id
		playerposition = x.parentElement.getAttribute('position')

		a.forEach(y => {
			if(y.element === playerId) {
				x.style.display = 'none'
				x.parentElement.querySelector('.btn-details').disabled = true
				x.parentElement.querySelector('.btn-details').style.opacity = 0.5
			}
		})
	})
}

function addSwap(arr) {
	forwardElem = arr.filter(x => x.element_type === 4 && x.multiplier !== 0).length
	goalkeeperElem = arr.filter(x => x.element_type === 1 && x.multiplier !== 0).length
	Array.from(document.querySelectorAll('.btn-details')).forEach(x => {
					let playerId = +x.parentElement.id
					let position = +x.parentElement.getAttribute('position')
					arr.forEach(a => {
						elementWrapper = x.parentElement.parentElement.parentElement.parentElement
						if(a.element === playerId && a.element_type === position) {
							x.parentElement.
							parentElement.style.backgroundColor = 'rgba(255, 100, 0, 0.6)'
							x.parentElement.
							parentElement.style.borderRadius = '5px'
							if(goalkeeperElem === 1 || forwardElem === 1) {
								//elementWrapper.querySelector('.pitch_unit').style.flexGrow = 0
						 	}
						}
					})
				})
}

function swapplayer(a, b) {
	bbenchOrder = b.position
	sbenchOrder = a.position
	aMultiplier = a.multiplier
	bMultiplier = b.multiplier
	a.multiplier = bMultiplier
	b.multiplier = aMultiplier
	b.position = sbenchOrder
	a.position = bbenchOrder
	loadTeam()
	changeBench.length = 0
}



function removedisabled(a) {
	Array.from(document.querySelectorAll('.player-cell')).forEach(x => {
		let playerId = +x.parentElement.id
		if(a === playerId) {
			x.removeAttribute('disabled')
		}
		//newindex = cachedPlayers.findIndex(x => x.name === a && x.image === b && x.position === c)
		//cachedPlayers[newindex].disabled = ''
	})
}


