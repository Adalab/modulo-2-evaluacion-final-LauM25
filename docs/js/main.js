console.log(">> Ready for the second exam :) / :(");const m=document.querySelector(".js-btnSearch"),d=document.querySelector(".js-btnReset"),g=document.querySelector(".js-input"),l=document.querySelector(".js-sectionResult"),c=document.querySelector(".js-sectionFav");let o=[],s=[];const a=JSON.parse(localStorage.getItem("favSeries"));if(a!==null){o=a,c.innerHTML="";for(const e of a){let t="";t+=`
        <div class="container-info" id="${e.mal_id}">
        <img class="imgResult" src="${e.images.jpg.image_url}" alt:"Imagen serie anime"></img>
        <p>Titulo: ${e.title}</p>
        </div>
        `,c.innerHTML+=t}}function u(e){const t=parseInt(e.currentTarget.id),n=s.find(i=>t===i.mal_id);o.push(n),c.innerHTML="";for(const i of o){let r="";r+=`
            <div class="container-info" id="${i.mal_id}">
            <img class="imgResult" src="${i.images.jpg.image_url}" alt:"Imagen serie anime"></img>
            <p>Titulo: ${i.title}</p>
            </div>
            `,c.innerHTML+=r}localStorage.setItem("favSeries",JSON.stringify(o))}function f(e){l.innerHTML="",console.log(e);for(const n of e)if(n.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){let i="";i+=`
        <div class="container-info" id="${n.mal_id}">
        <img class="imgResult" src="https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-3.jpg" alt:"Imagen serie anime"></img>
        <p>Titulo: ${n.title}</p>
        </div>
        `,l.innerHTML+=i}else{let i="";i+=`
        <div class="container-info" id="${n.mal_id}">
        <img class="imgResult" src="${n.images.jpg.image_url}" alt:"Imagen serie anime"></img>
        <p>Titulo: ${n.title}</p>
        </div>
        `,l.innerHTML+=i}const t=document.querySelectorAll(".container-info");for(const n of t)n.addEventListener("click",u)}function p(e){fetch(`https://api.jikan.moe/v4/anime?q=${e}`).then(t=>t.json()).then(t=>{s=t.data,f(s)})}function v(e){e.preventDefault(),console.log("Ha hecho click");const t=g.value;p(t)}m.addEventListener("click",v);function S(e){e.preventDefault(),localStorage.clear(e)}d.addEventListener("click",S);
//# sourceMappingURL=main.js.map
