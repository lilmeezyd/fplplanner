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
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].wildcard.is_used = true
	currentHistory[0].wildcard.event = weekNdeadline[1]
	//currentWeek[0].fts = 'unlimited'
	//currentWeek[0].wcard = true
	//currentWeek[0].rolledft = false
	for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
            retrievedHistory[i].wildcard.is_used = true
            retrievedHistory[i].wildcard.event = weekNdeadline[1]
        } else {
            retrievedHistory[i].wildcard.is_used = false
            retrievedHistory[i].wildcard.event = null
           }
      }
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	sessionStorage.setItem('managerPicks', JSON.stringify(retrievedPicks))
	loadTeam()
}

function cancelWildcard() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].wildcard.is_used = false
	currentHistory[0].wildcard.event = null
	//currentWeek[0].fts = currentFts 
	//currentWeek[0].rolledft = rolled
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
        for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
              retrievedHistory[i].wildcard.is_used = false
              retrievedHistory[i].wildcard.event = null
        }
    }
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	sessionStorage.setItem('managerPicks', JSON.stringify(retrievedPicks))
	loadTeam()
}

function playFreeHit() {
  trackInRealtime(weekNdeadline[1])
  trackTransfers(weekNdeadline[1])
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	//currentFts = currentWeek[0].fts
	//rolled = currentWeek[0].rolledft
	//currentWeek[0].fts = 'unlimited'
	currentHistory[0].freehit.is_used = true
	currentHistory[0].freehit.event = weekNdeadline[1]
	//currentHistory[0].rolledft = false
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
	prevIndex = retrievedPicks.findIndex(x => x.id === weekNdeadline[1] - 1)
	prevTeam = retrievedPicks.find(x => x.id === weekNdeadline[1] - 1).newPicks
	newIndex = prevIndex+2
	for(let i = 0; i < retrievedPicks.length; i++) {
		if(i===newIndex) {
			retrievedPicks[i].newPicks.length = 0
			retrievedPicks[i].newPicks.push(...prevTeam)
		}
	}
	for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
              retrievedHistory[i].freehit.is_used = true
              retrievedHistory[i].freehit.event = weekNdeadline[1]
        } else {
              retrievedHistory[i].freehit.is_used = false
              retrievedHistory[i].freehit.event = null
            }
      }    
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	sessionStorage.setItem('managerPicks', JSON.stringify(retrievedPicks))
	loadTeam()
}

function cancelFreeHit() {
  trackTransfers(weekNdeadline[1]) 
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].freehit.is_used = false
	currentHistory[0].freehit.event = null
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
	prevIndex = retrievedPicks.findIndex(x => x.id === weekNdeadline[1])
	prevTeam = retrievedPicks.find(x => x.id === weekNdeadline[1]).newPicks

	for(let i = 0; i < retrievedPicks.length; i++) {
		if(i>index) {
			retrievedPicks[i].newPicks.length = 0
			retrievedPicks[i].newPicks.push(...prevTeam)
		}
	}
  for(let i=0; i<retrievedHistory.length; i++) {
  if(i>=index) {
        retrievedHistory[i].freehit.is_used = false
        retrievedHistory[i].freehit.event = null
  }
    }  
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	sessionStorage.setItem('managerPicks', JSON.stringify(retrievedPicks))
	loadTeam()
}
function playBboost() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].bboost.is_used = true
	currentHistory[0].bboost.event = weekNdeadline[1]
	bench.classList.add('bench_boost')
	bench.classList.remove('bench')
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
	 for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
              retrievedHistory[i].bboost.is_used = true
              retrievedHistory[i].bboost.event = weekNdeadline[1]
        } else {
              retrievedHistory[i].bboost.is_used = false
              retrievedHistory[i].bboost.event = null
            }
      }
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	loadTeam()
}
function cancelBboost(){
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].bboost.is_used = false
	currentHistory[0].bboost.event = null
	bench.classList.add('bench')
	bench.classList.remove('bench_boost')
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
        for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
              retrievedHistory[i].bboost.is_used = false
              retrievedHistory[i].bboost.event = null
        }
    }
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	loadTeam()
}
function playTcap() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].tcap.is_used = true
	currentHistory[0].tcap.event = weekNdeadline[1]
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
	for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
              retrievedHistory[i].tcap.is_used = true
              retrievedHistory[i].tcap.event = weekNdeadline[1]
        } else {
              retrievedHistory[i].tcap.is_used = false
              retrievedHistory[i].tcap.event = null
            }
      }

	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	loadTeam()
}
function cancelTcap() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].tcap.is_used = false
	currentHistory[0].tcap.event = null
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
        for(let i=0; i<retrievedHistory.length; i++) {
        if(i>=index) {
              retrievedHistory[i].tcap.is_used = false
              retrievedHistory[i].tcap.event = null
        }
    }
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	loadTeam()
}