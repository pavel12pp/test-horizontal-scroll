import Lenis from "lenis";

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});
console.log(lenis)
// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});