const getAll = (limit) => {
  return limit ? posts_tags.slice(0, limit) : posts_tags
}
module.exports = { getAll }