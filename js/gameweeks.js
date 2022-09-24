const weekNdeadline = []
function loadGameweeks() {
    let teamReset = document.querySelector('.reset')
    const gameweekSize = 1
    let curGameweek = Math.max(...eventIds) + 1
    const bdiff = []
    const sdiff = []
    /*const gameweeks = [
        {
            "gameweek": 1,
            "team": [...teamz],
            "fts": 'unlimited',
            "rolledft": false,
            "tc": 0,
            "transfers": [{"transfersOut":[]}, {"transfersIn":[]}],
            "wcard": false,
            "bbench": false,
            "fhit": false,
            "tcap": false,
            "deadline" : 'Fri, 05 Aug 2022 17:30:00 GMT'
        },
        {
            "gameweek": 2,
            "team": [],
            "fts": 1,
            "rolledft": false,
            "tc": 0,
            "chips": [
                "wcard": false,
                "bbench": false,
                "fhit": false,
                "tcap": false
             ]
            "transfers": [{"transfersOut":[]}, {"transfersIn":[]}],
            "deadline" : 'Sat, 13 Aug 2022 11:30:00 GMT'
        },
        {
            "gameweek": 4,
            "team": [],
            "fts": 1,
            "rolledft": false,
            "tc": 0,
            "wcard": false,
            "bbench": false,
            "fhit": false,
            "tcap": false,
            "transfers": [{"transfersOut":[]}, {"transfersIn":[]}],
            "deadline" : 'Fri, 26 Aug 2022 17:30:00 GMT'
        },
        {
            "gameweek": 5,
            "team": [],
            "fts": 1,
            "rolledft": false,
            "tc": 0,
            "wcard": false,
            "bbench": false,
            "fhit": false,
            "tcap": false,
            "transfers":[{"transfersOut":[]}, {"transfersIn":[]}],
            "deadline" : 'Sat, 03 Sep 2022 11:30:00 GMT'
        },
        {
            "gameweek": 3,
            "team": [],
            "fts": 1,
            "rolledft": false,
            "tc": 0,
            "wcard": false,
            "bbench": false,
            "fhit": false,
            "tcap": false,
            "transfers": [{"transfersOut":[]}, {"transfersIn":[]}],
            "deadline" : 'Sat, 20 Aug 2022 11:30:00 GMT'
        }
    ]*/


    

    let gameweeks = []
    let ayt = []



    gameweeks.sort((a,b) => {
        if(a.gameweek > b.gameweek) return 1
        if(a.gameweek < b.gameweek) return -1
    })


    //let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))



    //teamSave.addEventListener('click', saveTeam)
    teamReset.addEventListener('click', resetTeam)
    document.querySelector('#nextGameweek').addEventListener('click', nextGameweek, false)
    document.querySelector('#prevGameweek').addEventListener('click', previousGameweek, false)
    gameweekNum.textContent = `Gameweek ${curGameweek}`



    function resetTeam() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory')) 
        let realPicks = JSON.parse(sessionStorage.getItem('realPicks'))
        let newWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
        let previousWeek = retrievedGameweeks.filter(x => x.id === curGameweek-1)
        let index = retrievedGameweeks.findIndex(x => x.id === curGameweek)
        if(previousWeek.length === 0) {
            newWeek[0].newPicks.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].newPicks.push(...realPicks)
            transferCost.innerHTML = 0

            //Added piece of code
            for(let i=0; i<retrievedGameweeks.length; i++) {
                if(i>index) {
                    retrievedGameweeks[i].newPicks.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0
                }
            }
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
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            loadGameweek()
        }
    }

    function previousGameweek() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory')) 
        const newWeekIndex = retrievedGameweeks.findIndex(x => x.id === curGameweek)
        const newHistoryIndex = retrievedHistory.findIndex(x => x.id === curGameweek)

        if(picks.length < 15) {
            console.log(`Team not full or Budget not enough`)
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

            if(captain.element !== previousCaptain.element || vcaptain.element !== previousVCaptain.element || bdiff.length < 4 || sdiff.length < 11) {
                let index = retrievedGameweeks.findIndex(x => x.id === newWeek[0].id)
                let sideArray = []
                newWeek[0].newPicks.length = 0
                newWeek[0].newPicks.push(...picks)

                if(newWeek[0].transfers[0].transfersOut.length === playersOut.length) {
                    sideArray.push()
                }
                if(newWeek[0].transfers[0].transfersOut.length < playersOut.length) {
                    newWeek[0].transfers[0].transfersOut.length = 0
                    newWeek[0].transfers[0].transfersOut.push(...playersOut)
                }
                if(newWeek[0].transfers[1].transfersIn.length === playersIn.length) {
                    sideArray.push()
                }
                if(newWeek[0].transfers[1].transfersIn.length < playersIn.length) {
                    newWeek[0].transfers[1].transfersIn.length = 0
                    newWeek[0].transfers[1].transfersIn.push(...playersIn)
                }
                let nTransfercount = newWeek[0].transfers[0].transfersOut.length
                if(pTransfercount !== nTransfercount) {
                    for(let i=0; i<retrievedGameweeks.length; i++) {
                    if(i>index) {
                        retrievedGameweeks[i].newPicks.length = 0
                        retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                        retrievedGameweeks[i].transfers[1].transfersIn.length = 0 
                        retrievedHistory[i].fts = 1
                    }
                }
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
    function nextGameweek() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory')) 
        //remainingBudget < 0 ||
        if(picks.length < 15) {
            console.log(`Team not full or Budget not enough`)
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
            /*let playersOutSet = new Set(playersOut)
            let playersOutSetArray = Array.from(playersOutSet)
            let playersInSet = new Set(playersIn)
            let playersInSetArray = Array.from(playersInSet)*/
            trackTransfers(curGameweek)
           if(previousWeek[0].transfers[0].transfersOut.length === playersOut.length) {
                sideArray.push()
            }
            if(previousWeek[0].transfers[0].transfersOut.length < playersOut.length) {
                previousWeek[0].transfers[0].transfersOut.length = 0
                previousWeek[0].transfers[0].transfersOut.push(...playersOut)
            }
            if(previousWeek[0].transfers[1].transfersIn.length === playersIn.length) {
                sideArray.push()
            }
            if(previousWeek[0].transfers[1].transfersIn.length < playersIn.length) {
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
            
            if(pTransfercount !== nTransfercount || (previousHistory[0].wildcard.event === curGameweek-1) || previousHistory[0].freehit.event === curGameweek-1) {
                let index = retrievedHistory.findIndex(x => x.id === curGameweek)
                let prevTeam = retrievedGameweeks.find(x => x.id === curGameweek - 2)
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
                        retrievedGameweeks[i].newPicks.push(...prevTeam.newPicks)
                    }
                }
            }
            }

            newWeek[0].newPicks.length === 0 ? newWeek[0].newPicks.push(...picks) : newWeek[0].newPicks.push()
            previousHistory[0].rolledft === true ? newHistory[0].fts = 2 : newHistory[0].fts = 1
            if(previousHistory[0].rolledft === true) {
                newHistory[0].fts = 2
            }

            sessionStorage.removeItem('managerPicks')
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            sessionStorage.setItem('managerHistory', JSON.stringify(retrievedHistory))

            loadGameweek()
        }
    }

    /*window.onload = function() {
        if(JSON.parse(sessionStorage.getItem('gameweeks')) === null) {
            console.log('Upload Team')
            } else {
                loadGameweek()
            }
        }*/



    function loadGameweek() {
        document.querySelector('.details-one').style.paddingBottom = '8px'
        let chipsz = document.querySelectorAll('.btn-chip')
        let retrievedPicks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let retrievedHistory = JSON.parse(sessionStorage.getItem('managerHistory'))
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


        
        
       /* if(currentWeek[0].fts === 'unlimited') transferNumber.innerHTML = '∞'*/
        trackInRealtime(curGameweek)
        trackTransfers(curGameweek)
        document.querySelector('.transfer-number').innerHTML = currentHistory[0].fts  

        if(curGameweek === Math.max(...eventIds) + 1) {
            document.querySelector('#prevGameweek').style.visibility = 'hidden'
        } else {
            document.querySelector('#prevGameweek').style.visibility = 'visible'
            //transferNumber.innerHTML = currentWeek[0].fts === 'unlimited' ? '∞' : currentWeek[0].fts
        }
        /*if((curGameweek*gameweekSize) === retrievedGameweeks.length) {
            document.querySelector('#nextGameweek').style.visibility = 'hidden'
        } else {
            document.querySelector('#nextGameweek').style.visibility = 'visible'
        }*/

        picks.length = 0
        oldTeam.length = 0
        weekNdeadline.length = 0
        //message.innerHTML = ''
        //message.style.display = 'none'
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


    function getTime() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        let currentWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
        let deadline = currentWeek[0].deadline_time
        let millis = new Date(deadline_time)-new Date()
        let seconds = Math.floor(millis/1000)
        let formattedseconds = seconds >= 60 ? seconds%60 : seconds
        newseconds = formattedseconds <= 9 ? `0${formattedseconds}` : formattedseconds
        let minutes = Math.floor(seconds/60)
        let formattedminutes = minutes >= 60 ? minutes%60 : minutes
        newminutes = formattedminutes <= 9 ? `0${formattedminutes}` : formattedminutes
        let hours = Math.floor(minutes/60)
        let formattedhours = hours >= 24 ? hours%24 : hours
        newhours = formattedhours <= 9 ? `0${formattedhours}` : formattedhours
        let days = Math.floor(hours/24)
        newdays = days <= 9 ? `0${days}` : days
        if(millis <= 0) {
            day.innerHTML = '00'
            hour.innerHTML = '00'
            minute.innerHTML = '00'
            second.innerHTML = '00'
        } else {
            day.innerHTML = newdays
            hour.innerHTML = newhours
            minute.innerHTML = newminutes
            second.innerHTML = newseconds
    }
    }
    //setInterval(getTime, 1000)

    return { loadGameweek }
}