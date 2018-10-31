document.addEventListener('DOMContentLoaded', () => {
  formSubmit()
})

function formSubmit() {
  let createBtn = document.getElementById('createSubmit')
  if (!createBtn) {
    throw new Error('no form present')
  }
  createBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    // grab all values from the form
    // let userID = ??????
    let newEventName = e.target.elements[0].value
    let newFoodName = e.target.elements[1].value
    let newAddress = e.target.elements[5].value
    let newCity = e.target.elements[6].value
    let newState = e.target.elements[7].value
    let newZip = e.target.elements[9].value
    let newCountry = e.target.elements[10].value
    let newImageUrl = e.target.elements[11].value
    let newStartTime = `${e.target.elements[2].value} ${e.target.elements[3].value}:00 UTC`
    let newEndTime = `${e.target.elements[2].value} ${e.target.elements[4].value}:00 UTC`
    let newDate = e.target.elements[2].value
    // e.target.elements[11].getAttribute('name')
    let newPromoted = document.getElementById('tagCheckbox').checked

    let newPostObj = {
      eventName: newEventName,
      foodName: newFoodName,
      address: newAddress,
      city: newCity,
      zipcode: newZip,
      country: newCountry,
      state: newState,
      imageUrl: newImageUrl,
      startTime: newStartTime,
      endTime: newEndTime,
      date: newDate,
      promoted: newPromoted
    }
    let post_id

    //logic to have a promoted login
    if (newPromoted === true) {
      alert('Please login with your promoter code to enable promotion ________')
    }

    axios.post('/posts', newPostObj)
      .then((res) => {
        console.log('res:', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}