(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const d=["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];function p(){const i=localStorage.getItem("cardCounts");if(i)try{const n=JSON.parse(i);if(Array.isArray(n)&&n.length===d.length)return n}catch{}return Array(d.length).fill(0)}function l(){localStorage.setItem("cardCounts",JSON.stringify(o))}let o=p();const a=document.getElementById("card-list");if(!a)throw new Error("Missing #card-list element");function c(){a.innerHTML="",o.forEach((s,t)=>{const e=d[t],r=document.createElement("div");r.className="flex items-center justify-between bg-white rounded-lg shadow p-0.5",r.innerHTML=`
      <div class="flex items-center gap-2">
        <span class="text-blue-600 font-bold text-lg w-12">${e}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <button class="decr px-3 py-1 bg-red-200 rounded font-bold disabled:opacity-40" ${s===0?"disabled":""} data-idx="${t}">-</button>
        <span class="min-w-[2.5rem] text-center font-semibold">${s}</span>
        <button class="incr px-3 py-1 bg-green-200 rounded font-bold mr-10" data-idx="${t}">+</button>
        <button class="reset px-2 py-1 bg-yellow-200 rounded text-xs font-medium" data-idx="${t}">Reset</button>
      </div>
    `,a.appendChild(r)});const i=Array.isArray(o[0])?o.flat().reduce((s,t)=>s+t,0):o.reduce((s,t)=>s+t,0),n=document.createElement("div");n.className="flex items-center justify-between bg-blue-100 rounded-lg shadow p-3 font-bold text-blue-700 mt-2",n.innerHTML=`
    <span class="text-lg">Total Cards</span>
    <span class="text-lg">${i}</span>
  `,a.appendChild(n)}a.addEventListener("click",i=>{var e;const n=i.target,s=(e=n.dataset)==null?void 0:e.idx;if(typeof s>"u")return;const t=parseInt(s,10);Number.isNaN(t)||(n.classList.contains("incr")?(o[t]++,l(),c()):n.classList.contains("decr")?o[t]>0&&(o[t]--,l(),c()):n.classList.contains("reset")&&(o[t]=0,l(),c()))});const f=document.getElementById("reset-all");if(!f)throw new Error("Missing #reset-all element");f.addEventListener("click",()=>{o=Array(d.length).fill(0),l(),c()});c();
