const stories=[["El algarrobo", "El algarrobo nos da su fruto, la algarroba, para hacer ricas comidas."], ["Semillas del monte", "Las semillas del monte se enhebran con paciencia para transformarse en un colorido collar."], ["El quirquincho", "El quirquincho camina por el monte y, si ve un peligro, ¡se convierte en bolita!"], ["Una casa que nos cuida", "Las paredes de barro sostienen el firme techo de paja que nos protege del sol y la lluvia."], ["Manos que tejen", "Con tiras de chaguar de colores, las artesanas tejen esta linda cartera."], ["Los pasos del yaguareté", "El yaguareté avanza a pasos silenciosos. Sus huellas quedan marcadas en el camino."], ["El oso hormiguero", "El oso hormiguero buscando su comida favorita… las pequeñitas hormigas del hormiguero."], ["Las flores del palo santo", "El palo santo se llena de flores en primavera, y las abejas vienen a visitar sus flores doradas."], ["Los frutos del mistol", "El mistol se llena de flores blancas en el monte y madura sus dulcísimos frutos rojos."]];
let current=0;
const narration=new Audio();
narration.preload='none';
let playbackRequest=0;
function resetListenButton(){const button=document.getElementById('sound');button.textContent='Escuchar ♫';button.setAttribute('aria-label','Escuchar esta escena');button.setAttribute('aria-pressed','false');}
function stopNarration(){playbackRequest++;narration.pause();narration.currentTime=0;resetListenButton();}

const $=id=>document.getElementById(id);
const dots=$('dots');
stories.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Ir a escena '+(i+1)+': '+s[0]);b.addEventListener('click',()=>show(i));dots.append(b)});
function show(i){current=(i+stories.length)%stories.length;stopNarration();const n=String(current+1).padStart(2,'0');$('chapter-label').textContent=n+' / 09';$('story-image').src='assets/cuento-'+(current+1)+'.png';$('story-image').alt=stories[current][1];[...dots.children].forEach((b,j)=>b.setAttribute('aria-current',j===current?'true':'false'));}
$('previous').onclick=()=>show(current-1);$('next').onclick=()=>show(current+1);
narration.addEventListener('ended',resetListenButton);
narration.addEventListener('error',resetListenButton);
$('sound').setAttribute('aria-pressed','false');
$('sound').onclick=async()=>{
 if(!narration.paused){stopNarration();return;}
 const request=++playbackRequest;
 narration.src='assets/audio/amelia-'+(current+1)+'.m4a';
 $('sound').textContent='Detener ■';
 $('sound').setAttribute('aria-label','Detener la lectura');
 $('sound').setAttribute('aria-pressed','true');
 try{await narration.play();}catch{if(request===playbackRequest)resetListenButton();}
};
window.addEventListener('pagehide',stopNarration);
document.querySelector('.storybook').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}});show(0);
