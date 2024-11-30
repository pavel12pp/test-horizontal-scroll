gsap.registerPlugin(ScrollTrigger);

gsap.to('.scroll-wrapper', {
    xPercent: -200,  // Прокрутка на 200% влево
    ease: 'none',
    scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: '+=3000', // Длительность анимации
        scrub: true, // Зафиксировать прокрутку в момент времени
        pin: true, // Зафиксировать на экране
    }
});
