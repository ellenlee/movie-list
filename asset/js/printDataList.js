const BASE_URL = 'http://localhost:3000'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

function printDataList(dataList, callback){
  if(dataList.length == 0) return 
  let pages = 1
  const paginateUl =document.getElementById('pagination')
  const dataPanel = document.getElementById('data-panel')
  let currentPage = 1

  // render paginate
  renderPaginate()
  // print page 1
  printPageList(1)

  // add paginate click event
  paginateUl.addEventListener('click', e=>{
    if(e.target.tagName == "A"){
      printPageList(e.target.dataset.page)
    }
  })

  //add show Movie and favorite movie event listener
  dataPanel.addEventListener('click',(e)=>{
    if(e.target.matches('.btn-save-local')){
      saveFavoriteItem(e.target.dataset.index)
      // console.log(e.target)
    }else if(e.target.matches('.btn-show-movie')){
      // console.log(e.target)
      showMovie(e.target.dataset.id)
    }else if(e.target.matches('.btn-delete-local')){
      removeFavoriteItem(e.target.dataset.index)
    }
  })

  function renderPaginate(){
    let liContent = ""
    pages = Math.ceil(dataList.length / 10)
    for( let i = 0; i<pages ; i++){
      liContent += `<li class="page-item"><a class="page-link" href="javascript:;" data-page="${i+1}">${i+1}</a></li>`
    }
    paginateUl.innerHTML = liContent
  }

  function printPageList(pageNum){
    if(pageNum > pages) return 
    currentPage = pageNum
    const ITEM_PER_PAGE = 10
    const offset = (pageNum-1)*ITEM_PER_PAGE
    // pageList = dataList.slice((pageNum-1)*10,pageNum*10)
    pageContent = ""
    for(let i=offset; i<(ITEM_PER_PAGE+offset) && i < dataList.length; i++){
      pageContent += callback(dataList[i], i)
    }
    dataPanel.innerHTML = pageContent
  }
  function removeFavoriteItem(dataIndex){
    console.log(dataIndex)
    if(!dataIndex) return
    dataList.splice(dataIndex,1)
    console.dir(dataList)
    localStorage.setItem('favoriteMovie',JSON.stringify(dataList))
    printPageList(currentPage)
    renderPaginate()
    //console.dir(e.parentNode)
    // if(!dataStorage.some(item=> item._id==dataId)) dataStorage.push(obj)
    // console.log(dataStorage)
    // localStorage.setItem('favoriteMovie',JSON.stringify(dataStorage))
  }

  function saveFavoriteItem(index){
    if(!(index||index ===0)) return
    const dataStorage = JSON.parse(localStorage.getItem('favoriteMovie'))||[]
    const obj = dataList[index]
    console.log(obj)
    //console.dir(e.parentNode)
    if(!dataStorage.some(item=> item.id == dataList[index].id)) dataStorage.push(obj)
    console.log(dataStorage)
    localStorage.setItem('favoriteMovie',JSON.stringify(dataStorage))
  }

  function showMovie(movieId){
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
}

function searchTitle(dataList, title){
  

}