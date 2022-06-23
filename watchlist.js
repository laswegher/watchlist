















const watchlistHtml = document.getElementById('watchlist-html');


if(localStorage.length > 0){
    getLocal()
}


async function getLocal(){
    watchlistHtml.innerHTML = "" ;
    for(let i=0; i<localStorage.length; i++){
    
    const res = await fetch(`http://www.omdbapi.com/?&i=${localStorage.key(i)}&apikey=d62f3299`);
    const data = await res.json();

    //Rendering Html
    watchlistHtml.innerHTML +=`
        <div class="movie-des-clm">
        <div class="movie-des-img">
            <img src="${data.Poster}">
        </div>
        <div class="movie-des">
            <div class="d-flex">
                <h2 class="movie-des-title">${data.Title}</h2> 
                <p class="point-star"><img class="icon-sl" src="images/Icon3.png">${data.imdbRating}</p>
            </div>
            <br>
            <div class="movie-des-detail d-flex">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <img class="add-icon" src="images/Icon4.png">
                <button class="remove-btn" id="${data.imdbID}">Remove</button>
            </div>
            <br>
            <p class="movie-des-plot">${data.Plot}</p>
            </div>
        </div>
        <hr>
        `
        removeListener(localStorage.key(i),localStorage.length)
        
    };

};
let arrays = [];
function removeListener(id,length){
    arrays.push(id);
    if(arrays.length === length){
        arrays.map(id => {
            document.getElementById(`${id}`).addEventListener('click', () => {
                localStorage.removeItem(`${id}`);
                location.reload();
            });
        })
    }
    
};





