(function(){
  // const dataUrl = '/movies.json'

  const data = []
  // let showDataList = []
  const searchBtn =  document.getElementById('submit-search')
  const searchInput =document.getElementById('search')
  const paginateUl = document.getElementById('pagination')


  axios.get(INDEX_URL).then((response)=>{
    data.push(...response.data.results)
    console.dir(data)
    printDataList(data,createIndexCard)
  }).catch((err)=> console.log(err)) 



  function createIndexCard(data,index){
    return `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${data.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.description}</p>
          </div>
          <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${data.id}">More</button>
          <div class="btn btn-info btn-save-local" data-id="${data.id}" data-index="${index}"  >+</i></div>
          </div>
        </div>
      </div>
    `
  }
})();