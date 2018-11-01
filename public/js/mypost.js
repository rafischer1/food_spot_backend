// var token = document.location.href.split('#')[1]
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")

  //materialize stuff
  M.AutoInit()
  // getPosts()
  //general function calls
  let myCookie = document.cookie
  if (myCookie == '') {

  } else {
    console.log('hi')
    populateMyPosts()
  }

})

let mycardRow = document.createElement('div')
mycardRow.className = 'row'
mycardRow.id = 'myaddtome'
let mycardCol = document.createElement('div')
mycardCol.id = 'mypostsmain'
mycardCol.className = 'col s6 pull-s3 card mainCard'

function editFunction(id) {
  console.log('editfunciton')
  console.log(id)
  modalFunction(id)
  //CODE TO PUT EDIT THINGY HERE
  // showEdit()
}

function deleteFunction(id){
  if (confirm('Are you sure you want to delete this post?')) {
      axios.delete(`https://food-seen.herokuapp.com/posts/${id}`)
        .then((res) => {
          console.log(`deleted`)
          // ev.target.parentElement.parentElement.remove()
          alert(`Deleted Event!`)
        })
        .catch((err) => {
          //better error handling
          console.log(err)
        })
    } else {
      alert('Delete avoided!')
    }
}

// populateMyPosts
function populateMyPosts() {
  axios.get('/posts/1')
    .then((res) => {
      console.log('in .then of ax.get')
      console.log(res.data)
      res.data.forEach((posts) => {
        var tagPostId = posts.id
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

        //EDIT \\\\\\\\\\
        let edit = document.createElement('a')
        edit.className = "editBtn modal-trigger"
        edit.href="#editModal"
        edit.innerText = "EDIT"
        edit.innerHTML = `<i class="material-icons" data-id=${posts.id}>edit</i>`
        edit.setAttribute('data-id', posts.id)
        edit.className = "editButton modal-trigger"
        edit.setAttribute('data-target', 'editModal')
        edit.setAttribute('name', 'Edit')
        edit.setAttribute('onclick', `editFunction(${edit.getAttribute('data-id')})`)

        /////// DELETE \\\\\\\\
        let del = document.createElement('a')
        del.href="#"
        del.innerHTML = `<i class="material-icons" data-id=${posts.id}>delete_forever</i>`
        del.setAttribute('data-id', posts.id)
        del.setAttribute('onclick', `deleteFunction(${del.getAttribute('data-id')})`)


        ///////MINI CARDS\\\\\\
        let parentContainer = document.getElementById('myPostsContainer')
        let miniCardsColumn = document.getElementById('myMiniCards')
        let secondMiniCardsColumn = document.getElementById('myMiniCards2')
        let thirdMiniCardsColumn = document.getElementById('myMiniCards3')

        mycardRow.appendChild(thirdMiniCardsColumn)
        mycardRow.appendChild(secondMiniCardsColumn)
        mycardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)
        mycardRow.appendChild(mycardCol)

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
        parentContainer.appendChild(mycardRow)
        card.appendChild(cardTitle)
        // card.innerHTML += "&nbsp; &nbsp;"
        card.appendChild(edit)
        card.appendChild(del)
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
        axios.get(`https://food-seen.herokuapp.com/tags_posts/${tagPostId}`)
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
        cardTitle.innerText = `  ${posts.eventName}  `
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
        edit.style.display = "none"
        del.style.display = "none"
        tags.style.display = "none"


        card.addEventListener('click', (ev) => {
          // console.log(typeof ev)
          if (ev && ev.target.className === "card hoverable") {

            mycardCol.innerHTML = ev.target.innerHTML

            // console.log(mycardCol.childNodes)
            let myStuff = mycardCol.childNodes
            myStuff.forEach(ele => {
              ele.setAttribute('style', 'display:inline')
            })
          } else {
            // alert(`That didn't work for some reason`)
            if (ev.target.parentNode.className !== "card-image") {
              mycardCol.innerHTML = ev.target.parentNode.innerHTML
              // console.log(mycardCol.childNodes)
              let myStuff = mycardCol.childNodes
              myStuff.forEach(ele => {
                ele.setAttribute('style', 'display:inline')
              })
            } else {
              mycardCol.innerHTML = ev.target.parentNode.parentNode.innerHTML
              // console.log(cardCol.childNodes)
              // console.log(ev.target.parentNode.parentNode)
              let myStuff = mycardCol.childNodes
              myStuff.forEach(ele => {
                ele.setAttribute('style', 'display:inline')
              })
            }
          }
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
////////////get posts\\\\\\\\\\
