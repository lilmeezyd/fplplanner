let chips = document.querySelectorAll('.btn-chip')
let currentFts, rolled
Array.from(chips).forEach(x => {
	x.onclick = function() {
		id = x.getAttribute('id')
		x.classList.toggle('chip-active')
		activateChip(id)
	}
})


function activateChip(a) {
	button = document.querySelector(`#${a}`)
	
	if(button.classList.contains('chip-active')) {
		a === 'wcard' && playWildcard() || a === 'fhit' && playFreeHit() || 
		a === 'bbench' && playBboost() || a === 'tcap' && playTcap()
	} else {
		a === 'wcard' && cancelWildcard() || a === 'fhit' && cancelFreeHit() ||
		a === 'bbench' && cancelBboost() || a === 'tcap' && cancelTcap()
	}
	if(button.classList.contains('chip-active')) {
		disableOtherChips(a)
	}
	if(!button.classList.contains('chip-active')) {
		enableOtherChips(a)
	}
}

function disableOtherChips(a) {
	Array.from(chips)
	.filter(x => x.getAttribute('id') !== a)
	.forEach(x => {
		x.classList.add('chip-inactive')
		x.setAttribute('disabled', true)
	})
}

function enableOtherChips(a) {
	Array.from(chips)
	.filter(x => x.getAttribute('id') !== a && !x.innerHTML.includes('Played'))
	.forEach(x => {
		x.classList.remove('chip-inactive')
		x.removeAttribute('disabled')
	})
}


function playWildcard() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentFts = currentWeek[0].fts
	rolled = currentWeek[0].rolledft
	currentWeek[0].fts = 'unlimited'
	currentWeek[0].wcard = true
	currentWeek[0].rolledft = false
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}

function cancelWildcard() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentWeek[0].wcard = false
	currentWeek[0].fts = currentFts 
	currentWeek[0].rolledft = rolled
	index = retrievedGameweeks.findIndex(x => x.gameweek === curGameweek)
        for(let i=0; i<retrievedGameweeks.length; i++) {
        if(i>=index) {
              retrievedGameweeks[i].wCardUsed = false
        }
    }
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}

function playFreeHit() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentFts = currentWeek[0].fts
	rolled = currentWeek[0].rolledft
	currentWeek[0].fts = 'unlimited'
	currentWeek[0].fhit = true
	currentWeek[0].rolledft = false
	index = retrievedGameweeks.findIndex(x => x.gameweek === curGameweek - 1)
	prevTeam = retrievedGameweeks.find(x => x.gameweek === curGameweek - 1)
	newIndex = index+2
	for(let i = 0; i < retrievedGameweeks.length; i++) {
		if(i===newIndex) {
			//retrievedGameweeks[i].team.length = 0
			//retrievedGameweeks[i].team.push(...prevTeam)
			console.log(retrievedGameweeks[i].team)
		}
	}
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}

function cancelFreeHit() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentWeek[0].fhit = false
	currentWeek[0].fts = currentFts 
	currentWeek[0].rolledft = rolled
	index = retrievedGameweeks.findIndex(x => x.gameweek === curGameweek)
        for(let i=0; i<retrievedGameweeks.length; i++) {
        if(i>=index) {
              retrievedGameweeks[i].fhitUsed = false
        }
    }
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}
function playBboost() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentWeek[0].bbench = true
	bench.classList.add('bench_boost')
	bench.classList.remove('bench')
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}
function cancelBboost(){
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentWeek[0].bbench = false
	bench.classList.add('bench')
	bench.classList.remove('bench_boost')
	index = retrievedGameweeks.findIndex(x => x.gameweek === curGameweek)
        for(let i=0; i<retrievedGameweeks.length; i++) {
        if(i>=index) {
              retrievedGameweeks[i].bbenchUsed = false
        }
    }
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}
function playTcap() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentWeek[0].tcap = true
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}
function cancelTcap() {
	let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
	let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
	currentWeek[0].tcap = false
	index = retrievedGameweeks.findIndex(x => x.gameweek === curGameweek)
        for(let i=0; i<retrievedGameweeks.length; i++) {
        if(i>=index) {
              retrievedGameweeks[i].tCapUsed = false
        }
    }
	sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
	loadGameweek()
}