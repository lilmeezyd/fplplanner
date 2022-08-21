
		function returnData() {
			var requestOptions = {
			method: 'GET',
			redirect: 'follow'
			};

			fetch(`https://corsanywhere.herokuapp.com/https://fantasy.premierleague.com/api/bootstrap-static/`, requestOptions)
			.then(response => response.json())
			.then(result => {
				sessionStorage.removeItem('teams')
				sessionStorage.removeItem('players')
				sessionStorage.removeItem('element_types')
				sessionStorage.setItem('teams', JSON.stringify(result.teams))
				sessionStorage.setItem('players', JSON.stringify(result.elements))
				sessionStorage.setItem('element_types', JSON.stringify(result.element_types))
			})
			.catch(error => console.log('error', error));
		}
		window.onload = function() {
			returnData();
		}

		//Retrieve Players
		players = JSON.parse(sessionStorage.getItem('players'))
		//Retrieve Teams 
		fTeams = JSON.parse(sessionStorage.getItem('teams'))
		//Retrieve Element Types
		elementTypes = JSON.parse(sessionStorage.getItem('element_types'))
		//Load Teams
		let viewBy = document.getElementById('view_by')
		function loadTeams() {
			let groupPosition = document.createElement('optgroup')
			let groupTeam = document.createElement('optgroup')
			let position = ''
			let team = ''
			groupPosition.setAttribute('label', 'By Position')
			groupTeam.setAttribute('label', 'By Team')
			elementTypes.forEach(x => {
				position += `
				<option class="position" value="position_${x.id}">${x.singular_name}</option>
				`
			})
			fTeams.forEach(x => {
				team += `
				<option class="team" value="team_${x.id}">${x.name}</option>
				`
			})
			groupPosition.innerHTML = position
			groupTeam.innerHTML = team
			viewBy.append(groupPosition)
			viewBy.append(groupTeam)
		}