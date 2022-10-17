const weekNdeadline = []
function loadGameweeks() {
    let teamReset = document.querySelector('.reset')
    const gameweekSize = 1
    let curGameweek = Math.max(...eventIds) + 1



    //teamReset.addEventListener('click', resetTeam)
    //document.getElementById('nextGameweek').addEventListener('click', nxtGameweek, false)
    //document.querySelector('#prevGameweek').addEventListener('click', previousGameweek, false)
    gameweekNum.textContent = `Gameweek ${curGameweek}`


    // Loading picks from the previous GW & wiping out future picks
    teamReset.onclick = function resetTeam() {
        tempPlayersOut.length = 0
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory')) 
        let realPicks = JSON.parse(sessionStorage.getItem('realPicks'))
        let realHistory = JSON.parse(sessionStorage.getItem('realHistory'))
        let newWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
        let previousWeek = retrievedGameweeks.filter(x => x.id === curGameweek-1)
        let previousHistory = retrievedHistory.filter(x => x.id === curGameweek-1)
        let index = retrievedGameweeks.findIndex(x => x.id === curGameweek)
        document.querySelector('.message').innerHTML = ``
        document.querySelector('.message').style.display = 'none'
        if(previousWeek.length === 0) {
            newWeek[0].newPicks.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].newPicks.push(...realPicks)
            transferCost.innerHTML = 0

            for(let i=0; i<retrievedGameweeks.length; i++) {
                if(i>index) {
                    retrievedGameweeks[i].newPicks.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0
                }
            }
            for(let i=0; i<retrievedHistory.length; i++) {
                if(i>=index) {
                    retrievedHistory[i].bboost.is_used = realHistory[0].bboost.is_used
                    retrievedHistory[i].bboost.event = realHistory[0].bboost.event
                    retrievedHistory[i].wildcard.is_used = realHistory[0].wildcard.is_used
                    retrievedHistory[i].wildcard.event = realHistory[0].wildcard.event
                    retrievedHistory[i].freehit.is_used = realHistory[0].freehit.is_used
                    retrievedHistory[i].freehit.event = realHistory[0].freehit.event
                    retrievedHistory[i].tcap.is_used = realHistory[0].tcap.is_used
                    retrievedHistory[i].tcap.event = realHistory[0].tcap.event
                }
            }
            sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            loadGameweek()
        } else {
            newWeek[0].newPicks.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].newPicks.push(...previousWeek[0].newPicks)
            transferCost.innerHTML = 0
            for(let i=0; i<retrievedGameweeks.length; i++) {
                if(i>index) {
                    retrievedGameweeks[i].newPicks.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0
                }
            }
            for(let i=0; i<retrievedHistory.length; i++) {
                if(i>=index) {
                    retrievedHistory[i].bboost.is_used = previousHistory[0].bboost.is_used
                    retrievedHistory[i].bboost.event = previousHistory[0].bboost.event
                    retrievedHistory[i].wildcard.is_used = previousHistory[0].wildcard.is_used
                    retrievedHistory[i].wildcard.event = previousHistory[0].wildcard.event
                    retrievedHistory[i].freehit.is_used = previousHistory[0].freehit.is_used
                    retrievedHistory[i].freehit.event = previousHistory[0].freehit.event
                    retrievedHistory[i].tcap.is_used = previousHistory[0].tcap.is_used
                    retrievedHistory[i].tcap.event = previousHistory[0].tcap.event
                }
            }
            sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            loadGameweek()
        }
    }

    // Loading picks from a Gameweek preceding the current
    document.querySelector('#prevGameweek').onclick = function previousGameweek() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory')) 
        const newWeekIndex = retrievedGameweeks.findIndex(x => x.id === curGameweek)
        const newHistoryIndex = retrievedHistory.findIndex(x => x.id === curGameweek)
        const bdiff = []
        const sdiff = []
        
        document.querySelector('.message').innerHTML = ``
        document.querySelector('.message').style.display = 'none'

        if(remainingBudget < 0 || (picks.length - tempPlayersOut.length) < 15) {
            if(remainingBudget < 0) {
                document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = `Budget not enough`
	
            } else {
                document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = `Team not full`
            }
        } else { 
            let newWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
            const newHistory = retrievedHistory.filter(x => x.id === curGameweek)
            let pTransfercount = newWeek[0].transfers[0].transfersOut.length
            let captain = picks.find(x => x.is_captain)
            let vcaptain = picks.find(x => x.is_vice_captain)
            const nTeam = [...picks]
            let bnTeam = nTeam.filter(x => x.multiplier !== 0)
            let snTeam = nTeam.filter(x => x.multiplier === 0)
            if(curGameweek > Math.max(...eventIds) + 1) curGameweek--
            let previousWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
            let previousHistory = retrievedHistory.filter(x => x.id === curGameweek)
            let previousCaptain = previousWeek[0].newPicks.find(x => x.is_captain)
            let previousVCaptain = previousWeek[0].newPicks.find(x => x.is_vice_captain)
            bnpreviousWeek = previousWeek[0].newPicks.filter(x => x.multiplier !== 0)
            snpreviousWeek = previousWeek[0].newPicks.filter(x => x.multiplier === 0)
            bnTeam.forEach(x => {
                bnpreviousWeek.forEach(y => {
                    if(y.element == x.element) {
                        bdiff.push(x)
                    }
                })
            })

            snTeam.forEach(x => {
                snpreviousWeek.forEach(y => {
                    if(y.element == x.element) {
                        sdiff.push(x)
                    }
                })
            })

            let playersMatchOut = function() {
                if(newWeek[0].transfers[0].transfersOut.length !== playersOut.length) {
                    return false
                }
                for(let i = 0; i < playersOut.length; i++) {
                   let checkPlayer = newWeek[0].transfers[0].transfersOut.some(x => x.element !== playersOut[i].element)
                   if(checkPlayer === false) {
                    return false
                   }  
                }
                return true 
            }
            let playersMatchIn = function() {
                if(newWeek[0].transfers[1].transfersIn.length !== playersIn.length) {
                    return false
                }
                for(let i = 0; i < playersIn.length; i++) {
                   let checkPlayer = newWeek[0].transfers[1].transfersIn.some(x => x.element === playersIn[i].element)
                   if(checkPlayer === false) {
                    return false
                   }  
                }
                return true 
            }

            doesExist = playersMatchIn()

            if(doesExist == false || captain.element !== previousCaptain.element || vcaptain.element !== previousVCaptain.element || bdiff.length < 11 || sdiff.length < 4) {
                let index = retrievedGameweeks.findIndex(x => x.id === newWeek[0].id)
                let sideArray = []
                newWeek[0].newPicks.length = 0
                newWeek[0].newPicks.push(...picks)

                if(playersMatchOut() == true && newWeek[0].transfers[0].transfersOut.length === playersOut.length) {
                    sideArray.push()
                }
                if(playersMatchOut() == false || newWeek[0].transfers[0].transfersOut.length < playersOut.length) {
                    newWeek[0].transfers[0].transfersOut.length = 0
                    newWeek[0].transfers[0].transfersOut.push(...playersOut)
                }
                if(playersMatchIn() == true && newWeek[0].transfers[1].transfersIn.length === playersIn.length) {
                    sideArray.push()
                }
                if(playersMatchIn() == false || newWeek[0].transfers[1].transfersIn.length < playersIn.length) {
                    newWeek[0].transfers[1].transfersIn.length = 0
                    newWeek[0].transfers[1].transfersIn.push(...playersIn)
                }
                let nTransfercount = newWeek[0].transfers[0].transfersOut.length
                if(doesExist == false || pTransfercount !== nTransfercount) {
                    for(let i=0; i<retrievedGameweeks.length; i++) {
                    if(i>index) {
                        retrievedGameweeks[i].newPicks.length = 0
                        retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                        retrievedGameweeks[i].transfers[1].transfersIn.length = 0 
                        retrievedHistory[i].fts = 1
                    }
                }
                } 

            if(newHistory[0].fts === 2 && previousHistory[0].fts === 2){
                previousHistory[0].rolledft = true
                newHistory[0].rolledft = false
                newHistory[0].fts = 1
            }
            if(newHistory[0].fts <= 2 && previousHistory[0].fts === 1) {
                previousHistory[0].rolledft = false
                newHistory[0].rolledft = false
                newHistory[0].fts = 1
            }

            sessionStorage.removeItem('managerPicks')
            sessionStorage.removeItem('managerHistory')
            //retrievedGameweeks.splice(newWeekIndex,1, newWeek[0])
            //retrievedHistory.splice(newHistoryIndex,1, newHistory[0])
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))
                //sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
            }
            gameweekNum.textContent = `Gameweek ${curGameweek}`
            loadGameweek()
            //sdiff.length = 0
            //bdiff.length = 0
        }
    }

    // Loading picks from an upcoming Gameweek
    document.getElementById('nextGameweek').onclick = function nxtGameweek() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
        let realPicks = JSON.parse(sessionStorage.getItem('realPicks'))
        
        document.querySelector('.message').innerHTML = ``
        document.querySelector('.message').style.display = 'none'
        if(remainingBudget < 0 || (picks.length - tempPlayersOut.length) < 15) {
            if(remainingBudget < 0) {
                document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = `Budget not enough`
	
            } else {
                document.querySelector('.message').style.display = 'block'
				document.querySelector('.details-one').style.paddingBottom = 0
				document.querySelector('.message').classList.add('danger')
				document.querySelector('.message').classList.remove('success')
				document.querySelector('.message').innerHTML = `Team not full`
            }
        } else {
            if((curGameweek*gameweekSize) < retrievedGameweeks.length) curGameweek++   
            gameweekNum.textContent = `Gameweek ${curGameweek}`
            const previousWeek = retrievedGameweeks.filter(x => x.id === curGameweek - 1)
            const previousHistory = retrievedHistory.filter(x => x.id === curGameweek - 1)
            const previousWeekIndex = retrievedGameweeks.findIndex(x => x.id === curGameweek - 1)
            const previousHistoryIndex = retrievedHistory.findIndex(x => x.id === curGameweek - 1)
            const sideArray = []
            let pTransfercount = previousWeek[0].transfers[0].transfersOut.length
            previousWeek[0].newPicks.length = 0
            previousWeek[0].newPicks.push(...picks)

            trackTransfers(curGameweek)

            let playersMatchOut = function() {
                if(previousWeek[0].transfers[0].transfersOut.length !== playersOut.length) {
                    return false
                }
                for(let i = 0; i < playersOut.length; i++) {
                   let checkPlayer = previousWeek[0].transfers[0].transfersOut.some(x => x.element !== playersOut[i].element)
                   if(checkPlayer === false) {
                    return false
                   }  
                }
                return true 
            }
            let playersMatchIn = function() {
                if(previousWeek[0].transfers[1].transfersIn.length !== playersIn.length) {
                    return false
                }
                for(let i = 0; i < playersIn.length; i++) {
                   let checkPlayer = previousWeek[0].transfers[1].transfersIn.some(x => x.element === playersIn[i].element)
                   if(checkPlayer === false) {
                    return false
                   }  
                }
                return true 
            }

            doesExist = playersMatchIn()

            //console.log(playersMatchOut())
            //console.log(playersMatchIn())
            //console.log(doesExist)
            if(playersMatchIn() == true && previousWeek[0].transfers[1].transfersIn.length == playersIn.length) {
                sideArray.push()
            }
            if(playersMatchOut() == false || previousWeek[0].transfers[0].transfersOut.length < playersOut.length) {
                previousWeek[0].transfers[0].transfersOut.length = 0
                previousWeek[0].transfers[0].transfersOut.push(...playersOut)
            }
            if(playersMatchOut() == true && previousWeek[0].transfers[0].transfersOut.length == playersOut.length) {
                sideArray.push()
            }
            if(playersMatchIn() == false || previousWeek[0].transfers[1].transfersIn.length < playersIn.length) {
                previousWeek[0].transfers[1].transfersIn.length = 0
                previousWeek[0].transfers[1].transfersIn.push(...playersIn)
            }

            let nTransfercount = previousWeek[0].transfers[0].transfersOut.length

            if(previousWeek[0].transfers[0].transfersOut.length === 0 ) {
                previousHistory[0].rolledft = true
            }
            if(previousWeek[0].transfers[0].transfersOut.length === 1 && previousHistory[0].fts === 2) {
                previousHistory[0].rolledft = true
            }
            if(previousWeek[0].transfers[0].transfersOut.length > 1 ) {
                previousHistory[0].rolledft = false
            }

            

           const newWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
           const newHistory = retrievedHistory.filter(x => x.id === curGameweek)

           let picksMatch = function() {
            for(let i = 0; i < previousWeek[0].newPicks.length; i++) {
                   let checkPlayer = newWeek[0].newPicks.some(x => x.element === previousWeek[0].newPicks[i].element)
                   if(checkPlayer === false) {
                    return false
                   }  
                }
                return true 
           }
           //console.log(playersMatchIn())
           //console.log(picksMatch())
            console.log(doesExist)

           if(previousHistory[0].bboost.event === curGameweek-1 || previousHistory[0].tcap.event === curGameweek-1) {
                let index = retrievedHistory.findIndex(x => x.id === curGameweek)
                for(let i=0; i<retrievedHistory.length; i++) {
                    if(i>=index) {
                        if(previousHistory[0].bboost.is_used === true) {
                            retrievedHistory[i].bboost.is_used = true
                            //retrievedHistory[i].bboost.event = curGameweek
                        }
                        if(previousHistory[0].tcap.is_used === true) {
                            retrievedHistory[i].tcap.is_used = true
                            //retrievedHistory[i].tcap.event = curGameweek
                        }
                    }
                }
            }
            
            if(doesExist == false || pTransfercount !== nTransfercount || (previousHistory[0].wildcard.event === curGameweek-1) || previousHistory[0].freehit.event === curGameweek-1) {
                let index = retrievedHistory.findIndex(x => x.id === curGameweek)
                let prevIndex = retrievedGameweeks.findIndex(x => x.id === curGameweek - 2)
                let prevTeam = prevIndex === -1 ? realPicks : 
                retrievedGameweeks.find(x => x.id === curGameweek - 2).newPicks
                for(let i=0; i<retrievedHistory.length; i++) {
                if(i>=index) {
                    retrievedGameweeks[i].newPicks.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0 
                    retrievedHistory[i].fts = 1
                    if(previousHistory[0].wildcard.is_used === true) {
                        retrievedHistory[i].wildcard.is_used = true
                        //retrievedHistory[i].wildcard.event = curGameweek
                    }
                    if(previousHistory[0].freehit.is_used === true) {
                        retrievedHistory[i].freehit.is_used = true
                        //retrievedHistory[i].freehit.event = curGameweek
                        retrievedGameweeks[i].newPicks.push(...prevTeam)
                    }
                }
            }
            }


            newWeek[0].newPicks.length === 0 ? newWeek[0].newPicks.push(...picks) : newWeek[0].newPicks.push()
            //previousHistory[0].rolledft === true ? newHistory[0].fts = 2 : newHistory[0].fts = 1
            if(previousWeek[0].transfers[0].transfersOut.length === 1 && previousHistory[0].rolledft === true){
                newHistory[0].fts = 2
                previousHistory[0].rolledft = true
            }
            if(previousWeek[0].transfers[0].transfersOut.length === 0) {
                newHistory[0].fts = 2
                previousHistory[0].rolledft = true
            }
            if(previousWeek[0].transfers[0].transfersOut.length > 1) {
                newHistory[0].fts = 1
                previousHistory[0].rolledft = false
            }
            if(previousWeek[0].transfers[0].transfersOut.length === 1 && previousHistory[0].rolledft === false) {
                newHistory[0].fts = 1
                previousHistory[0].rolledft = false
            }

            sessionStorage.removeItem('managerPicks')
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))

            loadGameweek()
        }
    }

    

    // Loading a specific Gameweek
    function loadGameweek() {
        document.querySelector('.details-one').style.paddingBottom = '8px'
        let chipsz = document.querySelectorAll('.btn-chip')
        let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
        if(retrievedHistory === null) return
        let currentHistory = retrievedHistory.filter(x => x.id === curGameweek)

        playersIn.length = 0
        playersOut.length = 0

        let currentChip = currentHistory[0].wildcard.event === curGameweek ? 'wcard' : 
                         currentHistory[0].freehit.event === curGameweek ? 'fhit' :
                         currentHistory[0].tcap.event === curGameweek ? 'tcap' : 
                         currentHistory[0].bboost.event === curGameweek ? 'bbench' : ""
        let usedChips = []
        currentHistory[0].wildcard.is_used === true ? usedChips.push('wcard') : usedChips.push()
        currentHistory[0].freehit.is_used === true ? usedChips.push('fhit') : usedChips.push()
        currentHistory[0].tcap.is_used === true ? usedChips.push('tcap') : usedChips.push()
        currentHistory[0].bboost.is_used === true ? usedChips.push('bbench') : usedChips.push()
        
        document.querySelector('.transfer-rows').classList.remove('show')

        //Controlling the wildcard button
        currentHistory[0].wildcard.is_used === true && currentHistory[0].wildcard.event !== curGameweek ? 
        wcard.innerHTML = `<div>Wildcard Played</div>
        <div class="gw">GW&nbsp;${currentHistory[0].wildcard.event}</div>` : wcard.innerHTML = 'Wildcard'
        currentHistory[0].wildcard.is_used === true && currentHistory[0].wildcard.event !== curGameweek ? wcard.classList.add('chip-inactive') : wcard.classList.remove('chip-inactive')
        currentHistory[0].wildcard.is_used === true && currentHistory[0].wildcard.event !== curGameweek ? wcard.setAttribute('disabled', true) : wcard.removeAttribute('disabled')

        //Controlling the freehit button
        currentHistory[0].freehit.is_used === true && currentHistory[0].freehit.event !== curGameweek ? 
        fhit.innerHTML = `<div>FreeHit Played</div>
        <div class="gw">GW&nbsp;${currentHistory[0].freehit.event}</div>` : fhit.innerHTML = 'FreeHit'
        currentHistory[0].freehit.is_used === true && currentHistory[0].freehit.event !== curGameweek ? fhit.classList.add('chip-inactive') : fhit.classList.remove('chip-inactive')
        currentHistory[0].freehit.is_used === true && currentHistory[0].freehit.event !== curGameweek ? fhit.setAttribute('disabled', true) : fhit.removeAttribute('disabled')

        //Controlling the bboost button
        currentHistory[0].bboost.is_used === true && currentHistory[0].bboost.event !== curGameweek ? 
        bbench.innerHTML = `<div>Bench Boost Played</div>
        <div class="gw">GW&nbsp;${currentHistory[0].bboost.event}</div>` : bbench.innerHTML = 'Bench Boost'
        currentHistory[0].bboost.is_used === true && currentHistory[0].bboost.event !== curGameweek ? bbench.classList.add('chip-inactive') : bbench.classList.remove('chip-inactive')
        currentHistory[0].bboost.is_used === true && currentHistory[0].bboost.event !== curGameweek ? bbench.setAttribute('disabled', true) : bbench.removeAttribute('disabled')

        //Controlling the tcap
        currentHistory[0].tcap.is_used === true && currentHistory[0].tcap.event !== curGameweek ? 
        tcap.innerHTML = `Triple Captain Played
        <div class="gw">GW&nbsp;${currentHistory[0].tcap.event}</div>` : tcap.innerHTML = 'Triple Captain'
        currentHistory[0].tcap.is_used === true && currentHistory[0].tcap.event !== curGameweek ? tcap.classList.add('chip-inactive') : tcap.classList.remove('chip-inactive')
        currentHistory[0].tcap.is_used === true && currentHistory[0].tcap.event !== curGameweek ? tcap.setAttribute('disabled', true) : tcap.removeAttribute('disabled')
        
        currentHistory[0].bboost.event === curGameweek ? bench.classList.add('bench_boost') : bench.classList.remove('bench_boost')
        currentHistory[0].bboost.event === curGameweek ? bench.classList.remove('bench') : bench.classList.add('bench')

        Array.from(chips)
        .filter(x => usedChips.includes(x.getAttribute('id')))
        .forEach(x => x.classList.remove('chip-active'))

        Array.from(chips)
        .filter(x => !usedChips.includes(x.getAttribute('id')))
        .forEach(x => x.classList.remove('chip-active'))

        Array.from(chips)
        .filter(x => x.getAttribute('id') === currentChip)
        .forEach(x => x.classList.add('chip-active'))

        Array.from(chips)
        .filter(x => x.getAttribute('id') !== currentChip && currentChip !== '')
        .forEach(x => {
            x.classList.add('chip-inactive')
            x.setAttribute('disabled', true)
        })

        trackInRealtime(curGameweek)
        trackTransfers(curGameweek)
        document.querySelector('.transfer-number').innerHTML = 
        (currentChip === 'fhit' || currentChip === 'wcard') ? '∞' : currentHistory[0].fts  

        if(curGameweek === Math.max(...eventIds) + 1) {
            document.querySelector('#prevGameweek').style.visibility = 'hidden'
        } else {
            document.querySelector('#prevGameweek').style.visibility = 'visible'
            //transferNumber.innerHTML = currentWeek[0].fts === 'unlimited' ? '∞' : currentWeek[0].fts
        }
        

        picks.length = 0
        oldTeam.length = 0
        weekNdeadline.length = 0
        //message.innerHTML = ''
        //message.style.display = 'none'
        if(retrievedPicks === null) {
            return
        }
        retrievedPicks.filter((row, index) => {
            let start = (curGameweek-(Math.max(...eventIds) + 1))*gameweekSize
            let end = (curGameweek-Math.max(...eventIds))*gameweekSize
            if(index >= start && index < end) return true
        }).forEach(a => {
            weekNdeadline.push(a.deadline_time, a.id)
            picks.push(...a.newPicks)
            oldTeam.push(...a.newPicks)
            document.querySelector('.remain-budget').innerHTML = a.bank
            loadTeam()
            upload().loadPlayers()
        })
    }



    return { loadGameweek }
}