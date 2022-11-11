let key ="7965faed";

const input = document.querySelector("#input");
const button = document.querySelector("#button");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");


let value = "";
let pagenr = 1;

// input.addEventListener("input", (e)=>{

//     value = input.value;

//     e.preventDefault();
// });

button.addEventListener("click", () =>{
    value = input.value;
    pagenr = 1;
    getMovie(value,pagenr);
    e.preventDefault();
});

input.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) button.click();
});

async function getMovie(value,pagenr){

    if(value ==="") return;
    const data = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${value}&page=${pagenr}`);
    document.querySelector(".display").innerHTML ="";
    
    const result = await data.json();
    result.Search.forEach((item) => {
        let moviediv = document.createElement("div");
        moviediv.classList.add("movie");
        let poster = document.createElement("div");
        poster.classList.add("poster");
        let img = document.createElement("img");
        img.src=`${item.poster}` === "N/A" ?(img.src="./img/indir.png"): `${item.Poster}`;
        poster.appendChild(img);
        moviediv.appendChild(poster);

        let description = document.createElement("div");
        description.classList.add("description");
        description.innerHTML = `Title: ${item.Title}<br></br>Year: ${item.Year}<br></br> <a href=http://www.imdb.com/title/${item.imdbID}> IMDB : http://www.imdb.com/title/${item.imdbID}</a>`;

        moviediv.appendChild(description);

        document.querySelector(".display").appendChild(moviediv);
        

    });

    next.classList.add("visible");
    previous.classList.add("visible");
};

next.addEventListener("click", () =>{
    if ( value === "") return;
    pagenr++;
    getMovie(value,pagenr);
});

previous.addEventListener("click", () =>{
    if ( value === "") return;
    if ( pagenr === 1) return;
    pagenr--;
    getMovie(value,pagenr);
});