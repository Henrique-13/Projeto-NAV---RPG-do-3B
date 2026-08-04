let slideIndex = 0;
let autoPlayTimer = null;
const intervalTime = 4000; // Tempo em ms (4 segundos)
const CARDS_PER_PAGE = 4;   // Quantidade de cards por página

function moveSlide(direction) {
    let slides = document.querySelectorAll(".flip-card");
    if (!slides.length) return;

    // Avança ou recua de 4 em 4
    slideIndex += direction * CARDS_PER_PAGE;

    // Se ultrapassar o total de cards, volta ao início
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    // Se voltar antes do zero, vai para o último bloco
    if (slideIndex < 0) {
        slideIndex = Math.max(0, slides.length - CARDS_PER_PAGE);
    }

    showSlides(slideIndex);
}

function showSlides(index) {
    let carouselTrack = document.querySelector(".carousel-track");
    let card = document.querySelector(".flip-card");

    if (!carouselTrack || !card) return;

    // Calcula a largura total de 1 card incluindo as margens (largura + 30px de margem)
    const cardWidth = card.offsetWidth + 30;

    // Desloca o carrossel a distância equivalente aos cards
    carouselTrack.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Inicia a transição automática
function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
        moveSlide(1);
    }, intervalTime);
}

// Pausa a transição automática
function stopAutoPlay() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
    }
}

// Eventos de inicialização e hover
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    startAutoPlay();

    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", stopAutoPlay);
        carouselContainer.addEventListener("mouseleave", startAutoPlay);
    }
});