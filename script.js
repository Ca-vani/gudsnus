const slides = document.querySelector(".slides");

const images = document.querySelectorAll(".slides img");

let index = 0;

setInterval(() => {

    index++;

    if(index >= images.length){

        index = 0;

    }

    slides.style.transform = `translateX(-${index * 420}px)`;

},3000);