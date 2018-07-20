// Fetches posts list from json placeholder
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  return posts.slice(0, 5)
}