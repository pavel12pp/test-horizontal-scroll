// document.addEventListener('DOMContentLoaded', ()=> {let horizontContainer = document.querySelector(".horizont");
// let horizontContainerInner = document.querySelector(".horizont-inner");
// let startHorizontScroll = horizontContainer.getBoundingClientRect().top + window.scrollY;
// let endHorizontScroll = horizontContainerInner.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;

// function setTransform() {
//   if ((window.scrollY - startHorizontScroll) < 0) {
//     horizontContainer.style.translate = `0px 0px`
//   } else if ((window.scrollY - startHorizontScroll) > (horizontContainerInner.offsetHeight - horizontContainer.offsetHeight)) {
//     horizontContainer.style.translate = `${-(horizontContainerInner.offsetHeight - horizontContainer.offsetHeight)}px ${horizontContainerInner.offsetHeight - horizontContainer.offsetHeight}px`
//   } else {
//     horizontContainer.style.translate = `${-(window.scrollY - startHorizontScroll)}px ${window.scrollY - startHorizontScroll}px`
//   }
// }
// setTransform()
// window.addEventListener('scroll', (event) => {
//   setTransform()
// })
// window.addEventListener('resize', (event) => {
//   startHorizontScroll = horizontContainer.getBoundingClientRect().top + window.scrollY;
//   endHorizontScroll = horizontContainerInner.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
//   setTransform()
// })})


import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// gsap.to(".horizont", {
//   // rotate: 180,
//   x: "-200vw",
//   y: "4500px",
//   ease: "none", //!!! IMPORTANT СУКА
//   scrollTrigger: {
//     trigger: '.horizont-inner',
//     start: "top 0%",
//     end: "bottom 100%",
//     markers: true,
//     scrub: 0,
//   }
// })

gsap.to(".horizont", {
  // rotate: 180,
  x: "-200vw",
  // y: "4500px",
  ease: "none", //!!! IMPORTANT СУКА
  scrollTrigger: {
    trigger: '.horizont',
    // start: "top 0%",
    // end: "bottom 100%",
    end: "+=4000",
    markers: true,
    pin: true,
    scrub: 0,
  }
})