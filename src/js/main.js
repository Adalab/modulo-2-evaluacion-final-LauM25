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
const btnReset = document.querySelector(".js-btnReset");
const inputSearch = document.querySelector(".js-input");
const sectionResult = document.querySelector(".js-sectionResult");
const sectionFav = document.querySelector(".js-sectionFav");
let favoritesSeries = []; // Array de series favoritas
let series = []; // Array de resultados obtenidos de la API

const localStorageFavSeries = JSON.parse(localStorage.getItem("favSeries")); // obtener la info del localStorage

if (localStorageFavSeries !== null) { // si el localStorage está lleno, si tiene las series guardadas
    favoritesSeries = localStorageFavSeries
    sectionFav.innerHTML = ""; // Limpiar la sección de favoritos antes de pintar
    for (const serie of localStorageFavSeries) {  // Recorrer cada serie guardada y pintarla
        let content = ""
        content += `
        <div class="js-deletedFavLocal container-infoF container-info-fav" id="${serie.mal_id}">
            <div class="delete js-delete">
                    <i class="fa-solid fa-x"></i>
            </div>
            <img class="imgResult" src="${serie.images.jpg.image_url}" alt:"Imagen serie anime"></img>
            <p>Titulo: ${serie.title}</p>
            <p>Puntuación : ${serie.score} </p>
        </div>
        `
        sectionFav.innerHTML += content;
    }
    // Añadir evento de click a cada favorito para poder eliminarlo
    const deletedFavLocalStorage = document.querySelectorAll(".js-deletedFavLocal");
    for (const fav of deletedFavLocalStorage) {
        fav.addEventListener("click", handleClickRemoveFavLocal);
        console.log("ha hecho click en un fav del LocalStorage")
    }
}




// Función para marcar una serie como favorita
function handleClickfavorite(event) {
    // Saber la serie clickada, necesito coger el atributo id
    const idFavoriteClicked = parseInt(event.currentTarget.id);
    // buscar en mi array de series, la que tenga el id clickado
    const favoriteSelected = series.find((serie) => {
        return idFavoriteClicked === serie.mal_id;

    })
    // añadir la serie a mi lista de series favoritas
    favoritesSeries.push(favoriteSelected);

    // pintar las series favoritas en la sección de favoritas
    sectionFav.innerHTML = "";
    for (const serie of favoritesSeries) {
        let content = ""
        content += `
            <div class="container-infoF container-info-fav" id="${serie.mal_id}"> 
                <div class="delete js-delete">
                    <i class="fa-solid fa-x"></i>
                </div>
                <img class="imgResult" src="${serie.images.jpg.image_url}" alt:"Imagen serie anime"></img>
                <p>Titulo: ${serie.title}</p>
                <p>Puntuación : ${serie.score} </p>
             </div>
            `
        sectionFav.innerHTML += content;
    }
    localStorage.setItem("favSeries", JSON.stringify(favoritesSeries));  // Guardar favoritos actualizados en localStorage
    // Añadir eventos para eliminar favoritos
    const deletedFav = document.querySelectorAll(".container-info-fav");
    for (const fav of deletedFav) {
        fav.addEventListener("click", handleClickRemoveFav);
    }
}

