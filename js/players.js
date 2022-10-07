		document.addEventListener('DOMContentLoaded', returnData, false)

		let teamState = {
			teams: []
		};
		let eventState = {
			events: []
		};
		let elementTypesState = {
			elementTypes: []
		};
		let fixtureState = {
			fixtures: []
		}
		let playerState = {
			players: []
		};
		let gameweekState = {
			gameweeks: []
		};
		
		setTeams = function() {
			teamState.teams.length = 0
			let newTeams = [...JSON.parse(sessionStorage.getItem('teams'))]
			teamState.teams = newTeams
			return teamState
		}
		setElementTypes = function() {
			elementTypesState.elementTypes.length = 0
			let newElementTypes = [...JSON.parse(sessionStorage.getItem('element_types'))]
			elementTypesState.elementTypes = newElementTypes
			return elementTypesState 
		}
		setEvents = function() {
			eventState.events.length = 0
			let newEvents = [...JSON.parse(sessionStorage.getItem('events'))]
			eventState.events = newEvents
			return eventState
		}
		setFixtures = function() {
			fixtureState.fixtures.length = 0
			let newFixtures = [...JSON.parse(sessionStorage.getItem('fixtures'))] 
			fixtureState.fixtures = newFixtures
			return fixtureState 
		}
		setPlayers = function() {
			playerState.players.length = 0
			let newPlayers = [...JSON.parse(sessionStorage.getItem('players'))] 
			playerState.players = newPlayers
			return playerState 
		}
		function setData() {
			var requestOptions = {
			method: 'GET',
			redirect: 'follow'
			};

			fetch(`https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/`, requestOptions)
			.then(response => response.json())
			.then(result => {
				sessionStorage.removeItem('teams')
				sessionStorage.removeItem('players')
				sessionStorage.removeItem('element_types')
				sessionStorage.removeItem('events')
				sessionStorage.setItem('events', JSON.stringify(result.events))
				sessionStorage.setItem('teams', JSON.stringify(result.teams))
				sessionStorage.setItem('players', JSON.stringify(result.elements))
				sessionStorage.setItem('element_types', JSON.stringify(result.element_types))
				
				
				setTeams() 
				setElementTypes()
				setEvents()
				setPlayers()
				upload().loadPlayers()
				loadTeams()
			 	//loadPlayers()
			 	upload().loadPrices()
			 	loadTeam()
			})
			.catch(error => console.log('error', error));

			fetch(`https://corsproxy.io/?https://fantasy.premierleague.com/api/fixtures/`, requestOptions)
			.then(response => response.json())
			.then(result => {
				sessionStorage.removeItem('fixtures')
				sessionStorage.setItem('fixtures', JSON.stringify(result))
				setFixtures()
			})
			.catch(error => console.log('error', error));

		}
		

		function returnData() {
			//setFixtureData()
			setData()
			loadTeamFixtures()
			//loadPlayers()
			//loadFixtures()
			//loadTeam()
		}

		
		//Load Teams
		let viewBy = document.getElementById('view_by')
		function loadTeams() {
			let groupPosition = document.createElement('optgroup')
			let groupTeam = document.createElement('optgroup')
			let position = ''
			let team = ''
			groupPosition.setAttribute('label', 'By Position')
			groupTeam.setAttribute('label', 'By Team')
			elementTypesState.elementTypes.forEach(x => {
				positionName = x.singular_name+'s'
				position += `
				<option class="position" value="position_${x.id}">${positionName}</option>
				`
			})
			teamState.teams.forEach(x => {
				team += `
				<option class="team" value="team_${x.id}">${x.name}</option>
				`
			})
			groupPosition.innerHTML = position
			groupTeam.innerHTML = team
			viewBy.append(groupPosition)
			viewBy.append(groupTeam)
		}

		/*let aTeams = 0, page = 1, condition = true
		url = 'https://corsproxy.io/?https://fantasy.premierleague.com/api/leagues-classic/7184/standings/?page_standings='
		
		const start = Date.now() 
		fetchLeague(url, page, aTeams) 
		const end = Date.now()
		console.log(`${end - start}ms`)

		async function fetchLeague(url,page,aTeams, condition) {
			var requestOptions = {
			method: 'GET',
			redirect: 'follow'
			};
			if(condition === false) {
				console.log(aTeams)
				return
			}
			let response = await fetch(`${url}${page}`, requestOptions)
			let data = await response.json()
			aTeams = await aTeams + data['standings']['results'].length
			condition = await data['standings']['has_next']
			page += 1
			fetchLeague(url, page, aTeams,condition)
		}*/
		