const editPost = () => {
  console.log('editPost!')
}


let deleteBtn = document.querySelector('deleteBtn')
//////////// DELETE THIS RECORD! \\\\\\\\\\\\\\\\
function deletePost() {
  deleteBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    //write better alerts for comfirm on foodseen
    if (confirm('Are you sure you want to delete this post?')) {
      axios.delete(`https://food-seen.herokuapp.com/posts/${posts.id}`)
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
  })
}

function modalFunction(ev) {
  let id = ev.target.getAttribute('movieid')
  let openModal = document.querySelectorAll('.modal')
  let instance = M.Modal.init(openModal)

  //axios get call by id to populate modal\\
  axios.get(`https://fischer-moviedb.herokuapp.com/movies/${id}`)
    .then((movie) => {
      let formTitle = document.getElementById('formTitle')
      let modalTitle = document.getElementById('modalTitle')
      let modalYear = document.getElementById('modalYear')
      let modalPhoto = document.getElementById('modalPhoto')
      formTitle.innerText = movie.data[0].title
      modalTitle.value = movie.data[0].title
      modalPhoto.value = movie.data[0].photo
      modalYear.value = movie.data[0].release_date
      let modalMovieID = movie.data[0].id

      let modalSubmit = document.getElementById('modalSubmit')
      modalSubmit.addEventListener('submit', (ev) => {
        ev.preventDefault()

        /////grab all values from the form\\\
        let putData = {}
        let formElements = ev.target.elements
        if (formElements[0].value) {
          putData.title = formElements[0].value
        }
        if (formElements[1].value) {
          putData.release_date = formElements[1].value
        }
        if (formElements[2].value) {
          putData.photo =
            formElements[2].value
        }
        putData.id = modalMovieID

        ////axios put call to update entry\\\\
        axios.put(`https://fischer-moviedb.herokuapp.com/movies/${modalMovieID}`, putData)
          .then((response) => {
            if (response) {
              alert(`Update complete! “Nothing I have witnessed, from lava to crustacean, assailed me liked the caked debris haunting that small plastic soap hammock in the smaller of the bathrooms. Nausea is not a sufficient word.”―WH`)
              ////window reload - not a great solution but works!\\\\
              location.reload()
            } else {
              alert(`That didn't work for some reason...`)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    })
}