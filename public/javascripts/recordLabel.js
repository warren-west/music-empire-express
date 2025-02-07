console.log("recordLabel.js loaded!")

async function deleteRecordLabel(event) {
    const recordLabelId = event.target.value
    console.log(`/recordLabels/${recordLabelId}/delete`)
    const resp = await fetch(`/recordLabels/${recordLabelId}/delete`, {
        method: 'post'
    })
    console.log(resp.status)
}

async function updateRecordLabel(event) {
    const id = event.target.value
    console.log(id)

    const newRecordLabelName = document.getElementById(`${id}-input`).value
    console.log(newRecordLabelName)

    const newObject = {
        id,
        newRecordLabelName
    }

    const resp = await fetch(`/recordLabels/update`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)
    })
    
    if (resp.status === 200) {
        window.location.href = "/recordLabels/"
    }
}