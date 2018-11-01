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
  //need to grab id from somewhere
  let id = ev.target.getAttribute('post_id')
  //put the modal class on the edit buttons
  let openModal = document.querySelectorAll('.modal')
  let instance = M.Modal.init(openModal)

  //axios get call by id to populate modal\\
  axios.get(`https://food-seen.herokuapp.com/posts/${id}`)
    .then((post) => {
      let formEventName = document.getElementById('editEvent_name"')
      let formFoodname = document.getElementById('editFoodName')
      let formDate = document.getElementById('editDate')
      let formStartTime = document.getElementById('editStartTime')
      let formEndTime = document.getElementById('editEndTime')
      let formAddress = document.getElementById('editAddress')
      let formCity = document.getElementById('editCity')
      let formState = document.getElementById('editState')
      let formZipcode = document.getElementById('editZip')
      let formCountry = document.getElementById('editCountry')
      let formImgUrl = document.getElementById('editUrl')
      //tags and promoted cannot be edited!

      formEventName.innerText = post.data[0].eventName
      formFoodname.innerText = post.data[0].foodName
      formDate.value = post.data[0].date
      formStartTime.value = post.data[0].startTime
      formEndTime.value = post.data[0].endTime
      formAddress.innerText = post.data[0].address
      formCity.innerText = post.data[0].city
      formState.value = post.data[0].state
      formZipcode.innerText = post.data[0].zipcode
      formCountry.innerText = post.data[0].country
      formImgUrl.innerText = post.data[0].imageUrl

      let modalEventID = post.data[0].id

      //submit btn on modal
      let modalSubmit = document.getElementById('modalSubmit')
      modalSubmit.addEventListener('submit', (ev) => {
        ev.preventDefault()

        /////grab all values from the form\\\
        let putData = {}
        let formElements = ev.target.elements
        if (formElements[0].value) {
          putData.eventName = formElements[0].value
        }
        if (formElements[1].value) {
          putData.foodName = formElements[1].value
        }
        if (formElements[2].value) {
          putData.date =
            formElements[2].value
        }
        if (formElements[3].value) {
          putData.startTime =
            formElements[3].value
        }
        if (formElements[4].value) {
          putData.endTime =
            formElements[4].value
        }
        if (formElements[5].value) {
          putData.address =
            formElements[5].value
        }
        if (formElements[6].value) {
          putData.city =
            formElements[6].value
        }
        if (formElements[7].value) {
          putData.state =
            formElements[7].value
        }
        if (formElements[9].value) {
          putData.zipcode =
            formElements[9].value
        }
        if (formElements[10].value) {
          putData.country =
            formElements[10].value
        }
        if (formElements[11].value) {
          putData.imageUrl =
            formElements[11].value
        }
        putData.id = modalEventID

        ////axios put call to update entry\\\\
        axios.put(`https://food-seen.herokuapp.com/posts/${modalEventID}`, putData)
          .then((response) => {
            if (response) {
              alert(`Update complete!`)
              ////window reload - not a great solution but works!\\\\
              // location.reload()
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