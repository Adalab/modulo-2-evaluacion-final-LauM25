'use strict';

console.log('>> Ready for the second exam :) / :(');

/*
ENUNCIADO
-Desarrollar un aplicación web de busqueda de series de anime que nos permite marcar y desmarcar las series favoritas y guardarlas en local Storage.
-Api: https://api.jikan.moe/v4/anime?q=naruto
Pasos en humano
Seleccionar el input donde la usuaria va a escribir
Seleccionar el boton donde la usuaria va a hacer click
Seleccionar el div donde se va a mostar el resultado y donde se va a mostrar los favoritos.

Cuando la usuaria haga click 
    almacenar el valor del input para poder poner buscarlo
    hay que unificar la api con una constante que sea el valor del input y concatenarlo con la api para que así busque la serie
    almacenar la imagen
    almacenar el titulo y mostrarlo en pantalla en el div de resultado concatenando las constantes de imagen y titulo (primero hay que pasarle los valores)

*/

const btnSearch = document.querySelector(".js-btnSearch");
const inputSearch = document.querySelector(".js-input");
const sectionResult = document.querySelector(".js-sectionResult");
const sectionFav = document.querySelector(".js-sectionFav");
let favoritesSeries = []

function renderInfo(seriesArray) {
    for (const serie of seriesArray) {
        sectionResult.innerHTML += `<div class="container-info">
        <img class="imgResult" src="${serie.images.jpg.image_url}" alt:"Imagen serie anime"></img>
        <p>Titulo: ${serie.title}</p>
        </div>`
        //console.log(serie.images.jpg.image_url)
    }

}





function takeTitle(title) {
    const localStorageSeries = JSON.parse(localStorage.getItem("series"));
    console.log("Esto es el localStorage" + localStorageSeries)
    if (localStorageSeries !== null) {
        renderInfo(localStorageSeries);
    } else {
        fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
            .then((response) => response.json())
            .then((response) => {
                const series = response.data;
                //console.log(series)
                localStorage.setItem("series", JSON.stringify(series)); // guarda las series en el navegador
                renderInfo(series);
            })
    }

}

function handleClick(ev) {
    ev.preventDefault()
    //console.log("Ha hecho click")
    const inputValue = inputSearch.value;
    //console.log(inputValue);
    takeTitle(inputValue);

}

btnSearch.addEventListener("click", handleClick);

//Parte dos

//Obtener información del localStorage
