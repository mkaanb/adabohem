// Initialize slide index and select elements
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let autoSlideTimer; // Timer reference

// Function to show the current slide
function showSlide(index) {
  if (!slides.length) return; // Guard clause for no slides

  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    slide.setAttribute("aria-hidden", i !== index); // Accessibility improvement
  });
}

// Function to change slides (forward or backward)
function changeSlide(n) {
  if (!slides.length) return; // Guard clause for no slides

  slideIndex = (slideIndex + n + slides.length) % slides.length; // Wrap around
  showSlide(slideIndex);
}

// Function to start the automatic slideshow
function startAutoShowSlides(interval = 3000) {
  if (!slides.length) return; // Guard clause for no slides

  stopAutoShowSlides(); // Ensure no duplicate timers
  autoSlideTimer = setInterval(() => changeSlide(1), interval);
}

// Function to stop the automatic slideshow
function stopAutoShowSlides() {
  clearInterval(autoSlideTimer);
}

// Function to handle manual slide change and reset timer
function manualChangeSlide(n) {
  changeSlide(n);
  startAutoShowSlides(); // Reset the timer after manual change
}

// Attach event listeners to buttons
if (prevButton && nextButton) {
  prevButton.addEventListener("click", () => manualChangeSlide(-1));
  nextButton.addEventListener("click", () => manualChangeSlide(1));
}

// Initialize the slideshow
showSlide(slideIndex);
startAutoShowSlides();

// Add slow underline effect to navigation buttons
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((navLink) => {
  navLink.style.position = "relative";
  navLink.style.overflow = "hidden";

  const underline = document.createElement("span");
  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.left = "0";
  underline.style.width = "0";
  underline.style.height = "2px";
  underline.style.backgroundColor = "#84245C";
  underline.style.transition = "width 0.5s ease";

  navLink.appendChild(underline);

  navLink.addEventListener("mouseenter", () => {
    underline.style.width = "100%";
  });

  navLink.addEventListener("mouseleave", () => {
    underline.style.width = "0";
  });

  // Adjust scroll position for sticky header
  document.querySelectorAll("nav a").forEach((navLink) => {
    navLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      const targetId = this.getAttribute("href").substring(1); // Get target section ID
      const targetElement = document.getElementById(targetId);
      const headerHeight = document.querySelector("header").offsetHeight; // Get sticky header height

      if (targetElement) {
        const elementPosition = targetElement.offsetTop; // Get the element's top position
        const offsetPosition = elementPosition - headerHeight; // Adjust for header height

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth", // Smooth scrolling
        });
      }
    });
  });

  // Smooth scroll to section on click
  navLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = navLink.getAttribute("href").substring(1); // Get target section ID
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about");
  const paragraphs = aboutSection.querySelectorAll("p"); // Select all paragraphs

  paragraphs.forEach((paragraph, index) => {
    // Use a delay for all except the first paragraph
    const delay = index === 0 ? 0 : index * 2500; // First appears immediately, others have a delay

    setTimeout(() => {
      paragraph.classList.add("visible"); // Add the visible class
    }, delay);
  });
});

// Add sliding animations for elements on scroll
const slideElements = document.querySelectorAll("[data-slide]");

// Debounce function to limit the frequency of calls
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function handleScroll() {
  const windowHeight = window.innerHeight;
  slideElements.forEach((element) => {
    const elementPositionTop = element.getBoundingClientRect().top;
    const elementPositionBottom = element.getBoundingClientRect().bottom;
    const slideDirection = element.dataset.slide;

    // Check if element is within the viewport (both scrolling up and down)
    if (elementPositionTop < windowHeight && elementPositionBottom > 0) {
      element.style.transform = "translateX(0)";
      element.style.opacity = "1";
      element.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    } else {
      // Reset positions if element is outside the viewport
      if (slideDirection === "left") {
        element.style.transform = "translateX(-100px)";
      } else if (slideDirection === "right") {
        element.style.transform = "translateX(100px)";
      }
      element.style.opacity = "0";
    }
  });
}

// Initialize sliding elements
slideElements.forEach((element) => {
  const slideDirection = element.dataset.slide;
  if (slideDirection === "left") {
    element.style.transform = "translateX(-100px)";
  } else if (slideDirection === "right") {
    element.style.transform = "translateX(100px)";
  }
  element.style.opacity = "0";
  element.style.transition = "transform 0.6s ease, opacity 0.6s ease";
});

// Attach debounced scroll event listener
window.addEventListener("scroll", debounce(handleScroll));

// Trigger initial check for already visible elements
handleScroll();

function updateActiveLink() {
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
}

window.addEventListener("scroll", debounce(updateActiveLink));
