goal = document.getElementById('goal')
defend = document.getElementById('defend')
mid = document.getElementById('mid')
forw = document.getElementById('forw')
document.addEventListener('DOMContentLoaded', load_team, false)
benchelement = document.querySelector('.bench_element')
let outplayer = ''
let inplayer = ''
const changeBench = []
let swap = ''
let tgoal
let tgoal1



function load_team() {
	document.querySelector('.player-num').innerHTML = team.length
	result = ''
	result1 = ''
	result2 = ''
	result3 = ''
	result4 = ''
	team.forEach(a => {
		if(a.position === 'goalkeeper' && !a.bench) {
			result += load_player(a)
		}
		if(a.position === 'goalkeeper' && a.bench) {
			result4 += load_bench(a)
		}
		if(a.position === 'defender' && !a.bench) {
			result1 += load_player(a)
		}
		if(a.position === 'defender' && a.bench) {
			result4 += load_bench(a)
		}
		if(a.position === 'midfielder' && !a.bench) {
			result2 += load_player(a)
		}
		if(a.position === 'midfielder' && a.bench) {
			result4 += load_bench(a)
		}
		if(a.position === 'forward' && !a.bench) {
			result3 += load_player(a)
		}
		if(a.position === 'forward' && a.bench) {
			result4 += load_bench(a)
		}
	})
	goal.innerHTML = result
	defend.innerHTML = result1
	mid.innerHTML = result2
	forw.innerHTML = result3
	benchelement.innerHTML = result4

	remainBudget = document.querySelector('.remain-budget')
	spent = team.reduce((x,y) => x+(+y.price), 0)
	remainingBudget = budget-spent
	remainBudget.textContent = remainingBudget.toFixed(1)+'m'
	remainingBudget >= 0 ? remainBudget.classList.remove('info-danger') : remainBudget.classList.remove('info-success')
	remainingBudget >= 0 ? remainBudget.classList.add('info-success') : remainBudget.classList.add('info-danger')
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
			playername = x.parentElement.querySelector('.data_name').innerText
			teamimage = this.parentElement.querySelector('img').getAttribute('src')
			playerposition = x.parentElement.getAttribute('position')
			playerIndex = team.findIndex(x => x.position === playerposition && x.name == playername && x.image === teamimage)
			//playersOutpurg.push(team[playerIndex])
			playersOut.push(team[playerIndex])
			document.querySelector('.message').style.display = 'block'
			document.querySelector('.details-one').style.paddingBottom = 0
			document.querySelector('.message').classList.add('danger')
			document.querySelector('.message').classList.remove('success')
			document.querySelector('.message').innerHTML = loadMessage(playername)
			team.splice(playerIndex,1)
			removedisabled(playername, teamimage, playerposition)
			document.querySelector('.player-num').innerHTML = team.length
			loadTransfersOut()
			load_team()
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
			playerteam = x.parentElement.getAttribute('team')
			playername = x.parentElement.querySelector('.data_name').innerText
			playerposition = x.parentElement.getAttribute('position')
			//document.querySelector('.playerpopup').innerHTML = loadInfo(playername, playerposition, playerteam)
			document.querySelector('.playerpopup').style.display = 'block'
			document.body.style.overflow = 'hidden'
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
		playername = x.querySelector('.data_name').innerText
		teamimage = x.querySelector('img').getAttribute('src')
		playerposition = x.parentElement.getAttribute('position')
		playerteam = x.parentElement.getAttribute('team')
		name = x.querySelector('.data_name').innerText
		player = team.find(x => x.position === playerposition && x.name == playername && x.image === teamimage)
		document.querySelector('.playerpopup').innerHTML = load_popup(name, player.bench)
		document.querySelector('.playerpopup').style.display = 'block'
		document.body.style.overflow = 'hidden'
		document.body.style.paddingRight = '17px'
		//playerpop = document.querySelector('.playerpop')
		popupclose = document.querySelector('.btn-close')
		popupclose.addEventListener('click', function() {
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		})
		document.querySelector('.transfer').onclick = function() {
			playerIndex = team.findIndex(x => x.position === playerposition && x.name == playername && x.image === teamimage)
			playersOut.push(team[playerIndex])
			document.querySelector('.message').style.display = 'block'
			document.querySelector('.details-one').style.paddingBottom = 0
			document.querySelector('.message').classList.add('danger')
			document.querySelector('.message').classList.remove('success')
			document.querySelector('.message').innerHTML = loadMessage(playername)
			team.splice(playerIndex,1)
			removedisabled(playername, teamimage, playerposition)
			load_team()
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
			let oldcaptain = team.find(x => x.captain)
			player = team.find(x => x.position === playerposition && x.name == playername && x.image === teamimage)
			oldcaptain.captain = false
			oldcaptain.vcaptain = player.vcaptain === true ? true : false 
			player.captain = true
			player.vcaptain = false
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
			load_team()
		}
		document.querySelector('.btn-vcap').onclick = function() {
			let oldcaptain = team.find(x => x.vcaptain)
			player = team.find(x => x.position === playerposition && x.name == playername && x.image === teamimage)
			oldcaptain.vcaptain = false
			oldcaptain.captain = player.captain === true ? true : false
			player.vcaptain = true
			player.captain = false
			document.querySelector('.playerpopup').innerHTML = ''
			document.querySelector('.playerpopup').style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
			load_team()
		}
		document.querySelector('.btn-player-info').onclick = function() {
			//document.querySelector('.playerpopup').innerHTML = loadInfo(playername, playerposition, playerteam)
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
	teamimage = a.parentElement.querySelector('img').getAttribute('src')
			playername = a.parentElement.querySelector('.data_name').innerText
			playerposition = a.parentElement.getAttribute('position')
			positonnumber = team.filter(x => x.position === playerposition && !x.bench).length
			captain = team.find(x => x.captain)
			vcaptain = team.find(x => x.vcaptain)
			player = team.find(x => x.position === playerposition && x.name == playername && x.image === teamimage)
			let playerContainer = a.parentElement.parentElement.parentElement
			playerContainer.classList.toggle('player-active')

			if(playerposition === 'forward') {
				elementWrapper = a.parentElement.parentElement.parentElement.parentElement
				forwardElem = elementWrapper.querySelectorAll('[position="forward"]').length
				if(forwardElem === 1) {
					elementWrapper.querySelector('.pitch_unit').style.flexGrow = 0
				}
			}
			if(playerposition === 'goalkeeper') {
				elementWrapper = a.parentElement.parentElement.parentElement.parentElement
				elementWrapper.querySelector('.pitch_unit').style.flexGrow = 0
			}


			function inout() {
				playerIndex = team.findIndex(x => !x.bench && x.position === playerposition && x.name == playername && x.image === teamimage)
				outplayer = team[playerIndex]
				document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = loadMessage5(outplayer)
				if(playerposition === 'goalkeeper'){
					tgoal = team.filter(x => x.position === 'goalkeeper' && x.bench)
					tgoal1 = team.filter(x => x.position !== 'goalkeeper')
					addSwap(tgoal)
					hideswapbtn(tgoal1)
					return hidetransferbtn()
				}
				if(playerposition === 'defender'){
					if(positonnumber === 3) {
						tgoal = team.filter(x => x.position === 'defender' && x.bench)
						tgoal1 = team.filter(x => (!x.bench && x.name !== playername) || (x.bench && x.position !== 'defender'))
						addSwap(tgoal)
						hidetransferbtn()
						return hideswapbtn(tgoal1)
						
					} else {
						tgoal = team.filter(x => x.position !== 'goalkeeper' && x.bench)
						tgoal1 = team.filter(x => x.position === 'goalkeeper' || (!x.bench && x.name !== playername))
						addSwap(tgoal)
						hidetransferbtn()
						return hideswapbtn(tgoal1)
						
					}
				}
				if(playerposition === 'midfielder'){
					if(positonnumber === 2) {
						tgoal = team.filter(x => x.position === 'midfielder' && x.bench)
						tgoal1 = team.filter(x => (!x.bench && x.name !== playername) || (x.bench && x.position !== 'midfielder'))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					} else {
						tgoal = team.filter(x => x.position !== 'goalkeeper' && x.bench)
						tgoal1 = team.filter(x => x.position === 'goalkeeper' || (!x.bench && x.name !== playername))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					}
				}
				if(playerposition === 'forward'){
					if(positonnumber === 1) {
						tgoal = team.filter(x => x.position === 'forward' && x.bench)
						tgoal1 = team.filter(x => (!x.bench && x.name !== playername) || (x.bench && x.position !== 'forward'))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					} else {
						tgoal = team.filter(x => x.position !== 'goalkeeper' && x.bench)
						tgoal1 = team.filter(x => x.position === 'goalkeeper' || (!x.bench && x.name !== playername))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						hidetransferbtn()
					}
				}
			}
			
			function outin() {
				playerIndex = tgoal.findIndex(x => !x.bench && x.position === playerposition && x.name == playername && x.image === teamimage)
			    outplayer = tgoal[playerIndex]
			    document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = loadMessage5(outplayer)
			    if(outplayer.captain) {
			    	inplayer.captain = true;
			    	outplayer.captain = false
			    }
			    if(outplayer.vcaptain) {
			    	inplayer.vcaptain = true
			    	outplayer.vcaptain = false
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
				load_team()
			}
		
}

function swapButtonIn(a) {
	teamimage = a.parentElement.querySelector('img').getAttribute('src')
				playername = a.parentElement.querySelector('.data_name').innerText
				playerposition = a.parentElement.getAttribute('position')
				teamdefenders = team.filter(x => !x.bench && x.position === 'defender').length
				teammidfielders = team.filter(x => !x.bench && x.position === 'midfielder').length
				teamforwards = team.filter(x => !x.bench && x.position === 'forward').length
				let playerContainer = a.parentElement.parentElement.parentElement
				playerContainer.classList.toggle('player-active')
				function outin() {
					playerIndex = tgoal.findIndex(x => x.bench && x.position === playerposition && x.name == playername && x.image === teamimage)
				    inplayer = tgoal[playerIndex]
				    document.querySelector('.message').style.display = 'block'
					document.querySelector('.details-one').style.paddingBottom = 0
					document.querySelector('.message').classList.remove('danger')
					document.querySelector('.message').classList.add('success')
					document.querySelector('.message').innerHTML = loadMessage6(inplayer)
				    if(outplayer.captain) {
				    	inplayer.captain = true;
				    	outplayer.captain = false
			    		}
			    	if(outplayer.vcaptain) {
			    		inplayer.vcaptain = true
			    		outplayer.vcaptain = false
			    		}
					swapplayer(outplayer, inplayer)
					load_team()
					tgoal.length = 0
					inplayer = ''
					outplayer = ''
				}
				function inout() {
					playerIndex = team.findIndex(x => x.bench && x.position === playerposition && x.name == playername && x.image === teamimage)
					inplayer = team[playerIndex]
					changeBench.push(inplayer)
					document.querySelector('.message').style.display = 'block'
					document.querySelector('.details-one').style.paddingBottom = 0
					document.querySelector('.message').classList.remove('danger')
					document.querySelector('.message').classList.add('success')
					document.querySelector('.message').innerHTML = loadMessage6(inplayer)
					if(playerposition === 'goalkeeper'){
						tgoal = team.filter(x => x.position === 'goalkeeper' && !x.bench)
						tgoal1 = team.filter(x => (x.bench && x.name !== playername) || (!x.bench && x.position !== 'goalkeeper'))
						addSwap(tgoal)
						hideswapbtn(tgoal1)
						return hidetransferbtn()
					}
					if(playerposition === 'defender'){
						if(teamforwards === 1) {
							tgoal = team.filter(x => x.name !== playername && ( x.position !== 'forward' && x.position !== 'goalkeeper' || (x.bench && x.position !== 'goalkeeper')))
							tgoal1 = team.filter(x => x.position === 'forward' && !x.bench || x.position === 'goalkeeper')
							hideswapbtn(tgoal1)
							addSwap(tgoal)
							hidetransferbtn()
						} else {
							tgoal = team.filter(x => x.name !== playername && x.position !== 'goalkeeper')
							tgoal1 = team.filter(x => x.position === 'goalkeeper')
							hideswapbtn(tgoal1)
							hidetransferbtn()
							return addSwap(tgoal)
						}
					}
					if(playerposition === 'midfielder'){
						if(teamforwards === 1) {
							tgoal = team.filter(x => x.name !== playername && (x.position !== 'forward' && x.position !== 'goalkeeper' || (x.bench && x.position !== 'goalkeeper')))
							tgoal1 = team.filter(x => x.position === 'forward' && !x.bench || x.position === 'goalkeeper')
							hideswapbtn(tgoal1)
							addSwap(tgoal)
							hidetransferbtn()
						} else if(teamdefenders === 3) {
							tgoal = team.filter(x => x.name !== playername &&  (x.position !== 'defender' && x.position !== 'goalkeeper' || (x.bench && x.position !== 'goalkeeper')))
							tgoal1 = team.filter(x => x.position === 'defender' && !x.bench || x.position === 'goalkeeper')
							hideswapbtn(tgoal1)
							addSwap(tgoal)
							hidetransferbtn()
						} else {
							tgoal = team.filter(x => (x.position !== 'goalkeeper' && !x.bench)||(x.name !== playername && x.position !== 'goalkeeper'))
							tgoal1 = team.filter(x => x.position === 'goalkeeper')
							hideswapbtn(tgoal1)
							addSwap(tgoal)
							hidetransferbtn()
						}
					}
					if(playerposition === 'forward'){
						if(teamdefenders === 3) {
							tgoal =  team.filter(x => x.name !== playername &&  (x.position !== 'defender' && x.position !== 'goalkeeper' || (x.bench && x.position !== 'goalkeeper')))
							tgoal1 = team.filter(x => x.position === 'defender' && !x.bench || x.position === 'goalkeeper')
							hideswapbtn(tgoal1)
							addSwap(tgoal)
							hidetransferbtn()
						} else {
							tgoal = team.filter(x => (x.position !== 'goalkeeper' && !x.bench)||(x.name !== playername && x.position !== 'goalkeeper'))
							tgoal1 = team.filter(x => x.position === 'goalkeeper')
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
	let playerA = changeBench[0].benchOrder
	let playerB = changeBench[1].benchOrder
	changeBench[0].benchOrder = playerB
	changeBench[1].benchOrder = playerA 
	load_team()
	changeBench.length = 0
	inplayer = ''
}

function load_player(a) {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	captain = a.captain === true && !currentWeek[0].tcap ? returncaptain() : 
			a.vcaptain === true && !currentWeek[0].tcap ? returnvcaptain() : 
			a.captain && currentWeek[0].tcap ? returnTcaptain() : 
			a.vcaptain && currentWeek[0].tcap ? returnvTcaptain() : ""
	return `
	<div class="pitch_unit">
	<div class="element_container">
									<div size="element_container" class="element_container-two"  team="${a.playerteam}" position="${a.position}">
										<button type="button" class="btn-details">
											<img src="${a.image}" size="image">
											<div>
												<div class="data_name">${a.name}</div>
												<div class="data_fixtures x-small">
												<div class="next-fix">
												<span>NEW</span>
												</div>
												<div class="up-fix">
												<span>nfo</span>
												<span>NEW</span>
												<span>lee</span>
												</div>
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

function load_bench(a) {
	order = a.benchOrder === 1 ? 'one' : a.benchOrder === 2 ? 'two' : a.benchOrder === 3 ? 'three' : 'goalie'
	return `<div class="bench_unit ${order}" id="${a.position}" size='pitch'>
								<h3 class="bench_unit_heading">
									<span class="bean tooltip">${a.position_code}</span>
								</h3>
								<div class="bean1">
									<div size="element_container" class="styledPitchElement" position="${a.position}" team="${a.playerteam}">
										<button type="button" class="btn-details">
											<img src="${a.image}" size="image">
											<div>
												<div class="data_name">${a.name}</div>
												<div class="data_fixtures x-small">
												<div class="next-fix">
												<span>NEW</span>
												</div>
												<div class="up-fix">
												<span>nfo</span>
												<span>NEW</span>
												<span>lee</span>
												</div>
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
}

function hideswapbtn(a) {
	Array.from(document.querySelectorAll('.swap-button')).forEach(x => {
		teamimage = x.parentElement.querySelector('img').getAttribute('src')
		playername = x.parentElement.querySelector('.data_name').innerText
		playerposition = x.parentElement.getAttribute('position')

		a.forEach(y => {
			if(y.image === teamimage && y.name === playername && y.position === playerposition) {
				x.style.display = 'none'
				x.parentElement.querySelector('.btn-details').disabled = true
				x.parentElement.querySelector('.btn-details').style.opacity = 0.5
			}
		})
	})
}

function addSwap(arr) {
	console.log(arr)
	forwardElem = arr.filter(x => x.position === 'forward' && !x.bench).length
	goalkeeperElem = arr.filter(x => x.position === 'goalkeeper' && !x.bench).length
	Array.from(document.querySelectorAll('.btn-details')).forEach(x => {
					let image = x.querySelector('img').getAttribute('src')
					let name = x.querySelector('.data_name').textContent
					let position = x.parentElement.getAttribute('position')
					arr.forEach(a => {
						elementWrapper = x.parentElement.parentElement.parentElement.parentElement
						if(a.image === image && a.name === name && a.position === position) {
							x.parentElement.
							parentElement.
							parentElement.style.backgroundColor = 'rgba(255, 100, 0, 0.6)'
							x.parentElement.
							parentElement.
							parentElement.style.borderRadius = '5px'
							if(goalkeeperElem === 1 || forwardElem === 1) {
								//elementWrapper.querySelector('.pitch_unit').style.flexGrow = 0
						 	}
						}
					})
				})
}

function swapplayer(a, b) {
	bbenchOrder = b.benchOrder
	sbenchOrder = a.benchOrder
	a.bench = true
	a.benchOrder = bbenchOrder
	b.bench = false
	b.benchOrder = sbenchOrder
	load_team()
	changeBench.length = 0
}



function removedisabled(a,b,c) {
	Array.from(player_cells).forEach(x => {
		let image = x.querySelector('img').getAttribute('src')
		let name = x.querySelector('.name').textContent
		let position = x.querySelector('.position').getAttribute('position')
		if(a === name && b === image && c === position) {
			x.removeAttribute('disabled')
		}
		newindex = cachedPlayers.findIndex(x => x.name === a && x.image === b && x.position === c)
		cachedPlayers[newindex].disabled = ''
	})
}


