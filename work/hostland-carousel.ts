import { initHomeCarousel } from "../app/home-carousel-controller";
document.querySelectorAll<HTMLElement>("[data-home-carousel]").forEach(root => initHomeCarousel(root));
