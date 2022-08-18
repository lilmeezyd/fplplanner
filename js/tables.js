const cachedPlayers = [...players]
selectedPlayers = cachedPlayers
const pageSize = 20
let curPage = 1 
let maxPrice = Math.max(...cachedPlayers.map(x => x.price))
let minPrice = Math.min(...cachedPlayers.map(x => x.price))
let priceCut = maxPrice
let sortParam = 'points'
positions = []
teams = []
viewValue = ''
let teamz = [

    {
        "position": "defender",
        "name": "Ruben Dias",
        "price": "6.2",
        "playerteam": "man city",
        "image": "static/man_city.png",
        "bench": false,
        "benchOrder": 0,
        "captain": false,
        "vcaptain": false,
        "position_code": "DEF"
    },
    {
        "position": "defender",
        "name": "Doherty",
        "price": "5.2",
        "playerteam": "spurs",
        "image": "static/spurs.png",
        "bench": false,
        "benchOrder": 0,
        "captain": false,
        "vcaptain": false,
        "position_code": "DEF"
    },
    {
        "position": "defender",
        "name": "R.James",
        "price": "6.7",
        "playerteam": "chelsea",
        "image": "static/chelsea.png",
        "bench": false,
        "benchOrder": 0,
        "captain": false,
        "vcaptain": false,
        "position_code": "DEF"
    },
    {
        "position": "forward",
        "name": "Jota",
        "price": "9.0",
        "playerteam": "liverpool",
        "image": "static/liverpool.png",
        "bench": true,
        "benchOrder": 3,
        "captain": false,
        "vcaptain": false,
        "position_code": "FWD"
    },
    {
        "position": "midfielder",
        "name": "Saka",
        "price": "7.8",
        "playerteam": "arsenal",
        "image": "static/arsenal.png",
        "bench": false,
        "benchOrder": 0,
        "captain": false,
        "vcaptain": true,
        "position_code": "MID"
    },
    {
        "position": "goalkeeper",
        "name": "de Gea",
        "price": "5.1",
        "playerteam": "man united",
        "image": "static/man_utd_gk.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "GKP",
        "captain": false,
        "vcaptain": false
    },
    {
        "position": "defender",
        "name": "Dalot",
        "price": "4.6",
        "playerteam": "man united",
        "image": "static/man_utd.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "DEF"
    },
    {
        "position": "defender",
        "name": "White",
        "price": "4.5",
        "playerteam": "arsenal",
        "image": "static/arsenal.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "DEF"
    },
    {
        "position": "midfielder",
        "name": "Kulusevski",
        "price": "7.5",
        "playerteam": "spurs",
        "image": "static/spurs.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "MID"
    },
    {
        "position": "midfielder",
        "name": "Mahrez",
        "price": "8.0",
        "playerteam": "man city",
        "image": "static/man_city.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "MID",
        "captain": false,
        "vcaptain": false
    },
    {
        "position": "forward",
        "name": "Jesus",
        "price": "8.1",
        "playerteam": "arsenal",
        "image": "static/arsenal.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "FWD",
        "captain": true,
        "vcaptain": false
    },
    {
        "position": "forward",
        "name": "Richarlison",
        "price": "8.3",
        "playerteam": "spurs",
        "image": "static/spurs.png",
        "bench": true,
        "benchOrder": 2,
        "disabled": "",
        "position_code": "FWD"
    },
    {
        "position": "goalkeeper",
        "name": "Heaton",
        "price": "3.9",
        "playerteam": "man united",
        "image": "static/man_utd_gk.png",
        "bench": true,
        "benchOrder": -1,
        "disabled": "",
        "position_code": "GKP"
    },
    {
        "position": "midfielder",
        "name": "Foden",
        "price": "8.0",
        "playerteam": "man city",
        "image": "static/man_city.png",
        "bench": false,
        "benchOrder": 0,
        "disabled": "",
        "position_code": "MID"
    },
    {
        "position": "midfielder",
        "name": "Naby Keita",
        "price": "6.1",
        "playerteam": "liverpool",
        "image": "static/liverpool.png",
        "bench": true,
        "benchOrder": 1,
        "disabled": "",
        "position_code": "MID",
        "vcaptain": false
    }
]

let message = document.querySelector('.message')


//let team = [...teamz]

