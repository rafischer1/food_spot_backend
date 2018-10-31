var token = document.location.href.split('#')[1]
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")

  //materialize stuff
  M.AutoInit()
  getPosts()
  // setCookie()
  //general function calls

})


let cardRow = document.createElement('div')
cardRow.className = 'row'
let cardCol = document.createElement('div')
cardCol.className = 'col s7'

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


        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        cardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)

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
        console.log('res.data.id:', res.data.id)
        axios.get(`/tags_posts/${res.data.id}`)
          .then((res) => {
            console.log('in the tagsposts res:', res)
          })
        // card.appendChild('tags')


        cardTitle.innerText = posts.eventName
        imgSrc.src = posts.imageUrl
        foodName.innerText = posts.foodName

        card.addEventListener('click', (ev) => {

          while (cardCol.hasChildNodes()) {
            console.log(cardCol.firstChild.childNodes)
            cardCol.firstChild.childNodes[3].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[4].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[5].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[6].setAttribute('style', 'display:none');
            miniCardsColumn.appendChild(cardCol.firstChild)
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









/////////COOKIE FUNCTIONS!!!!\\\\\\\\\

let myCookie = document.cookie
console.log('cookie: ', myCookie)
let signInBtn = document.getElementById('signInBtn')
let createBtn = document.getElementById('createBtn')

if (myCookie == '') {
  // console.log('nocookie')
  signInBtn.setAttribute("style", "display:inline");
  createBtn.setAttribute("style", "display:none");
} else {
  createBtn.setAttribute("style", "display:inline");
  signInBtn.setAttribute("style", "display:none");
}

function setCookie() {
  document.cookie = `token=${token}`
}

function getCookie() {
  let x = document.cookie
  console.log(x)
}