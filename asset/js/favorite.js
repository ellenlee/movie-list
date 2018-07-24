const dataSet = JSON.parse(localStorage.getItem('favoriteMovie'))||[]
const showData = document.getElementById('showData')

printFavoriteList()
function printFavoriteList(){
  let showContent =''
  if(dataSet.length>0){
    dataSet.forEach((item,index)=>{
      showContent += createCard(item,index)
    })
  }
  showData.innerHTML=showContent  
}

showData.addEventListener('click',(e)=>{
  console.dir(e)
  if(e.target.dataset.index != null){
    deleteItem(e.target.dataset.index)
  }
})


function createCard(data,index){
  return `
    <div class="col-sm-3">
      <div class="card mb-2">
        <img class="card-img-top" src="  /asset/imgs/${data.image}" alt="Card image cap">
        <div class="card-body movie-item-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.description}</p>
        </div>
        <div class="card-footer">
          <a href="javascript:;" class="btn btn-primary">Go somewhere</a>
          <div class="btn btn-info delete-local" data-id="${data.id}"  data-index="${index}" >X</div>
        </div>
      </div>
    </div>
  `
}
function deleteItem(dataIndex){
  console.log(dataIndex)
  if(!dataIndex) return
  dataSet.splice(dataIndex,1)
  console.dir(dataSet)
  localStorage.setItem('favoriteMovie',JSON.stringify(dataSet))
  printFavoriteList()
  //console.dir(e.parentNode)
  // if(!dataStorage.some(item=> item._id==dataId)) dataStorage.push(obj)
  // console.log(dataStorage)
  // localStorage.setItem('favoriteMovie',JSON.stringify(dataStorage))
}