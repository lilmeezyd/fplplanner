let chips = document.querySelectorAll('.btn-chip')
let currentFts, rolled

//Toggling .chip-active class to activate chip by passing the id
Array.from(chips).forEach(x => {
	x.onclick = function() {
		id = x.getAttribute('id')
		x.classList.toggle('chip-active')
		activateChip(id)
	}
})


//Activating specific chip using #id passed
function activateChip(a) {
	button = document.querySelector(`#${a}`)
	
	//Checking if selected button contains chip-active class
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


//Activating the wildcard
function playWildcard() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].wildcard.is_used = true
	currentHistory[0].wildcard.event = weekNdeadline[1]

	// Adding when the Wildcard was played to future gws data
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
	document.querySelector('.transfer-number').innerHTML = `∞`
	trackTransfers(weekNdeadline[1])
}

//Deactivating the wildcard chip
function cancelWildcard() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  	let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].wildcard.is_used = false
	currentHistory[0].wildcard.event = null

	// Adding that the Wildcard chip is still available to future gws data
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
	document.querySelector('.transfer-number').innerHTML = currentHistory[0].fts
	trackTransfers(weekNdeadline[1])
}

// Activating the freehit chip
function playFreeHit() {
let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks')) 
  let realPicks = JSON.parse(sessionStorage.getItem('realPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].freehit.is_used = true
	currentHistory[0].freehit.event = weekNdeadline[1]
	let index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
	let prevIndex = retrievedPicks.findIndex(x => x.id === weekNdeadline[1] - 1)

	// Pre Freehit team retrieval
	let prevTeam = prevIndex === -1 ? realPicks :
						 retrievedPicks.find(x => x.id === weekNdeadline[1] - 1).newPicks
	let newIndex = prevIndex+2

	//Resetting team to pre freehit team
	for(let i = 0; i < retrievedPicks.length; i++) {
		if(i===newIndex) {
			retrievedPicks[i].newPicks.length = 0
			retrievedPicks[i].newPicks.push(...prevTeam)
		}
	}

	// Adding when the freehit was played to future gws data
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
	document.querySelector('.transfer-number').innerHTML = `∞`
	trackTransfers(weekNdeadline[1])
}

// Deactivating the freehit chip
function cancelFreeHit() { 
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
  	let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].freehit.is_used = false
	currentHistory[0].freehit.event = null
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])
	prevIndex = retrievedPicks.findIndex(x => x.id === weekNdeadline[1])
	prevTeam = retrievedPicks.find(x => x.id === weekNdeadline[1]).newPicks

	//Current team before chip activation persisted
	for(let i = 0; i < retrievedPicks.length; i++) {
		if(i>index) {
			retrievedPicks[i].newPicks.length = 0
			retrievedPicks[i].newPicks.push(...prevTeam)
		}
	}

	// Adding that the Freehit chip is still available to future gws data
  for(let i=0; i<retrievedHistory.length; i++) {
  if(i>=index) {
        retrievedHistory[i].freehit.is_used = false
        retrievedHistory[i].freehit.event = null
  }
    }  
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	sessionStorage.setItem('managerPicks', JSON.stringify(retrievedPicks))
	loadTeam()
	document.querySelector('.transfer-number').innerHTML = currentHistory[0].fts
	trackTransfers(weekNdeadline[1])
}

// Activating the Bench Boost chip
function playBboost() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].bboost.is_used = true
	currentHistory[0].bboost.event = weekNdeadline[1]
	bench.classList.add('bench_boost')
	bench.classList.remove('bench')
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])

	// Adding when the Bench Boost was played to future gws data
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

// Deactivating the Bench Boost chip
function cancelBboost(){
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].bboost.is_used = false
	currentHistory[0].bboost.event = null
	bench.classList.add('bench')
	bench.classList.remove('bench_boost')

	// Adding that the Bench Boost chip is still available to future gws data
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

// Activating the Triple Captain chip
function playTcap() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].tcap.is_used = true
	currentHistory[0].tcap.event = weekNdeadline[1]
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])

	// Adding when the Triple Captain was played to future gws data
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

// Deactivating the Triple Captain chip
function cancelTcap() {
	let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
	let currentHistory = retrievedHistory.filter(x => x.id === weekNdeadline[1])
	currentHistory[0].tcap.is_used = false
	currentHistory[0].tcap.event = null
	index = retrievedHistory.findIndex(x => x.id === weekNdeadline[1])

	// Adding that the Trple Captain chip is still available to future gws data
  for(let i=0; i<retrievedHistory.length; i++) {
  if(i>=index) {
        retrievedHistory[i].tcap.is_used = false
        retrievedHistory[i].tcap.event = null
  }
  }
	sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
	loadTeam()
}