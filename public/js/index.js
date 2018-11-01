var token = document.location.href.split('#')[1]

document.addEventListener("DOMContentLoaded", function(event) {
  // console.log("DOM fully loaded and parsed")

  //materialize stuff
  M.AutoInit()
  setCookie()


  //general function calls
  getPosts()
  formSubmit()


  //cookies and login and all the terrible things
  // check the cookie with:
  //1. axios.get to /users 
  // 2. Set-Cookie: id=token; expires=..., secure; HttpOnly
  let cookieBtn = document.getElementById('cookie')
  cookieBtn.addEventListener('click', () => {
    axios.request({
        url: '/posts',
        method: 'get',
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
      })

  })
})

function setCookie() {


  document.cookie = `token=${token}`
  // console.log('in the setCookie:', token)

}

function getCookie() {
  let x = document.cookie
  alert(x);
}








//////should this be a getCardsforUserwithId()?\\\\\\\\


function getUsers() {
  axios.get('/users')
    .then((res) => {
      // console.log('users data:', res.data)
      res.data.forEach((users) => {
        /////// build profile card for users\\\\\\\
        // let userDiv = document.getElementById('userDiv')
        // let userH5 = document.createElement('h5')
        // userH5.className = "usersText"
        // userDiv.appendChild(userH5)
        // userH5.innerText = `
        // User: ${users.id}
        // \n${users.first_name} ${users.last_name}\n ${users.location}  `
      })
    })
}

////Main Card\\\\\
let cardRow = document.createElement('div')
cardRow.className = 'row'
cardRow.id = 'addtome'
let cardCol = document.createElement('div')
cardCol.className = 'col s6 pull-s3'

////////////get posts\\\\\\\\\\
function getPosts() {
  axios.get('https://food-seen.herokuapp.com/posts')
    .then((res) => {
      // handle success
      res.data.forEach((posts) => {
        ////////////set data into cards\\\\\\\\\\\\
        
        ///////////////GENERATE CARDS\\\\\\\\\\\\\\
        let card = document.createElement('div')
        card.className = 'card hoverable'
        let cardTitle = document.createElement('span')
        cardTitle.className = 'grey-text textdarken-4'
        let cardImage = document.createElement('div')
        cardImage.className = 'card-image'
        let imgSrc = document.createElement('img')
        let foodName = document.createElement('div')
        foodName.className = 'foodName'
        let startTime = document.createElement('span')
        startTime.className = 'times'
        let endTime = document.createElement('span')
        endTime.className = 'times'
        let location = document.createElement('div')
        location.className = 'location'
        let dateOnCard = document.createElement('div')
        dateOnCard.className = 'date'
        

        ///////DATE MANIPULATION\\\\\\\
        let date = new Date(posts.date)
        let newDate = date.toString().split(' ').slice(0, 3)
        let dayOfWeek = newDate[0].substr(0)
        // console.log(dayOfWeek)
        let month = newDate.slice(1, 2)
        // console.log(month)
        let numberDate = newDate.slice(2)
        // console.log(numberDate)
        

        ///////MINI CARDS\\\\\\
        let parentContainer = document.getElementById('parentContainer')
        let miniCardsColumn = document.getElementById('miniCards')
        let secondMiniCardsColumn = document.getElementById('miniCards2')
        let thirdMiniCardsColumn = document.getElementById('miniCards3')

        cardRow.appendChild(thirdMiniCardsColumn)
        cardRow.appendChild(secondMiniCardsColumn)
        cardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)

        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        
        if (miniCardsColumn.childNodes.length > 4){
          secondMiniCardsColumn.appendChild(miniCardsColumn.childNodes[4])
        }

        if (secondMiniCardsColumn.childNodes.length > 4){
          thirdMiniCardsColumn.appendChild(secondMiniCardsColumn.childNodes[4])
        }
        console.log(thirdMiniCardsColumn.childNodes.length)
        if (thirdMiniCardsColumn.childNodes.length > 4){
          miniCardsColumn.appendChild(thirdMiniCardsColumn.childNodes[4])
        }
          
        ////////APPEND INFO TO CARDS\\\\\\\\\\
        parentContainer.appendChild(cardRow)
        card.appendChild(cardTitle)
        card.appendChild(cardImage)
        card.appendChild(foodName)
        card.appendChild(dateOnCard)
        card.appendChild(startTime)
        card.appendChild(endTime)
        card.appendChild(location)
        cardImage.appendChild(imgSrc)

        ////FIELDS FOR MINI CARDS\\\\
        cardTitle.innerText = posts.eventName
        imgSrc.src = posts.imageUrl
        foodName.innerText = posts.foodName

        card.addEventListener('click', (ev) => {

          while(cardCol.hasChildNodes()){
            cardCol.firstChild.childNodes[3].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[4].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[5].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[6].setAttribute('style', 'display:none');
            miniCardsColumn.appendChild(cardCol.firstChild)
            secondMiniCardsColumn.appendChild(miniCardsColumn.firstChild)
            thirdMiniCardsColumn.appendChild(secondMiniCardsColumn.firstChild)
          }

          if (ev) {
            cardRow.appendChild(cardCol)
            cardCol.appendChild(card)
            cardCol.firstChild.childNodes[3].setAttribute('style', 'display:inline');
            cardCol.firstChild.childNodes[4].setAttribute('style', 'display:inline');
            cardCol.firstChild.childNodes[5].setAttribute('style', 'display:inline');
            cardCol.firstChild.childNodes[6].setAttribute('style', 'display:inline');
            dateOnCard.innerText = dayOfWeek + ' ' + month + ', ' + numberDate
            startTime.innerText = 'Starts At: ' + posts.startTime
            endTime.innerText = 'Ends At: ' + posts.endTime
            location.innerText = posts.address + ', ' + posts.city + ', ' + posts.state + ', ' + posts.zipcode
          } else {
            alert(`That didn't work for some reason`)
          }
        })
      })
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    })
}