let budget = 100
let goalkeeper_body = document.querySelector('#goalkeepers tbody')
let defender_body = document.querySelector('#defenders tbody')
let midfielder_body = document.querySelector('#midfielders tbody')
let forward_body = document.querySelector('#forwards tbody')
let cost = document.querySelector('.cost select')


document.querySelector('.numbers').innerHTML = players.length === 1 ? 'player shown' : 'players shown'
document.addEventListener('DOMContentLoaded', load_prices, false)
let player_cells = document.getElementsByClassName('player-cell')

function load_prices() {
	cost.innerHTML = ''
	for(i=maxPrice; i>=minPrice; i-=0.5) {
		let priceOption = document.createElement('option')
		priceOption.setAttribute('value', i)
		priceOption.innerHTML = i
		cost.append(priceOption)
	}
	if(players.length) {
		actualMax = Math.max(...players.map(x => x.price))
		bMax = actualMax % 0.5 === 0 ? actualMax : 
		Math.ceil(actualMax)-actualMax <= 0.5 ? Math.ceil(actualMax) : 
		Math.ceil(actualMax)-0.5
	} else {
		bMax = priceCut
	}
	arr = Array.from(cost.options).map(x => +x.value)
	index = arr.indexOf(bMax)
	cost.options[index].selected = true
	document.querySelector('.current').innerHTML = `${curPage}`	
}
players.filter(player => player.price <= maxPrice)
	cost.addEventListener('change', function() {
		priceCut = +this.value
		if(viewValue.length>0) {
			if(positions.includes(viewValue)) {
			players = cachedPlayers.filter(x => x.position === viewValue && x.price <= priceCut)
		}
		if(teams.includes(viewValue)) {
			players = cachedPlayers.filter(x => x.team === viewValue && x.price <= priceCut)
		}
		if(viewValue.toLowerCase() === 'all players'.toLowerCase()) {
			players = cachedPlayers.filter(x => x.price <= priceCut)
		}
	   } else {
	   		players = players.filter(player => player.price <= +this.value)
	   	}
	   	selectedPlayers = players
		curPage = players.length === 0 ? 0 : 1
		players.sort((x,y) => {
				if(x[sortParam] > y[sortParam]) return -1
				if(x[sortParam] < y[sortParam]) return 1	
			})
		document.querySelector('.number').innerHTML = `${players.length}`
		document.querySelector('.numbers').innerHTML = players.length === 1 ? 'player shown' : 'players shown'
		document.querySelector('.current').innerHTML = `${curPage}`
		document.querySelector('.total_pages').innerHTML = `${Math.ceil(players.length/pageSize)}`
		load_players()
	})
	/* search players */
	document.querySelector('#search').oninput = function() {
		c = this.value
		console.log(c)
		console.log(players)
		players = selectedPlayers.filter(x => x.name.toLowerCase().startsWith(c.toLowerCase()))
		curPage = players.length === 0 ? 0 : 1
		document.querySelector('.numbers').innerHTML = players.length === 1 ? 'player shown' : 'players shown'
		document.querySelector('.number').innerHTML = `${players.length}`
		document.querySelector('.current').innerHTML = `${curPage}`
		document.querySelector('.total_pages').innerHTML = `${Math.ceil(players.length/pageSize)}`
		players.sort((x,y) => {
				if(x[sortParam] > y[sortParam]) return -1
				if(x[sortParam] < y[sortParam]) return 1	
			})
		load_players()
	}

	/* Filter players by position or team */
	document.querySelector('#view_by').addEventListener('change', function() {
		positions = []
		teams = []
		viewValue = this.value
		priceCut = maxPrice
		document.querySelector('#search').value = ""
		Array.from(this.children).forEach(child => {
			if(child.label.toLowerCase() === 'By position'.toLowerCase()) {
				Array.from(child.children).forEach(x => {
					positions.push(x.value)
				})
			}
			if(child.label.toLowerCase() === 'By team'.toLowerCase()) {
				Array.from(child.children).forEach(x => {
					teams.push(x.value)
				})
			}
		})
		if(positions.includes(this.value)) {
			players = cachedPlayers.filter(x => x.position === this.value)
		}
		if(teams.includes(this.value)) {
			players = cachedPlayers.filter(x => x.team === this.value)
		}
		if(this.value.toLowerCase() === 'all players'.toLowerCase()) {
			players = cachedPlayers
		}
		selectedPlayers = players
		curPage = players.length === 0 ? 0 : 1
		document.querySelector('.numbers').innerHTML = players.length === 1 ? 'player shown' : 'players shown'
		document.querySelector('.number').innerHTML = `${players.length}`
		document.querySelector('.current').innerHTML = `${curPage}`
		document.querySelector('.total_pages').innerHTML = `${Math.ceil(players.length/pageSize)}`
		selectedPlayers.sort((x,y) => {
				if(x[sortParam] > y[sortParam]) return -1
				if(x[sortParam] < y[sortParam]) return 1	
			})
		load_prices()
		load_players()
	})

	/* sort players */
	document.querySelector('#sort_by').addEventListener('change', function() {
		curPage = 1
		if(this.value === 'price') {
			players.sort((x,y) => {
				if(x.price>y.price) return -1 
				if(x.price<y.price) return 1	
			})
		}
		if(this.value === 'points') {
			players.sort((x,y) => {
				if(x.points > y.points) return -1
				if(x.points < y.points) return 1	
			})
		}
		document.querySelector('.current').innerHTML = `${curPage}`
		sortParam = this.value
		load_players()
	})
	
	
	document.addEventListener('DOMContentLoaded', load_players, false)
		players.sort((x,y) => {
			if(x[sortParam]>y[sortParam]) return -1
			if(x[sortParam]<y[sortParam]) return 1
		})



	document.querySelector('#nextButton').addEventListener('click', nextPage, false)
	document.querySelector('#prevButton').addEventListener('click', previousPage, false)
	document.querySelector('#lastPage').addEventListener('click', lastPage, false)
	document.querySelector('#firstPage').addEventListener('click', firstPage, false)
	document.querySelector('.number').innerHTML = `${players.length}`
	document.querySelector('.current').innerHTML = `${curPage}`
	document.querySelector('.total_pages').innerHTML = `${Math.ceil(players.length/pageSize)}`

	function previousPage() {
		if(curPage > 1) curPage--
		document.querySelector('.current').innerHTML = `${curPage}`
		load_players()
	}
	function nextPage() {
		if((curPage * pageSize) < players.length) curPage++
		document.querySelector('.current').innerHTML = `${curPage}`
		load_players()
	}
	function lastPage() {
		curPage = Math.ceil(players.length/pageSize)
		document.querySelector('.current').innerHTML = `${curPage}`
		load_players()	
	}
	function firstPage() {
		curPage = 1
		document.querySelector('.current').innerHTML = `${curPage}`
		load_players()
	}
	
	function load_players() {
		let result = ''
		let result1 = ''
		let result2 = ''
		let result3 = ''

		players.forEach(x => {
			x.disabled = ''
			if(team.length > 0) {
				team.forEach(y => {
					if(x.name === y.name) {
						x.disabled = 'disabled'
					}
				})
			} else {
				x.disabled = ''
			}
		})
		players.filter((row, index) => {
			let start = (curPage-1)*pageSize
			let end = curPage*pageSize
			if(index >= start && index < end) return true
		}).forEach(a => {
			if(a.position === 'goalkeeper') {
				return result += load_body(a)
			}
			if(a.position === 'defender') {
				return result1 += load_body(a)
			}
			if(a.position === 'midfielder') {
				return result2 += load_body(a)
			}
			if(a.position === 'forward') {
				return result3 += load_body(a)
			}
		})

	    goalkeeper_body.innerHTML = result
	    defender_body.innerHTML = result1
	    midfielder_body.innerHTML = result2
	    forward_body.innerHTML = result3

	    goalkeeper_body.parentElement.style.display = result === '' ? 'none' : 'table'
	    defender_body.parentElement.style.display = result1 === '' ? 'none' : 'table'
	    midfielder_body.parentElement.style.display = result2 === '' ? 'none' : 'table'
	    forward_body.parentElement.style.display = result3 === '' ? 'none' : 'table'

	    playerinfo = document.querySelectorAll('.player-info-button-table')
		Array.from(playerinfo).forEach(x => {
			x.onclick = function() {
				playerteam = x.parentElement.nextElementSibling.querySelector('.team').getAttribute('team')
				playername = x.parentElement.nextElementSibling.querySelector('.name').innerText
				playerposition = x.parentElement.nextElementSibling.querySelector('.position').getAttribute('position')
				document.querySelector('.playerpopup').innerHTML = loadInfo(playername, playerposition, playerteam)
				document.querySelector('.playerpopup').style.display = 'block'
				popupclose = document.querySelector('.btn-player')
				popupclose.addEventListener('click', function() {
					document.querySelector('.playerpopup').innerHTML = ''
					document.querySelector('.playerpopup').style.display = 'none'
				})
				loadFixtures()
				loadResults()
			}
		})


		Array.from(player_cells).forEach(x => {
			let player = {}
			x.addEventListener('click', function() {
				let goalkeepers = team.filter(x => x.position === 'goalkeeper').length
				let defenders = team.filter(x => x.position === 'defender').length
				let midfielders = team.filter(x => x.position === 'midfielder').length
				let forwards = team.filter(x => x.position === 'forward').length
				let captain = team.find(x => x.captain)
				let vcaptain = team.find(x => x.vcaptain)
				let image = x.querySelector('img').getAttribute('src')
				let playerteam = x.querySelector('.team').getAttribute('team')
				let position = x.querySelector('.position').getAttribute('position')
				let name = x.querySelector('.name').textContent
				let price = x.parentElement.nextElementSibling.querySelector('.price').textContent
				player.position = position
				player.name = name
				player.price = price
				player.playerteam = playerteam
				player.image = image
				player.bench = false
				player.benchOrder = 0
				player.disabled = ''
				player.position_code = position === 'goalkeeper' ? 'GKP' :
									position === 'defender' ? 'DEF' :
									position === 'midfielder' ? 'MID' : 'FWD'
				b = team.filter(x => x.bench && x.position === 'goalkeeper').length
				c = team.filter(x => !x.bench).length
				g = team.filter(x => !x.bench && x.position === 'goalkeeper').length
				d = team.filter(x => x.position === 'defender' && !x.bench).length
				m = team.filter(x => x.position === 'midfielder' && !x.bench).length
				f = team.filter(x => x.position === 'forward' && !x.bench).length
				let num = position === 'goalkeeper' ? 2 : position === 'defender' ? 5 :
				position === 'midfielder' ? 5 : 3
				let fieldnum = position === 'goalkeeper' ? 'Goalkeepers' : position === 'defender' ? 'Defenders' :
				position === 'midfielder' ? 'Midfielders' : 'Forwards'
				teamcount = team.reduce((a,b) => {
					a[b.playerteam] = a[b.playerteam] ? ++a[b.playerteam] : 1
					return a				
				}, {})
				

				if(team.length < 15) {
					let orderOne = team.some(x => x.benchOrder === 1)
					let orderTwo = team.some(x => x.benchOrder === 2)
					let orderThree =team.some(x => x.benchOrder === 3)
					if(captain === undefined) {
						player.captain = true
					} else 	if(vcaptain === undefined) {
						player.vcaptain = true
					} else	if(vcaptain === undefined && captain === undefined) {
						player.captain = true
					}
					if(position === 'goalkeeper' && goalkeepers === 1) {
						player.bench = b === 0 ? true : false
						player.benchOrder = -1
					}
					if((position === 'defender' && c === 11) || 
						(position === 'defender' && c === 9 && d===4 && m===5) ||
						(position === 'defender' && c === 10 && g===0) ||
						(position === 'defender' && c === 10 && f===0) ) {
						player.bench = true
						player.benchOrder = (!orderOne && !orderTwo && !orderThree) ? 1 : 
						(orderOne && !orderTwo && !orderThree) ? 2 : 
						(orderOne && orderTwo && !orderThree) ? 3 : 
						(!orderOne && orderTwo && orderThree) ? 1 : 
						(orderOne && !orderTwo && orderThree) ? 2 : 3
					}
					if(position === 'midfielder' && c === 11 ||
						(position === 'midfielder' && c === 9 && m===4 && d===5) ||
						(position === 'midfielder' && c === 10 && g===0) ||
						(position === 'midfielder' && c === 10 && f==0) || 
						(position === 'midfielder' && c === 10 && d==2)) {
						player.bench = true
						player.benchOrder = (!orderOne && !orderTwo && !orderThree) ? 1 : 
						(orderOne && !orderTwo && !orderThree) ? 2 : 
						(orderOne && orderTwo && !orderThree) ? 3 : 
						(!orderOne && orderTwo && orderThree) ? 1 : 
						(orderOne && !orderTwo && orderThree) ? 2 : 3
					}
					if(position === 'forward' && c === 11 || 
						(position === 'forward' && c === 10 && g===0) ||
						(position === 'forward' && c === 10 && d==2)) {
						player.bench = true
						player.benchOrder = (!orderOne && !orderTwo && !orderThree) ? 1 : 
						(orderOne && !orderTwo && !orderThree) ? 2 : 
						(orderOne && orderTwo && !orderThree) ? 3 : 
						(!orderOne && orderTwo && orderThree) ? 1 : 
						(orderOne && !orderTwo && orderThree) ? 2 : 3
					}
					if(position === 'goalkeeper' && goalkeepers < 2 || 
						position === 'defender' && defenders < 5 ||
						position === 'midfielder' && midfielders < 5 ||
						position === 'forward' && forwards < 3
					) {
						if(teamcount[playerteam] !== 3){
							let repeatedPlayer = []
							x.setAttribute('disabled', true)
							team.push(player)
							for(let j = 0; j < playersOut.length; j++) {
								if(player.name === playersOut[j].name) {
									repeatedPlayer.push(...playersOut.splice(j,1))
									console.log(repeatedPlayer)
								}
							}
							if(repeatedPlayer.length === 1) {
								playersIn.push()
							} else {
								playersIn.push(player)
							}
							loadTransfersIn()
							trackTransfers()
							
							document.querySelector('.message').style.display = 'block'
							document.querySelector('.details-one').style.paddingBottom = 0
							document.querySelector('.message').classList.remove('danger')
							document.querySelector('.message').classList.add('success')
							document.querySelector('.message').innerHTML = loadMessage(name)
							load_team()
							document.querySelector('.player-num').innerHTML = team.length
						} else {
							document.querySelector('.message').style.display = 'block'
							document.querySelector('.details-one').style.paddingBottom = 0
							document.querySelector('.message').classList.remove('success')
							document.querySelector('.message').classList.add('danger')
							document.querySelector('.message').innerHTML = loadMessage1(playerteam.toUpperCase())
						}
					} else {
							document.querySelector('.message').style.display = 'block'
							document.querySelector('.details-one').style.paddingBottom = 0
							document.querySelector('.message').classList.remove('success')
							document.querySelector('.message').classList.add('danger')
							document.querySelector('.message').innerHTML = loadMessage2(num, fieldnum)
					}
					/*remainingBudget = remainingBudget >= 0 ?  console.log(remainingBudget.toFixed(1)) :
					console.error(remainingBudget.toFixed(1))*/

					} else {
						document.querySelector('.message').style.display = 'block'
						document.querySelector('.details-one').style.paddingBottom = 0
						document.querySelector('.message').classList.remove('success')
						document.querySelector('.message').classList.add('danger')
						document.querySelector('.message').innerHTML = 'Team Already Full'
				}
				})
			})
	}

	function load_body(a) {
		return `<tr class="player-tbh">
					<td class="info">
						<button class="player-info-button-table">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
							  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
							  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
							 </svg>
							 </button>
						</td>
					<td class="player">
						<button class="player-cell btn-table" ${a.disabled}>
							<div class="images"><img src="${a.image}"></div>
							<div class="player-cell-info small">
								<span class="name">${a.name}</span>
								<div class="player-cell-details">
									<span class="team" team="${a.team}">${a.team_code}</span>
									<span class="position" position="${a.position}">${a.position_code}</span>
								</div>
							</div>
						</button>
					</td>
					<td><span class="price">${a.price.toFixed(1)}</span></td>
					<td><span class="points">${a.points}</span></td>
				</tr>`
	}

/*
async function getPlayerz() {
	const playerStream = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/',{
		method: 'GET',
		headers: {
			'accept': 'application/json'
		}
	})
	const playersx = await playerStream.json()
	playersx.forEach(x => console.log(x))
}

getPlayerz()*/

/* search script */	
let select = document.getElementsByTagName('select')
	let search = document.querySelector('.search input')
	search.addEventListener('focus', function(e) {
		search.classList.remove('blur')
	})
	search.addEventListener('blur', function(e) {
		search.classList.add('blur')
	})
	for(let i=0; i<select.length; i++) {
		select[i].addEventListener('click', function(e) {
			e.stopPropagation()
			close(this)
			select[i].classList.toggle('open')
		})
	}

	function close(e) {
		let arr = []
		let x = document.getElementsByClassName('open')
		let y = document.getElementsByClassName('focus')
		for(let i=0; i<x.length; i++) {
			if(e == x[i]) {
				arr.push(i)
			} else {
				x[i].classList.remove('open')
			}
		}
		
	}

	document.addEventListener('click', close)