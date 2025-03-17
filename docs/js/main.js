console.log(">> Ready for the second exam :) / :(");const f=document.querySelector(".js-btnSearch"),m=document.querySelector(".js-btnReset"),g=document.querySelector(".js-input"),s=document.querySelector(".js-sectionResult"),a=document.querySelector(".js-sectionFav");let l=[],r=[];const c=JSON.parse(localStorage.getItem("favSeries"));if(c!==null){l=c,a.innerHTML="";for(const e of c){let i="";i+=`
        <div class="js-deletedFavLocal container-infoF container-info-fav" id="${e.mal_id}">
            <div class="delete js-delete">
                    <i class="fa-solid fa-x"></i>
            </div>
            <img class="imgResult" src="${e.images.jpg.image_url}" alt:"Imagen serie anime"></img>
            <p>Titulo: ${e.title}</p>
        </div>
        `,a.innerHTML+=i}const n=document.querySelectorAll(".js-deletedFavLocal");for(const e of n)e.addEventListener("click",T),console.log("ha hecho click en un fav del LocalStorage")}function u(n){const e=parseInt(n.currentTarget.id),i=r.find(o=>e===o.mal_id);l.push(i),a.innerHTML="";for(const o of l){let d="";d+=`
            <div class="container-infoF container-info-fav" id="${o.mal_id}"> 
                <div class="delete js-delete">
                    <i class="fa-solid fa-x"></i>
                </div>
                <img class="imgResult" src="${o.images.jpg.image_url}" alt:"Imagen serie anime"></img>
                <p>Titulo: ${o.title}</p>
             </div>
            `,a.innerHTML+=d}localStorage.setItem("favSeries",JSON.stringify(l));const t=document.querySelectorAll(".container-info-fav");for(const o of t)o.addEventListener("click",L)}function v(n){s.innerHTML="",console.log(n);for(const i of n)if(i.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){let t="";t+=`
        <div class="container-info" id="${i.mal_id}">
            <i class="fa-solid fa-plus plus"></i>
            <img class="imgResult" src="https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-3.jpg" alt:"Imagen serie anime"></img>
            <p>Titulo: ${i.title}</p>
        </div>
        `,s.innerHTML+=t}else{let t="";t+=`
        <div class="container-info" id="${i.mal_id}">
            <i class="fa-solid fa-plus plus"></i>
            <img class="imgResult" src="${i.images.jpg.image_url}" alt:"Imagen serie anime"></img>
            <p>Titulo: ${i.title}</p>
        </div>
        `,s.innerHTML+=t}const e=document.querySelectorAll(".container-info");for(const i of e)i.addEventListener("click",u)}function p(n){fetch(`https://api.jikan.moe/v4/anime?q=${n}`).then(e=>e.json()).then(e=>{r=e.data,v(r)})}function h(n){n.preventDefault(),console.log("Ha hecho click");const e=g.value;p(e)}f.addEventListener("click",h);function S(n){n.preventDefault(),localStorage.clear()}m.addEventListener("click",S);function L(n){const e=parseInt(n.currentTarget.id),i=l.findIndex(t=>e===t.mal_id);console.log(i),l.splice(i,1),console.log("ha hecho click"),console.log(l),a.innerHTML="";for(const t of l){let o="";o+=`
              <div class="container-info-fav container-infoF" id="${t.mal_id}"> 
                  <div class="delete js-delete">
                      <i class="fa-solid fa-x"></i>
                  </div>
                  <img class="imgResult" src="${t.images.jpg.image_url}" alt:"Imagen serie anime"></img>
                  <p>Titulo: ${t.title}</p>
               </div>
              `,a.innerHTML+=o}localStorage.setItem("favSeries",JSON.stringify(l))}function T(n){console.log("ha hecho click en un favorito del LocalStorage que se quiere borrar");const e=parseInt(n.currentTarget.id),i=c.findIndex(t=>e===t.mal_id);console.log(i),c.splice(i,1),a.innerHTML="";for(const t of c){let o="";o+=`
              <div class="container-info-fav container-infoF" id="${t.mal_id}"> 
                  <div class="delete js-delete">
                      <i class="fa-solid fa-x"></i>
                  </div>
                  <img class="imgResult" src="${t.images.jpg.image_url}" alt:"Imagen serie anime"></img>
                  <p>Titulo: ${t.title}</p>
               </div>
              `,a.innerHTML+=o}}
//# sourceMappingURL=main.js.map
