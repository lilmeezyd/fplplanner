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
            "wcard": false,
            "bbench": false,
            "fhit": false,
            "tcap": false,
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
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('gameweeks'))
        let newWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
        let previousWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek-1)
        let index = retrievedGameweeks.findIndex(x => x.gameweek === curGameweek)
        if(previousWeek.length === 0) {
            newWeek[0].team.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].team.push(...teamz)
            sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
            loadGameweek()
        } else {
            newWeek[0].team.length = 0
            newWeek[0].transfers[0].transfersOut.length = 0
            newWeek[0].transfers[1].transfersIn.length = 0
            newWeek[0].team.push(...previousWeek[0].team)
            for(let i=0; i<retrievedGameweeks.length; i++) {
                if(i>index) {
                    retrievedGameweeks[i].team.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0
                }
            }
            sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
            loadGameweek()
        }
    }

    function previousGameweek() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        //remainingBudget < 0 || 
        if(picks.length < 15) {
            console.log(`Team not full or Budget not enough`)
        } else { 
            /*let newWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
            let pTransfercount = newWeek[0].transfers[0].transfersOut.length
            let captain = team.find(x => x.captain)
            let vcaptain = team.find(x => x.vcaptain)
            const nTeam = [...team]
            let bnTeam = nTeam.filter(x => x.bench)
            let snTeam = nTeam.filter(x => !x.bench)*/
            if(curGameweek > Math.max(...eventIds) + 1) curGameweek--
            /*let previousWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
            let previousCaptain = previousWeek[0].team.find(x => x.captain)
            let previousVCaptain = previousWeek[0].team.find(x => x.vcaptain)
            bnpreviousWeek = previousWeek[0].team.filter(x => x.bench)
            snpreviousWeek = previousWeek[0].team.filter(x => !x.bench)
            bnTeam.forEach(x => {
                bnpreviousWeek.forEach(y => {
                    if(y.name == x.name) {
                        bdiff.push(x)
                    }
                })
            })

            snTeam.forEach(x => {
                snpreviousWeek.forEach(y => {
                    if(y.name == x.name) {
                        sdiff.push(x)
                    }
                })
            })

            if(remainingBudget > 0 && (captain.name !== previousCaptain.name || vcaptain.name !== previousVCaptain.name || bdiff.length < 4 || sdiff.length < 11)) {
                let index = retrievedGameweeks.findIndex(x => x.gameweek === newWeek[0].gameweek)
                let sideArray = []
                newWeek[0].team.length = 0
                newWeek[0].team.push(...team)*/
                /*let playersOutSet = new Set(playersOut)
                let playersOutSetArray = Array.from(playersOutSet)
                let playersInSet = new Set(playersIn)
                let playersInSetArray = Array.from(playersInSet)*/
                /*if(newWeek[0].transfers[0].transfersOut.length === playersOut.length) {
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
                        retrievedGameweeks[i].team.length = 0
                        retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                        retrievedGameweeks[i].transfers[1].transfersIn.length = 0 
                        retrievedGameweeks[i].fts = 1
                    }
                }
                }
                sessionStorage.setItem('gameweeks', JSON.stringify(retrievedGameweeks))
            }*/
            gameweekNum.textContent = `Gameweek ${curGameweek}`
            loadGameweek()
            //sdiff.length = 0
            //bdiff.length = 0
        }
    }
    function nextGameweek() {
        let retrievedGameweeks = JSON.parse(sessionStorage.getItem('managerPicks'))
        //remainingBudget < 0 ||
        if(picks.length < 15) {
            console.log(`Team not full or Budget not enough`)
        } else {
            if((curGameweek*gameweekSize) < retrievedGameweeks.length) curGameweek++   
            gameweekNum.textContent = `Gameweek ${curGameweek}`
            previousWeek = retrievedGameweeks.filter(x => x.id === curGameweek - 1)
            let sideArray = []
            let pTransfercount = previousWeek[0].transfers[0].transfersOut.length
            previousWeek[0].newPicks.length = 0
            previousWeek[0].newPicks.push(...picks)
            console.log(previousWeek)
            /*let playersOutSet = new Set(playersOut)
            let playersOutSetArray = Array.from(playersOutSet)
            let playersInSet = new Set(playersIn)
            let playersInSetArray = Array.from(playersInSet)*/
            //trackTransfers()
            /*if(previousWeek[0].transfers[0].transfersOut.length === playersOut.length) {
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

            if(previousWeek[0].transfers[0].transfersOut.length === 0 && previousWeek[0].fts !== 'unlimited') {
                previousWeek[0].rolledft = true
            }
            if(previousWeek[0].transfers[0].transfersOut.length === 1 && previousWeek[0].fts === 2) {
                previousWeek[0].rolledft = true
            }
            if(previousWeek[0].transfers[0].transfersOut.length > 1 ) {
                previousWeek[0].rolledft = false
            }
            


            newWeek = retrievedGameweeks.filter(x => x.id === curGameweek)

            if(previousWeek[0].bbench === true || previousWeek[0].tcap === true) {
                let index = retrievedGameweeks.findIndex(x => x.id === curGameweek)
                for(let i=0; i<retrievedGameweeks.length; i++) {
                    if(i>=index) {
                        if(previousWeek[0].bbench === true) {
                            retrievedGameweeks[i].bbenchUsed = true
                            retrievedGameweeks[i].bbench = false
                        }
                        if(previousWeek[0].tcap === true) {
                            retrievedGameweeks[i].tcapUsed = true
                            retrievedGameweeks[i].tcap = false
                        }
                    }
                }
            }
            
            if(pTransfercount !== nTransfercount || previousWeek[0].wcard === true || previousWeek[0].fhit === true) {
                let index = retrievedGameweeks.findIndex(x => x.id === curGameweek)
                let prevTeam = retrievedGameweeks.find(x => x.id === curGameweek - 2)
                for(let i=0; i<retrievedGameweeks.length; i++) {
                if(i>=index) {
                    retrievedGameweeks[i].newPicks.length = 0
                    retrievedGameweeks[i].transfers[0].transfersOut.length = 0
                    retrievedGameweeks[i].transfers[1].transfersIn.length = 0 
                    retrievedGameweeks[i].fts = 1
                    if(previousWeek[0].wcard === true) {
                        retrievedGameweeks[i].wcardUsed = true
                        retrievedGameweeks[i].wcard = false
                    }
                    if(previousWeek[0].fhit === true) {
                        retrievedGameweeks[i].fhitUsed = true
                        retrievedGameweeks[i].fhit = false
                        retrievedGameweeks[i].team.push(...prevTeam.team)
                    }
                }
            }
            }


            newWeek[0].newPicks.length === 0 ? newWeek[0].newPicks.push(...picks) : newWeek[0].newPicks.push()
            //previousWeek[0].rolledft === true ? newWeek[0].fts = 2 : newWeek[0].fts = 1
            if(previousWeek[0].rolledft === true && newWeek[0].fts !== 'unlimited') {
                newWeek[0].fts = 2
            }*/
            /* if(previousWeek[0].rolledft === true && newWeek[0].fhit === false) {
                newWeek[0].fts = 2
            }*/
            //sessionStorage.setItem('managerPicks', JSON.stringify(retrievedGameweeks))
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
        const { current, chips } = retrievedHistory
        axe = current.splice(1)
        let wildcard
        if(chips.length > 0) {
            wildcard = chips.filter(x => x.name === 'wildcard')[0].event
        }
        
        let ftz = 0
        for(let i = 0; i <= axe.length-2; i++) {
            if(axe[i].event_transfers === 0 && axe[i].event !== wildcard && axe[i+1].event_transfers === 0) {
                ftz = 2
            }
            if(axe[i].event_transfers === 1 && ftz == 2) {
                ftz = 2
            }
            if(axe[i].event_transfers === 2) {
                ftz = 1
            }
        }

       

        //let currentWeek = retrievedGameweeks.filter(x => x.gameweek === curGameweek)
    /* let currentChip = currentWeek[0].wcard ? 'wcard' : currentWeek[0].fhit ? 'fhit' :
                        currentWeek[0].tcap ? 'tcap' : currentWeek[0].bbench ? 'bbench' : ""
        let usedChips = []
        currentWeek[0].wcardUsed ? usedChips.push('wcard') : usedChips.push()
        currentWeek[0].fhitUsed ? usedChips.push('fhit') : usedChips.push()
        currentWeek[0].tcapUsed ? usedChips.push('tcap') : usedChips.push()
        currentWeek[0].bbenchUsed ? usedChips.push('bbench') : usedChips.push()
        playersIn.length = 0
        playersOut.length = 0
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
        //message.innerHTML = ''
        //message.style.display = 'none'
        retrievedPicks.filter((row, index) => {
            let start = (curGameweek-(Math.max(...eventIds) + 1))*gameweekSize
            let end = (curGameweek-Math.max(...eventIds))*gameweekSize
            if(index >= start && index < end) return true
        }).forEach(a => {
            picks.push(...a.newPicks)
            oldTeam.push(...a.newPicks)
            document.querySelector('.transfer-number').innerHTML = ftz
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

    return { loadGameweek, curGameweek }
}