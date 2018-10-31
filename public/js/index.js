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
      console.log('res in main post:', res)

      // handle success
      res.data.forEach((posts) => {
        var tagPostId = posts.id
        ////////////set data into cards\\\\\\\\\\\\

        ///////////////GENERATE CARDS\\\\\\\\\\\\\\
        let parentContainer = document.getElementById('parentContainer')
        let miniCardsColumn = document.getElementById('miniCards')
        let secondMiniCardsColumn = document.getElementById('miniCards2')
        let cardRow = document.createElement('div')
        cardRow.className = 'row'
        let cardCol = document.createElement('div')
        cardCol.className = 'col s7'
        let card = document.createElement('div')
        card.className = 'card hoverable mainCard'
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

        ///////MINI CARDS\\\\\\    
        cardRow.appendChild(miniCardsColumn)
        cardRow.appendChild(secondMiniCardsColumn)
        miniCardsColumn.appendChild(card)

        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        if (miniCardsColumn.childNodes.length > 4) {
          secondMiniCardsColumn.appendChild(miniCardsColumn.childNodes[4])
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

        cardTitle.innerText = posts.eventName
        imgSrc.src = posts.imageUrl
        foodName.innerText = posts.foodName

        card.addEventListener('click', (ev) => {


          while (cardCol.hasChildNodes()) {
            cardCol.firstChild.childNodes[3].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[4].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[5].setAttribute('style', 'display:none');
            cardCol.firstChild.childNodes[6].setAttribute('style', 'display:none');
            miniCardsColumn.appendChild(cardCol.firstChild)
            tags.style.display = "none"
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
            tags.style.display = "inline"
          } else {
            alert(`That didn't work for some reason`)
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
}