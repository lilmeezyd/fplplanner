
function dragStart(e) {
    e.dataTransfer.setData('Text', e.target.id)
    console.log(e)
}

function dragging(e) {
    console.log('the event is being dragged')
}

function allowDropPlayer(e) {
    e.preventDefault()
}

function dropPlayer(e) {
    //console.log(e)
}