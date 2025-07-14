let w = document.getElementById("W");
let r= document.getElementById("R");
let g = document.getElementById("G");
var positionInfo = w.getBoundingClientRect();
var height = w.clientHeight;
var width = w.clientWidth;
console.log("width: " + width + ", height: " + height);

r.style.borderBottom=0.5*height/2 +"px solid red";
r.style.borderLeft=5*width/24 +"px solid transparent";
r.style.borderRight=4*width/24 +"px solid transparent";

g.style.height=g.clientWidth+"px";
g.style.top=0.75*height-g.clientWidth/2+"px";
console.log("g.clientWidth: " + g.clientWidth);