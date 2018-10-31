document.addEventListener('DOMContentLoaded', () => {
  formSubmit()
})

//function for submitting create new post form
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
    if (e.target.elements[11].value === '') {
      let newImageUrl.src = '../images/foodseenlogo.png'
    } else {
      newImageUrl = e.target.elements[11].value
    }
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

    console.log('post object:', newPostObj)
    // axios.post that data to the correct backend route
    axios.post('/posts', newPostObj)
      .then((res) => {
        console.log('create post res:', res)
        if (res) {
          post_id = res.data
          alert(`Created New Event!`)
        }
      })
      .then((tags) => {
        //tags to be dealt with here
        //deal with tag tagsArray
        let newTags = e.target.elements[12].value
        let newTagsArr = newTags.split(`, `)
        let convertedTagsArr = []

        for (var i = 0; i < newTagsArr.length; i++) {
          if (newTagsArr[i] === "OUTDOORS") {
            convertedTagsArr.push(1)
          }
          if (newTagsArr[i] === "INDOORS") {
            convertedTagsArr.push(2)
          }
          if (newTagsArr[i] === "21+") {
            convertedTagsArr.push(3)
          }
          if (newTagsArr[i] === "BEER") {
            convertedTagsArr.push(4)
          }
          if (newTagsArr[i] === "PIZZA") {
            convertedTagsArr.push(5)
          }
          if (newTagsArr[i] === "RECURRING") {
            convertedTagsArr.push(6)
          }
          if (newTagsArr[i] === "ICE CREAM") {
            convertedTagsArr.push(7)
          }
          if (newTagsArr[i] === "FLASH EVENT") {
            convertedTagsArr.push(8)
          }
          if (newTagsArr[i] === "COLLEGE/UNIVERSITY") {
            convertedTagsArr.push(9)
          }
        }
        console.log('convertedTagsArr', convertedTagsArr)

        //build up each post body using the converted tag array
        convertedTagsArr.forEach(tag => {
          let tagPostBody = {
            post_id: post_id,
            tag_id: tag
          }
          axios.post('/posts_tags', tagPostBody)
            .then((res) => {
              console.log(`Posted tags for post id ${post_id}`)
              return res
            })
        })
        return tags
      })
      .catch((error) => {
        console.log(error)
      })

  })
}