function upload() {
	let players = []
	players.push(...playerState.players)
	const cachedPlayers = [...players]
	selectedPlayers = cachedPlayers
	const pageSize = 20
	let curPage = 1 
	let maxPrice = Math.max(...cachedPlayers.map(x => (x.now_cost/10).toFixed(1)))
	let minPrice = Math.min(...cachedPlayers.map(x => (x.now_cost/10).toFixed(1)))
	let priceCut = maxPrice
	let sortParam = 'total_points'
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

	let player_cells = document.getElementsByClassName('player-cell')

	//Load Player Prices
	function loadPrices() {
		cost.innerHTML = ''
		pMin.innerHTML = minPrice.toFixed(1)
		pMax.innerHTML = maxPrice.toFixed(1)
		for(i=maxPrice; i>=minPrice; i-=0.5) {
			let priceOption = document.createElement('option')
			priceOption.setAttribute('value', i)
			priceOption.innerHTML = i
			cost.append(priceOption)
		}
		if(players.length) {
			actualMax = Math.max(...players.map(x => (x.now_cost/10).toFixed(1)))
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



	/* Filter Players By Price */
	players.filter(player => (player.now_cost/10).toFixed(1) <= maxPrice)
		cost.addEventListener('change', function() {
			let priceCut = +this.value
			let filterPlayers
			if(viewValue.length>0) {
				if(positions.includes(viewValue)) {
				filterPlayers = cachedPlayers.filter(x => x.element_type === +viewValue.slice(9) && (x.now_cost/10).toFixed(1) <= priceCut)
			}
			if(teams.includes(viewValue)) {
				filterPlayers = cachedPlayers.filter(x => x.team === +viewValue.slice(5) && (x.now_cost/10).toFixed(1) <= priceCut)
			}
			if(viewValue.toLowerCase() === 'all players'.toLowerCase()) {
				filterPlayers = cachedPlayers.filter(x => (x.now_cost/10).toFixed(1) <= priceCut)
			}
		   } else {
		   		filterPlayers = players.filter(player => (player.now_cost/10).toFixed(1) <= +this.value)
		   	}
		   	selectedPlayers = filterPlayers
			curPage = filterPlayers.length === 0 ? 0 : 1
			selectedPlayers.sort((x,y) => {
					if(x[sortParam] > y[sortParam]) return -1
					if(x[sortParam] < y[sortParam]) return 1	
				})
			document.querySelector('.number').innerHTML = `${filterPlayers.length}`
			document.querySelector('.numbers').innerHTML = filterPlayers.length === 1 ? 'player shown' : 'players shown'
			document.querySelector('.current').innerHTML = `${curPage}`
			document.querySelector('.total_pages').innerHTML = `${Math.ceil(filterPlayers.length/pageSize)}`
			loadPlayers(filterPlayers)
			document.querySelector('#nextButton').addEventListener('click', function() {nextPage(filterPlayers)}, false)
			document.querySelector('#prevButton').addEventListener('click', function() {previousPage(filtersearchPlayers)}, false)
			document.querySelector('#lastPage').addEventListener('click', function() {lastPage(filterPlayers)}, false)
			document.querySelector('#firstPage').addEventListener('click', function() {firstPage(filterPlayers)}, false)

		})
		/* search players */
		document.querySelector('#search').oninput = function() {
			let c = this.value
			let searchPlayers
			searchPlayers = selectedPlayers.filter(x => x.web_name.toLowerCase().startsWith(c.toLowerCase()))
			curPage = searchPlayers.length === 0 ? 0 : 1
			document.querySelector('.numbers').innerHTML = searchPlayers.length === 1 ? 'player shown' : 'players shown'
			document.querySelector('.number').innerHTML = `${searchPlayers.length}`
			document.querySelector('.current').innerHTML = `${curPage}`
			document.querySelector('.total_pages').innerHTML = `${Math.ceil(searchPlayers.length/pageSize)}`
			searchPlayers.sort((x,y) => {
					if(x[sortParam] > y[sortParam]) return -1
					if(x[sortParam] < y[sortParam]) return 1	
				})
			sortPlayers(searchPlayers)
			loadPlayers(searchPlayers)
			document.querySelector('#nextButton').addEventListener('click', function() {nextPage(searchPlayers)}, false)
			document.querySelector('#prevButton').addEventListener('click', function() {previousPage(searchPlayers)}, false)
			document.querySelector('#lastPage').addEventListener('click', function() {lastPage(searchPlayers)}, false)
			document.querySelector('#firstPage').addEventListener('click', function() {firstPage(searchPlayers)}, false)
		}

		/* Filter players by position or team */
		document.querySelector('#view_by').addEventListener('change', function() {
			positions = []
			teams = []
			viewValue = this.value
			priceCut = maxPrice
			let viewPlayers
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
				let pPosition = +this.value.slice(-1)
				viewPlayers = cachedPlayers.filter(x => x.element_type === pPosition)
			}
			if(teams.includes(this.value)) {
				let pTeam = +this.value.slice(5)
				viewPlayers = cachedPlayers.filter(x => x.team === pTeam)
			}
			if(this.value.toLowerCase() === 'all players'.toLowerCase()) {
				viewPlayers = cachedPlayers
			}
			selectedPlayers = viewPlayers
			curPage = viewPlayers.length === 0 ? 0 : 1
			document.querySelector('.numbers').innerHTML = viewPlayers.length === 1 ? 'player shown' : 'players shown'
			document.querySelector('.number').innerHTML = `${viewPlayers.length}`
			document.querySelector('.current').innerHTML = `${curPage}`
			document.querySelector('.total_pages').innerHTML = `${Math.ceil(viewPlayers.length/pageSize)}`
			selectedPlayers.sort((x,y) => {
					if(x[sortParam] > y[sortParam]) return -1
					if(x[sortParam] < y[sortParam]) return 1	
				})
			loadPrices()
			sortPlayers(viewPlayers)
			loadPlayers(viewPlayers)
			document.querySelector('#nextButton').addEventListener('click', function() {nextPage(viewPlayers)}, false)
			document.querySelector('#prevButton').addEventListener('click', function() {previousPage(viewPlayers)}, false)
			document.querySelector('#lastPage').addEventListener('click', function() {lastPage(viewPlayers)}, false)
			document.querySelector('#firstPage').addEventListener('click', function() {firstPage(viewPlayers)}, false)
		})

		/* sort players */
		function sortPlayers(plyers=players) {
			document.querySelector('#sort_by').addEventListener('change', function() {
				curPage = 1
				console.log(this.value)
				if(this.value === 'now_cost') {
					plyers.sort((x,y) => {
						if(x.now_cost>y.now_cost) return -1 
						if(x.now_cost<y.now_cost) return 1	
					})
				}
				if(this.value === 'total_points') {
					plyers.sort((x,y) => {
						if(x.total_points > y.total_points) return -1
						if(x.total_points < y.total_points) return 1	
					})
				}
				document.querySelector('.current').innerHTML = `${curPage}`
				sortParam = this.value
				loadPlayers(plyers)
			})
		}
		
			players.sort((x,y) => {
				if(x[sortParam]>y[sortParam]) return -1
				if(x[sortParam]<y[sortParam]) return 1
			})



		document.querySelector('#nextButton').addEventListener('click', function() {nextPage(players)}, false)
		document.querySelector('#prevButton').addEventListener('click', function() {previousPage(players)}, false)
		document.querySelector('#lastPage').addEventListener('click', function() {lastPage(players)}, false)
		document.querySelector('#firstPage').addEventListener('click', function() {firstPage(players)}, false)
		document.querySelector('.number').innerHTML = `${players.length}`
		document.querySelector('.current').innerHTML = `${curPage}`
		document.querySelector('.total_pages').innerHTML = `${Math.ceil(players.length/pageSize)}`

		function previousPage(plyers=players) {
			if(curPage > 1) curPage--
			document.querySelector('.current').innerHTML = `${curPage}`
			loadPlayers(plyers)
		}
		function nextPage(plyers=players) {
			if((curPage * pageSize) < plyers.length) curPage++
			document.querySelector('.current').innerHTML = `${curPage}`
			loadPlayers(plyers)
		}
		function lastPage(plyers=players) {
			curPage = Math.ceil(plyers.length/pageSize)
			document.querySelector('.current').innerHTML = `${curPage}`
			loadPlayers(plyers)	
		}
		function firstPage(plyers=players) {
			curPage = 1
			document.querySelector('.current').innerHTML = `${curPage}`
			loadPlayers(plyers)
		}
		
		function loadPlayers(plyers=players) {
			let result = ''
			let result1 = ''
			let result2 = ''
			let result3 = ''
			/*plyers.forEach(x => {
				x.disabled = ''
				if(picks.length > 0) {
					picks.forEach(y => {
						if(x.name === y.name) {
							x.disabled = 'disabled'
						}
					})/*
				} else {
					x.disabled = ''
				}
			})*/
			plyers.filter((row, index) => {
				let start = (curPage-1)*pageSize
				let end = curPage*pageSize
				if(index >= start && index < end) return true
			}).forEach(a => {
				if(a.element_type === 1) {
					return result += loadBody(a)
				}
				if(a.element_type === 2) {
					return result1 += loadBody(a)
				}
				if(a.element_type === 3) {
					return result2 += loadBody(a)
				}
				if(a.element_type === 4) {
					return result3 += loadBody(a)
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
					playerId = +x.parentElement.nextElementSibling.id
					setPlayerData(playerId)
					document.querySelector('.playerpopup').innerHTML = loadInfo(playerId)
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
					let goalkeepers = picks.filter(x => x.element_type === 1).length
					let defenders = picks.filter(x => x.element_type === 2).length
					let midfielders = picks.filter(x => x.element_type === 3).length
					let forwards = picks.filter(x => x.element_type === 4).length
					let isCaptain = picks.filter(x => x.is_captain)
					let isViceCaptain = picks.filter(x => x.is_vice_captain)
					let playerId = +x.parentElement.id
					let elementType = +x.querySelector('.position').getAttribute('element_type')
					let team = +x.querySelector('.team').getAttribute('team_id')
					//price
					player.element_type = elementType
					player.element = playerId
					player.team = team
					player.disabled = ''
					player.position = 0
					player.multiplier = 1
					enchGoalie = picks.filter(x => x.multiplier === 0 && x.element_type === 1).length
					nonBench = picks.filter(x => x.multiplier !== 0).length
					playingGoalie = picks.filter(x => x.multiplier !== 0 && x.element_type === 1).length
					playingDef = picks.filter(x => x.multiplier !== 0 && x.element_type === 2).length
					playingMid = picks.filter(x => x.multiplier !== 0 && x.element_type === 3).length
					playingFwd = picks.filter(x => x.multiplier !==0 && x.element_type === 4).length

					teamCount = picks.reduce((a,b) => {
						a[b.team] = a[b.team] ? ++a[b.team] : 1
						return a
					},{})

					if(picks.length < 15) {
						let orderOne = picks.some(x => x.position === 13)
						let orderTwo = picks.some(x => x.position === 14)
						let orderThree = picks.some(x => x.position === 15)

						if(isCaptain === undefined) {
							player.is_captain = true
							player.is_vice_captain = false
						} else if(isViceCaptain === undefined) {
							player.is_vice_captain = true
							player.is_captain = false
						} else if(isViceCaptain === undefined && is_captain === undefined) {
							player.is_captain = true
							player.is_vice_captain = false
						} else {
							player.is_captain = false
							player.is_vice_captain = false
						}
						if(elementType === 1 && goalkeepers === 1) {
							//
							player.position = 12
							player.multiplier = 0
						}
						if((elementType === 2 && nonBench === 11) ||
							(elementType === 2 && nonBench === 9 && playingDef === 4 && playingMid === 5) || 
							(elementType === 2 && nonBench === 10 && playingGoalie === 0)||
							(elementType === 2 && nonBench === 10 && playingFwd === 0)) {
							player.multiplier = 0
							player.position = (!orderOne && !orderTwo && !orderThree) ? 13 :
							(orderOne && !orderTwo && !orderThree) ? 14 : 
							(orderOne && orderTwo && !orderThree) ? 15 :
							(!orderOne && orderTwo && orderThree) ? 13 :
							(orderOne && !orderTwo && orderThree) ? 14 : 15 
						}
						if((elementType === 3 && nonBench === 11) ||
							(elementType === 3 && nonBench === 9 && playingMid === 4 && playingDef === 5) || 
							(elementType === 3 && nonBench === 10 && playingGoalie === 0)||
							(elementType === 3 && nonBench === 10 && playingFwd === 0) ||
							(elementType === 3 && nonBench === 10 && playingDef === 2)) {
							player.multiplier = 0
							player.position = (!orderOne && !orderTwo && !orderThree) ? 13 :
							(orderOne && !orderTwo && !orderThree) ? 14 : 
							(orderOne && orderTwo && !orderThree) ? 15 :
							(!orderOne && orderTwo && orderThree) ? 13 :
							(orderOne && !orderTwo && orderThree) ? 14 : 15 
						}
						if((elementType === 4 && nonBench === 11) ||
							(elementType === 4 && nonBench === 10 && playingGoalie === 0)||
							(elementType === 4 && nonBench === 10 && playingDef === 2)) {
							player.multiplier = 0
							player.position = (!orderOne && !orderTwo && !orderThree) ? 13 :
							(orderOne && !orderTwo && !orderThree) ? 14 : 
							(orderOne && orderTwo && !orderThree) ? 15 :
							(!orderOne && orderTwo && orderThree) ? 13 :
							(orderOne && !orderTwo && orderThree) ? 14 : 15 
						}
						if(elementType === 1 && goalkeepers < 2 ||
							elementType === 2 && defenders < 5 || 
							elementType === 3 && midfielders < 5 ||
							elementType === 4 && forwards < 3) {
							if(teamCount[team] !== 3) {
								let repeatedPlayer = []
								x.setAttribute('disabled', true)
								for(let j = 0; j < playersOut.length; j++) {
									if(player.element === playersOut[j].element) {
										repeatedPlayer.push(...playersOut.splice(j,1))
										console.log(repeatedPlayer)
									}
								}
								if(repeatedPlayer.length === 1) {
									playersIn.push()
								} else {
									playersIn.push(player)
								}
								loadTransfersIn(loadGameweeks().curGameweek)
								trackTransfers(loadGameweeks().curGameweek)

								document.querySelector('.message').style.display = 'block'
								document.querySelector('.details-one').style.paddingBottom = 0
								document.querySelector('.message').classList.remove('danger')
								document.querySelector('.message').classList.add('success')
								document.querySelector('.message').innerHTML = loadMessage(playerId)
								loadTeam()
								document.querySelector('.player-num').innerHTML = picks.length
							} else {
								document.querySelector('.message').style.display = 'block'
								document.querySelector('.details-one').style.paddingBottom = 0
								document.querySelector('.message').classList.add('danger')
								document.querySelector('.message').classList.remove('success')
								document.querySelector('.message').innerHTML = loadMessage1(playerId)
							}
						} else {
							document.querySelector('.message').style.display = 'block'
								document.querySelector('.details-one').style.paddingBottom = 0
								document.querySelector('.message').classList.add('danger')
								document.querySelector('.message').classList.remove('success')
								document.querySelector('.message').innerHTML = loadMessage2(playerId, playerId)
						}
					} else {
						document.querySelector('.message').style.display = 'block'
						document.querySelector('.details-one').style.paddingBottom = 0
						document.querySelector('.message').classList.add('danger')
						document.querySelector('.message').classList.remove('success')
						document.querySelector('.message').innerHTML = `Team Already Full`
					}
					})
				})
		}

		function loadBody(a) {
			let teamObj = teamState.teams.find(x => x.id === a.team)
			let short_name = teamObj.short_name
			let team_name = teamObj.name
			let positionObj = elementTypesState.elementTypes.find(x => x.id === a.element_type)
			let short_pos = positionObj.singular_name_short
			let pos_name = positionObj.singular_name
			a.image = positionObj.id === 1 ? `./static/shirt_${teamObj.code}_1-66.webp`:
			`./static/shirt_${teamObj.code}-66.webp`
			return `<tr class="player-tbh">
						<td class="info">
							<button class="player-info-button-table">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
								  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
								  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
								 </svg>
								 </button>
							</td>
						<td class="player" id=${a.id}>
							<button class="player-cell btn-table" ${a.disabled}>
								<div class="images"><img src="${a.image}"></div>
								<div class="player-cell-info small">
									<span class="name">${a.web_name}</span>
									<div class="player-cell-details">
										<span class="team" team_id="${a.team}" team="${team_name}">${short_name}</span>
										<span class="position" element_type="${a.element_type}" position="${pos_name}">${short_pos}</span>
									</div>
								</div>
							</button>
						</td>
						<td><span class="price">${(a.now_cost/10).toFixed(1)}</span></td>
						<td><span class="points">${a.total_points}</span></td>
					</tr>`
		}


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

		return { loadPlayers, loadPrices}
	}