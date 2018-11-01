var token = document.location.href.split('#')[1]
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")

  //materialize stuff
  M.AutoInit()
  getPosts()
  //general function calls
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
cardCol.className = 'col s6 pull-s3 card mainCard'

////////////get posts\\\\\\\\\\
function getPosts() {
  axios.get('https://food-seen.herokuapp.com/posts')
    .then((res) => {
      // console.log('res in main post:', res)

      // handle success
      res.data.forEach((posts) => {
        var tagPostId = posts.id
        ////////////set data into cards\\\\\\\\\\\\

        ///////////////GENERATE CARDS\\\\\\\\\\\\\\
        let parentContainer = document.getElementById('parentContainer')
        let cardRow = document.createElement('div')
        cardRow.className = 'row'
        let cardCol = document.createElement('div')
        cardCol.className = 'col s7'
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
        let month = newDate.slice(1, 2)
        let numberDate = newDate.slice(2)
        // console.log(numberDate)


        ///////MINI CARDS\\\\\\
        let miniCardsColumn = document.getElementById('miniCards')
        let secondMiniCardsColumn = document.getElementById('miniCards2')
        let thirdMiniCardsColumn = document.getElementById('miniCards3')

        cardRow.appendChild(thirdMiniCardsColumn)
        cardRow.appendChild(secondMiniCardsColumn)
        cardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)
        cardRow.appendChild(cardCol)

        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        if (miniCardsColumn.childNodes.length > 4) {
          secondMiniCardsColumn.appendChild(miniCardsColumn.childNodes[4])
        }

        if (secondMiniCardsColumn.childNodes.length > 4) {
          thirdMiniCardsColumn.appendChild(secondMiniCardsColumn.childNodes[4])
        }
        if (thirdMiniCardsColumn.childNodes.length > 4) {
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

        ////tags for posts\\\\
        let tags = document.createElement('div')
        tags.innerHTML += "<br>"
        card.appendChild(tags)
        axios.get(`/tags_posts/${tagPostId}`)
          .then((res) => {
            let tagsArray = res.data
            tagsArray.forEach((post) => {
              let newTag = document.createElement('span')
              newTag.className = "cardTags"
              newTag.innerText = post.name
              tags.appendChild(newTag)
            })
            tags.style.display = "none"
          })

        ////FIELDS FOR CARDS\\\\
        cardTitle.innerText = posts.eventName
        imgSrc.src = posts.imageUrl
        foodName.innerText = posts.foodName
        dateOnCard.innerText = dayOfWeek + ' ' + month + ', ' + numberDate
        startTime.innerText = 'Starts At: ' + posts.startTime
        endTime.innerText = 'Ends At: ' + posts.endTime
        location.innerText = posts.address + ', ' + posts.city + ', ' + posts.state + ', ' + posts.zipcode

        dateOnCard.style.display = 'none'
        startTime.style.display = 'none'
        endTime.style.display = 'none'
        location.style.display = 'none'


        card.addEventListener('click', (ev) => {
          // console.log(typeof ev)
          if (ev && ev.target.className === "card hoverable") {


            cardCol.innerHTML = ev.target.innerHTML
            console.log(cardCol.childNodes)
            let myStuff = cardCol.childNodes
            myStuff.forEach(ele => {
              ele.setAttribute('style', 'display:inline')
            })

          } else {
            // alert(`That didn't work for some reason`)
            if (ev.target.parentNode.className !== "card-image") {
              cardCol.innerHTML = ev.target.parentNode.innerHTML
              console.log(cardCol.childNodes)
              let myStuff = cardCol.childNodes
              myStuff.forEach(ele => {
                ele.setAttribute('style', 'display:inline')
              })
            } else {
              cardCol.innerHTML = ev.target.parentNode.parentNode.innerHTML
              // console.log(cardCol.childNodes)
              console.log(ev.target.parentNode.parentNode)
              let myStuff = cardCol.childNodes
              myStuff.forEach(ele => {
                ele.setAttribute('style', 'display:inline')
              })
            }
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
}


//error handler - - change message text input for situation
function errorMessageFunction(messageText) {
  setTimeout(() => {
    errorMessage.style.display = "inline"
    errorMessage.innerText = messageText

  }, 500)
  errorMessage.style.animation = "fade-out 5s linear 1 forwards"
}