// Función para renderizar los resultados de la API
function renderInfo(seriesArray) {
    sectionResult.innerHTML = ""; // Limpiar resultados anteriores
    console.log(seriesArray)
    // Recorrer y pintar cada serie
    for (const serie of seriesArray) {
        if (serie.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {  // Si la imagen no es válida, se usa un placeholder
            let content = "";
            content += `
        <div class="container-info" id="${serie.mal_id}">
            <i class="fa-solid fa-plus plus"></i>
            <img class="imgResult" src="https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-3.jpg" alt:"Imagen serie anime"></img>
            <p>Titulo: ${serie.title}</p>
            <p>Puntuación : ${serie.score} </p>
        </div>
        `
            sectionResult.innerHTML += content;
        } else {
            let content = "";
            content += `
        <div class="container-info" id="${serie.mal_id}">
            <i class="fa-solid fa-plus plus"></i>
            <img class="imgResult" src="${serie.images.jpg.image_url}" alt:"Imagen serie anime"></img>
            <p>Titulo: ${serie.title}</p>
            <p>Puntuación : ${serie.score} </p>
        </div>
        `
            sectionResult.innerHTML += content; // Agregar al DOM
            //console.log(serie.images.jpg.image_url)
        }

    }
    // escucho el click en cualquiera de las series para poder marcar como favorito
    const favoriteHTML = document.querySelectorAll(".container-info");
    for (const fav of favoriteHTML) {
        fav.addEventListener("click", handleClickfavorite);
    }


}

// Función que hace la llamada a la API con el título dado
function takeTitle(title) {
    fetch(`https://api.jikan.moe/v4/anime?q=${title}`)
        .then((response) => response.json())
        .then((response) => {
            series = response.data; // Guardar los resultados
            renderInfo(series); // Mostrar los resultados
        })
}

// Manejador del click en el botón de búsqueda
function handleClick(ev) {
    ev.preventDefault() // Evitar recarga del formulario
    console.log("Ha hecho click")
    const inputValue = inputSearch.value; // Obtener texto del input
    //console.log(inputValue);
    takeTitle(inputValue);  // Llamar a la API con ese texto

}

btnSearch.addEventListener("click", handleClick); // Añadir el evento al botón de buscar

// Manejador para el botón de reset
function handleClickReset(ev) {
    ev.preventDefault();
    localStorage.clear() // Borrar localStorage
    //console.log("Ha hecho reset")
}

btnReset.addEventListener("click", handleClickReset); // Añadir evento al botón de reset

// Función para eliminar una serie de favoritos (cuando ya se marcó como favorita)
function handleClickRemoveFav(event) {
    const idFavoriteClicked = parseInt(event.currentTarget.id);
    // buscar en mi array de series favoritas
    const removeSelected = favoritesSeries.findIndex((serie) => {
        return idFavoriteClicked === serie.mal_id;
    })
    console.log(removeSelected)
    favoritesSeries.splice(removeSelected, 1); // Eliminar del array
    console.log("ha hecho click")
    console.log(favoritesSeries)

    // Volver a pintar la sección de favoritos
    sectionFav.innerHTML = "";
    for (const serie of favoritesSeries) {
        let content = ""
        content += `
              <div class="container-info-fav container-infoF" id="${serie.mal_id}"> 
                  <div class="delete js-delete">
                      <i class="fa-solid fa-x"></i>
                  </div>
                  <img class="imgResult" src="${serie.images.jpg.image_url}" alt:"Imagen serie anime"></img>
                  <p>Titulo: ${serie.title}</p>
                  <p>Puntuación : ${serie.score} </p>
               </div>
              `
        sectionFav.innerHTML += content;
    }
    localStorage.setItem("favSeries", JSON.stringify(favoritesSeries)); // Actualizar localStorage con la nueva lista de favoritos
}

// Función para eliminar favoritos que vienen directamente del localStorage
function handleClickRemoveFavLocal(event) {
    console.log("ha hecho click en un favorito del LocalStorage que se quiere borrar")
    const idFavoriteLocalClicked = parseInt(event.currentTarget.id);
    // buscar en mi array de series favoritas
    const removeSelected = localStorageFavSeries.findIndex((serie) => {
        return idFavoriteLocalClicked === serie.mal_id;
    })
    console.log(removeSelected)
    localStorageFavSeries.splice(removeSelected, 1);  // Eliminar del array
    sectionFav.innerHTML = ""; // Limpiar sección
    // Volver a pintar los favoritos restantes
    for (const serie of localStorageFavSeries) {
        let content = ""
        content += `
              <div class="container-info-fav container-infoF" id="${serie.mal_id}"> 
                  <div class="delete js-delete">
                      <i class="fa-solid fa-x"></i>
                  </div>
                  <img class="imgResult" src="${serie.images.jpg.image_url}" alt:"Imagen serie anime"></img>
                  <p>Titulo: ${serie.title}</p>
                  <p>Puntuación : ${serie.score} </p>
               </div>
              `
        sectionFav.innerHTML += content;
    }
}