//////////// DELETE THIS RECORD! \\\\\\\\\\\\\\\\
function deletePost() {
  del_button.addEventListener('click', (ev) => {
    ev.preventDefault()
    //write better alerts for comfirm on foodseen
    if (confirm('Are you sure you want to delete this post?')) {
      axios.delete(`/posts/${posts.id}`)
        .then((res) => {
          console.log(`deleted`)
          ev.target.parentElement.parentElement.remove()
          alert(`Deleted!`)
        })
        .catch((err) => {
          //better error handling
          console.log(err)
        })
    } else {
      alert('Delete avoided!')
    }
  })
}


function getAllTags() {
  let tagsArray = []
  axios.get('/tags')
    .then((tags) => {
      tags.data.forEach((tag) => {
        tagsArray.push(tag)
      })
      console.log('tags:', tagsArray)
    })
}

//event listener on create btn that does an axios call to get total # of 
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
    let newZip = e.target.elements[8].value
    let newCountry = e.target.elements[9].value
    let newImageUrl = e.target.elements[10].value
    let newStartTime = e.target.elements[2].value
    let newEndTime = e.target.elements[3].value
    let newDate = e.target.elements[4].value
    let newTags = e.target.elements[11].value
    console.log('newTags:', newTags)
    // e.target.elements[11].getAttribute('name')
    let newPromoted = document.getElementById('tagCheckbox').checked

    let newPostObj = {
      // id: postId.length + 1
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

    //logic to have a promoted login
    // if (newPromoted === true) {
    //   alert('Please login with your promoter code to enable promotion ________')
    // }

    console.log('post object:', newPostObj)
    // axios.post that data to the correct backend route
    axios.post('/posts', newPostObj)
      .then((res) => {
        console.log('create post res:', res)
        if (res) {
          alert(`Created New Event!`)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    axios.post('/posts_tags')
    alert('Check your console logs!')
  })
}