const searchValue = document.getElementById('search-value');
const movieDisplay = document.getElementById('movie-display');
const searchedValue =[];


//Search Button event listener
document.getElementById('search-btn')
    .addEventListener('click', searchData);

searchValue.addEventListener("keydown", (event) => {
    if(event.key === "Enter") searchData()
})

//Taking user's input data result from API
async function searchData(){

    try{
        const res = await fetch(`http://www.omdbapi.com/?s=${searchValue.value}&plot=full&v=1&apikey=d62f3299`);
        const data = await res.json();

        if(data.Response === "False") throw "Movie not found!";
        searchArrayId(data.Search);
    }

    catch(error){
        movieDisplay.innerHTML = `<h1 class="main-start-text">${error}<h1>`;
        console.log(error);
    }
}

//Rendering Data To Dom
function searchArrayId(ids){
    movieDisplay.innerHTML = '';

    //Iterating all id in ids array using map
    ids.map(async function (id) {

    const res = await fetch(`http://www.omdbapi.com/?&i=${id.imdbID}&apikey=d62f3299`);
    const data = await res.json();
            
    //Rendering Html
    movieDisplay.innerHTML +=`
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
                <img class="add-icon" src="images/Icon.png">
                <button class="watchlist-btn" id="${data.imdbID}">Watchlist</button>
            </div>
            <br>
            <p class="movie-des-plot">${data.Plot}</p>
            </div>
        </div>
        <hr>
        `
    buttonEvent(data);
    });
}; 

//Adding eventlistener to buttons
function buttonEvent(data){
    searchedValue.push(data.imdbID);
    if(searchedValue.length === 10){
        searchedValue.map(element => {
            const currentEl = document.getElementById(`${element}`)
            currentEl.addEventListener('click',() =>{ 
                
                localStoring(`${element}`,`${searchedValue.indexOf(element)}`)
                currentEl.innerHTML = "Added";
                currentEl.classList.add('added-btn');
            });
        });
    };
};

// Setting WhatchList Movies to LocalStorage
function localStoring(key,value){
    localStorage.setItem(key,value);
    console.log(localStorage)
}

