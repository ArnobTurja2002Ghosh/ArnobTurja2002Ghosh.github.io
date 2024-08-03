const typedText = document.getElementById("typed-text-1");
const cursor = document.getElementById("cursor1");
const textArray = ["Argob", "Arnon", "Arnob"];

let textArrayIndex = 0;
let charIndex = 0;

function type(){
    if(textArrayIndex<textArray.length){
        if (charIndex <= textArray[textArrayIndex].length - 1) {
            cursor.classList.remove('blink');
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 120);
        } 
        else if(textArrayIndex==textArray.length-1){
            setTimeout(()=>typedText.textContent +=".", 1000);
            cursor.classList.add('blink');
        }
        else {
            typedText.style.textDecoration="underline";
            typedText.style.textDecorationColor = "red";
            cursor.classList.add('blink');
            setTimeout(erase, 1000);
        }
    }     
}
function erase(){
    typedText.style.textDecoration=null;
    if(charIndex>2+textArrayIndex*2){
        cursor.classList.remove('blink');
        typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 80);
    }
    else {
        cursor.classList.add('blink');
        textArrayIndex++;
        setTimeout(type, 1000);
    }
}
type();