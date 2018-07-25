const showmovie = function(movieId){
  const modalTitle = document.getElementById('show-movie-title')
  const modalBody = document.getElementById('show-movie-body')
  const modalImage = document.getElementById('show-movie-image')
  const modalDate = document.getElementById('show-movie-date')
  const modalDescription = document.getElementById('show-movie-description')
  const url = INDEX_URL + movieId
  console.log(url)
  axios.get(url).then( response => {
      const data = response.data.results
      console.log(data)
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`

    })
}