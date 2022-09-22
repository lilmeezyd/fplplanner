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
        let newWeek = retrievedGameweeks.filter(x => x.id === curGameweek)
        let previousWeek = retrievedGameweeks.filter(x => x.id === curGameweek-1)
        let index = retrievedGameweeks.findIndex(x => x.id === curGameweek)
        if(previousWeek.length === 0) {
            newWeek[0].newPicks.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].newPicks.push(...teamz)
            sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
            loadGameweek()
        } else {
            newWeek[0].newPicks.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].newPicks.push(...previousWeek[0].newPicks)
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
        //remainingBudget < 0 || 
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
                /*let playersOutSet = new Set(playersOut)
                let playersOutSetArray = Array.from(playersOutSet)
                let playersInSet = new Set(playersIn)
                let playersInSetArray = Array.from(playersInSet)*/
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

           if(previousHistory[0].bboost.is_used === true || previousHistory[0].tcap.is_used === true) {
                let index = retrievedHistory.findIndex(x => x.id === curGameweek)
                for(let i=0; i<retrievedHistory.length; i++) {
                    if(i>=index) {
                        if(previousHistory[0].bboost.is_used === true) {
                            retrievedHistory[i].bboost.is_used = true
                            //retrievedGameweeks[i].bbench = false
                        }
                        if(previousHistory[0].tcap.is_used === true) {
                            retrievedHistory[i].tcap.is_used = true
                            //retrievedGameweeks[i].tcap = false
                        }
                    }
                }
            }
            
            if(pTransfercount !== nTransfercount || previousHistory[0].wildcard.is_used === true || previousHistory[0].freehit.is_used === true) {
                let index = retrievedHistory.findIndex(x => x.id === curGameweek)
                let prevTeam = retrievedHistory.find(x => x.id === curGameweek - 2)
                for(let i=0; i<retrievedHistory.length; i++) {
                if(i>=index) {
                    retrievedGameweeks[i].newPicks.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0 
                    retrievedHistory[i].fts = 1
                    if(previousHistory[0].wildcard.is_used === true) {
                        retrievedHistory[i].wildcard.is_used = true
                        //retrievedGameweeks[i].wcard = false
                    }
                    if(previousHistory[0].freehit.is_used === true) {
                        retrievedHistory[i].freehit.is_used = true
                        //retrievedGameweeks[i].fhit = false
                        retrievedGameweeks[i].newPicks.push(...prevTeam.newPicks)
                    }
                }
            }
            }

            //newWeek[0].newPicks.length = 0
            //newWeek[0].newPicks.push(...picks)
            newWeek[0].newPicks.length === 0 ? newWeek[0].newPicks.push(...picks) : newWeek[0].newPicks.push()
            previousHistory[0].rolledft === true ? newHistory[0].fts = 2 : newHistory[0].fts = 1
            if(previousHistory[0].rolledft === true) {
                newHistory[0].fts = 2
            }

            sessionStorage.removeItem('managerPicks')
           // retrievedGameweeks.splice(previousWeekIndex,1, previousWeek[0], newWeek[0])
            //retrievedHistory.splice(previousHistoryIndex,1, previousHistory[0], newHistory[0])
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

        playersIn.length = 0
        playersOut.length = 0

        //let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
    /* let currentChip = currentWeek[0].wcard ? 'wcard' : currentWeek[0].fhit ? 'fhit' :
                        currentWeek[0].tcap ? 'tcap' : currentWeek[0].bbench ? 'bbench' : ""
        let usedChips = []
        currentWeek[0].wcardUsed ? usedChips.push('wcard') : usedChips.push()
        currentWeek[0].fhitUsed ? usedChips.push('fhit') : usedChips.push()
        currentWeek[0].tcapUsed ? usedChips.push('tcap') : usedChips.push()
        currentWeek[0].bbenchUsed ? usedChips.push('bbench') : usedChips.push()
        
        document.querySelector('.transfer-rows').classList.remove('show')
        currentWeek[0].wcardUsed === true ? wcard.innerHTML = 'Wildcard Played' : wcard.innerHTML = 'Wildcard'
        currentWeek[0].wcardUsed === true ? wcard.classList.add('chip-inactive') : wcard.classList.remove('chip-inactive')
        currentWeek[0].wcardUsed === true ? wcard.setAttribute('disabled', true) : wcard.removeAttribute('disabled')

        currentWeek[0].fhitUsed === true ? fhit.innerHTML = 'FreeHit Played' : fhit.innerHTML = 'FreeHit'
        currentWeek[0].fhitUsed === true ? fhit.classList.add('chip-inactive') : fhit.classList.remove('chip-inactive')
        currentWeek[0].fhitUsed === true ? fhit.setAttribute('disabled', true) : fhit.removeAttribute('disabled')

        currentWeek[0].bbenchUsed === true ? bbench.innerHTML = 'Bench Boost Played' : bbench.innerHTML = 'Bench Boost'
        currentWeek[0].bbenchUsed === true ? bbench.classList.add('chip-inactive') : bbench.classList.remove('chip-inactive')
        currentWeek[0].bbenchUsed === true ? bbench.setAttribute('disabled', true) : bbench.removeAttribute('disabled')

        currentWeek[0].tcapUsed === true ? tcap.innerHTML = 'Triple Captain Played' : tcap.innerHTML = 'Triple Captain'
        currentWeek[0].tcapUsed === true ? tcap.classList.add('chip-inactive') : tcap.classList.remove('chip-inactive')
        currentWeek[0].tcapUsed === true ? tcap.setAttribute('disabled', true) : tcap.removeAttribute('disabled')
        
        currentWeek[0].bbench ? bench.classList.add('bench_boost') : bench.classList.remove('bench_boost')
        currentWeek[0].bbench ? bench.classList.remove('bench') : bench.classList.add('bench')

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
        trackTransfers()
        if(currentWeek[0].fts === 'unlimited') transferNumber.innerHTML = '∞'*/
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