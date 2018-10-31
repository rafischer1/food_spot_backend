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