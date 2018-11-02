document.addEventListener('DOMContentLoaded', () => {
  getAllTags()
  setTimeout(function() { confirm("Sign up for foodseen alerts!"); }, 60000);
})

function getAllTags() {
  let marquee = document.getElementById('marquee')
  let tagsArray = []
  axios.get('/tags')
    .then((tags) => {
      tags.data.forEach((tag) => {
        tagsArray.push(tag)
      })
    })
  console.log('tags:', tagsArray)
}