const button = document.querySelector('button');

button.addEventListener('click', () => {
    button.classList.toggle('activo');
});
function setupSlider() {
    const slider = document.querySelector(".slider");
    const sliderSection = document.querySelectorAll(".slider__section");
    const sliderSectionLast = sliderSection[sliderSection.length - 1];

    slider.insertAdjacentElement('afterbegin', sliderSectionLast);

    let touchStartX = 0;
    let touchEndX = 0;
    const sensitivity = 50; // Sensibilidad del deslizamiento (ajústala según tus necesidades)
    let autoSliderEnabled = true;

    function Siguiente() {
        const sliderSectionPrimero = document.querySelector(".slider__section");
        slider.style.marginLeft = "-200%";
        slider.style.transition = "all 0.5s";
        setTimeout(function () {
            slider.style.transition = "none";
            slider.insertAdjacentElement('beforeend', sliderSectionPrimero);
            slider.style.marginLeft = "-100%";
        }, 500);
    }

    function Anterior() {
        const sliderSectionUltimo = document.querySelector(".slider__section:last-child");
        slider.style.marginLeft = "0";
        slider.style.transition = "all 0.5s";
        setTimeout(function () {
            slider.style.transition = "none";
            slider.insertAdjacentElement('afterbegin', sliderSectionUltimo);
            slider.style.marginLeft = "-100%";
        }, 500)
    }

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        autoSliderEnabled = false;
    }

    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        const diffX = touchEndX - touchStartX;
        if (diffX > sensitivity) {
            Anterior();
        } else if (diffX < -sensitivity) {
            Siguiente();
        }
        autoSliderEnabled = true;
    }

    // Agregar eventos de deslizamiento táctil
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);

    // Detener el intervalo si ya estaba activo
    if (interval) {
        clearInterval(interval);
    }

    // Iniciar el intervalo para la función Siguiente si el auto slider está habilitado
    if (autoSliderEnabled) {
        interval = setInterval(Siguiente, 5000);
    }
}

// Llama a la función setupSlider cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", setupSlider);

// Referencia al intervalo actual
let interval;

// Vuelve a activar el slider si el tamaño de la ventana cambia
window.addEventListener("resize", function () {
    // Reiniciar el slider al cambiar el tamaño de la ventana
    clearInterval(interval);
    setupSlider();
});