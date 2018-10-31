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
  axios.get('heroku address/users')
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

let cardCol = document.createElement('div')
cardCol.className = 'col s7 offset-s3'
let cardRow = document.createElement('div')
cardRow.className = 'row'

////////////get posts\\\\\\\\\\
function getPosts() {
  axios.get('https://food-seen.herokuapp.com/posts')
    .then((res) => {
      // handle success
      res.data.forEach((posts) => {
        ////////////set data into cards\\\\\\\\\\\\
        
        ///////////////GENERATE CARDS\\\\\\\\\\\\\\
        let parentContainer = document.getElementById('parentContainer')
        let miniCardsColumn = document.getElementById('miniCards')
        
        let card = document.createElement('div')
        card.className = 'card hoverable'
        let cardTitle = document.createElement('span')
        cardTitle.className = 'grey-text text-darken-4'
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
        

        /////////Generate info for cards and append Elements\\\\\\\\\\
        cardTitle.innerText = posts.eventName
        imgSrc.src = posts.imageUrl
        foodName.innerText = posts.foodName

        parentContainer.appendChild(cardRow)

        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        cardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)

        
        card.appendChild(cardTitle)
        card.appendChild(cardImage)
        card.appendChild(foodName)
        card.appendChild(dateOnCard)
        card.appendChild(startTime)
        card.appendChild(endTime)
        card.appendChild(location)
        cardImage.appendChild(imgSrc)


        card.addEventListener('click', (ev) => {
          if (ev) {
            parentContainer.appendChild(cardCol)
            cardCol.appendChild(card)
            dateOnCard.innerText = dayOfWeek + ' ' + month + ', ' + numberDate
            startTime.innerText = 'Starts At: ' + posts.startTime
            endTime.innerText = 'Ends At: ' + posts.endTime
            location.innerText = posts.address + ', ' + posts.city + ', ' + posts.zipcode
          //populate the fields on the bigCard here 
          //and maybe (once it works) the eventListener can even change to a "mouseOver" or "onFocus" to smooth out the transition
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
      axios.delete(`heroku app/posts/${posts.id}`)
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
  axios.get('https://food-seen.herokuapp.com/tags')
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
    axios.post('https://food-seen.herokuapp.com/posts', newPostObj)
      .then((res) => {
        console.log('create post res:', res)
        if (res) {
          alert(`Created New Event!`)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    axios.post('https://food-seen.herokuapp.com/posts_tags')
    alert('Check your console logs!')
  })
}