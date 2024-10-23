const carouselElement = document.querySelector('#imageSlider');
const carousel = new bootstrap.Carousel(carouselElement);

carouselElement.addEventListener('slid.bs.carousel', function () {
    const activeIndex = carouselElement.querySelector('.carousel-item.active').getAttribute('data-bs-slide-to');
    console.log(`Active slide index: ${activeIndex}`);
});
