(function(){
  // const dataUrl = '/movies.json'
  const BASE_URL = 'http://localhost:3000'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const dataSet = []
  let showDataList = []
  const searchBtn =  document.getElementById('submit-search')
  const searchInput =document.getElementById('search')
  let showData = document.getElementById('showData')
  const paginateUl =document.getElementById('pagination')
  axios.get(INDEX_URL).then((response)=>{
    dataSet.push(...response.data.results)
    console.dir(dataSet)
    // showDataList = dataSet.slice(0,10)
    showDataList = paging(dataSet,1)
    printMovieList()
    renderPaginate()
  }).catch((err)=> console.log(err)) 
  // })

  //add event listener ===>
  // binding favorite list event
  showData.addEventListener('click',(e)=>{
    // console.dir(e)
    if(e.target.className =='btn btn-info save-local'){
      saveLocal(e.target.dataset.index)
    }else if(e.target.className == 'btn btn-primary btn-show-movie'){
      console.log(e.target.dataset.id)
      showMovie(e.target.dataset.id)
    }
  })
  searchBtn.addEventListener('click', e=>{
    e.preventDefault()
    // console.log(searchInput.value)
    const regex = RegExp(searchInput.value,'gi')
    showDataList = dataSet.filter(
      // item=>item.title==searchInput.value
      item =>{
        return item.title.match(regex)
      }
    )
    // array filter(match( regx))
    printMovieList()
  })
  paginateUl.addEventListener('click', e=>{
    // console.log(e.target.tagName)
    if(e.target.tagName == "A"){
      console.log(e.target.dataset.page)
      showDataList = paging(dataSet,e.target.dataset.page)
      printMovieList()
    }
  })


  function printMovieList(){
    let showContent =''
    console.log('printMovieList')
    console.log(showDataList)
    if(showDataList.length>0){
      console.log('printMovieList1')
      showDataList.forEach((item,index)=>{
        showContent += createCard(item,index)
      })
    }
    // console.log(showContent)
    showData.innerHTML=showContent  
    
  }
  function createCard(data,index){
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

  function saveLocal(index){
    if(!(index||index ===0)) return
    const dataStorage = JSON.parse(localStorage.getItem('favoriteMovie'))||[]
    const obj = showDataList[index]
    console.log(obj)
    //console.dir(e.parentNode)
    if(!dataStorage.some(item=> item.id==showDataList[index].id)) dataStorage.push(obj)
    // console.log(dataStorage)
    localStorage.setItem('favoriteMovie',JSON.stringify(dataStorage))
  }

  function renderPaginate(){
    let pagesCount = Math.ceil(dataSet.length / 10)
    console.log("page "+pagesCount)
    let pagelist = ""
    for( let i = 0; i<pagesCount ; i++){
      let content = `<li class="page-item"><a class="page-link" href="javascript:;" data-page="${i+1}">${i+1}</a></li>`
      pagelist += content
    }
    paginateUl.innerHTML = pagelist
  }

  // function pageTo(pageNumber){

  // }
  function paging(itemList, pageNum){
    let pages = Math.ceil(itemList.length / 10)
    if(pageNum > pages) return []
    return itemList.slice((pageNum-1)*10,pageNum*10)
  }

  
})();