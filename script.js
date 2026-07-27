const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");

if (slider && slides) {

    const images = slides.querySelectorAll("img");

    let index = 0;

    function nextSlide() {

        const width = slider.clientWidth;

        index++;

        if (index >= images.length) {
            index = 0;
        }

        slides.style.transform = `translateX(-${width * index}px)`;

    }

    setInterval(nextSlide, 3000);

}
