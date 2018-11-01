const getAllPostsByUser = () => {
  axios.get(`posts/${user_id}`)
    .then((res) => {
      /////generate the cards with buttons\\\\
      divCard.appendChild(del_button)
      del_button.innerText = "Delete Post"
      del_button.setAttribute('data-id', posts.id)
      del_button.className = "delBtn"
      divCard.appendChild(editBtn)
      editBtn.setAttribute('postID', posts.id)
      editBtn.setAttribute('data-target', 'modal1')
      editBtn.setAttribute('name', 'Edit')
      editBtn.className = "editBtn modal-trigger"
      editBtn.innerText = "Edit Post"
    })
}


const editPost = () => {
  console.log('editPost!')
  //axios get call by id to populate modal\\
  axios.get(`/posts/${id}`)
    .then((post) => {
      let formTitle = document.getElementById('formTitle')
      let modalTitle = document.getElementById('modalTitle')
      let modalContent = document.getElementById('modalContent')
      let modalPhoto = document.getElementById('modalPhoto')
      formTitle.innerText = post.data[0].title
      modalTitle.value = post.data[0].title
      modalContent.value = post.data[0].content
      modalPhoto.value = post.data[0].photo
      let modalpostID = post.data[0].id

      let modalFormSubmit = document.getElementById('modalFormSubmit')

      console.log('before submit')
      //modalForm submit event listener
      modalFormSubmit.addEventListener('submit', (ev) => {
        ev.preventDefault()
        console.log('after submit')
        /////grab all values from the form\\\

        let editPostData = {}
        let formElements = ev.target.elements
        console.log('put data elements;', ev.target.elements)
        if (formElements[0].value) {
          editPostData.eventName = formElements[0].value
        }
        if (formElements[1].value) {
          editPostData.foodName = formElements[1].value
        }
        if (formElements[2].value) {
          editPostData.photo =
            formElements[2].value
        }
        editPostData.id = modalpostID

        ////axios put call to update entry\\\\
        axios.put(`https://secret-savannah-43473.herokuapp.com/posts/${modalpostID}`, editPostData)
          .then((response) => {
            if (response) {
              alert(`Update complete!`)
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


let deleteBtn = document.querySelector('deleteBtn')
//////////// DELETE THIS RECORD! \\\\\\\\\\\\\\\\
function deletePost() {
  deleteBtn.addEventListener('click', (ev) => {
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