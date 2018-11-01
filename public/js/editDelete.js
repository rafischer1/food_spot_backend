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