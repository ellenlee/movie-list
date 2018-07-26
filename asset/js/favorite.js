const dataSet = JSON.parse(localStorage.getItem('favoriteMovie'))||[]
const showData = document.getElementById('showData')
console.log(dataSet)

printDataList(dataSet,createFavoriteCard)
// printFavoriteList()
// function printFavoriteList(){
//   let showContent =''
//   if(dataSet.length>0){
//     dataSet.forEach((item,index)=>{
//       showContent += createCard(item,index)
//     })
//   }
//   showData.innerHTML=showContent  
// }

// showData.addEventListener('click',(e)=>{
//   console.dir(e)
//   if(e.target.dataset.index != null){
//     deleteItem(e.target.dataset.index)
//   }
// })


function createFavoriteCard(data,index){
  console.log(data)
  return `
    <div class="col-sm-3">
      <div class="card mb-2">
        <img class="card-img-top" src=" ${POSTER_URL}${data.image}" alt="Card image cap">
        <div class="card-body movie-item-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.description}</p>
        </div>
        <div class="card-footer">
          <a href="javascript:;" class="btn btn-primary">Go somewhere</a>
          <div class="btn btn-info btn-delete-local" data-id="${data.id}"  data-index="${index}" >X</div>
        </div>
      </div>
    </div>
  `
}
