const mobileSlides = document.querySelectorAll(".mobile-slideshow img");
let currentMobileSlide = 0;
let autoSlideInterval;
let manualPauseTimeout;

// Function to update slide classes for animation
function updateSlideClasses(index, direction) {
  mobileSlides.forEach((slide, i) => {
    slide.classList.remove("active", "prev", "next");

    if (i === index) {
      slide.classList.add("active");
    } else if (i === (index - 1 + mobileSlides.length) % mobileSlides.length) {
      slide.classList.add("prev");
    } else if (i === (index + 1) % mobileSlides.length) {
      slide.classList.add("next");
    }
  });
}

// Function to show the current slide
function showMobileSlide(index, direction = 1) {
  currentMobileSlide = (index + mobileSlides.length) % mobileSlides.length;
  updateSlideClasses(currentMobileSlide, direction);
}

// Function to start auto-slide
function startAutoSlide() {
  stopAutoSlide(); // Prevent duplicate intervals
  autoSlideInterval = setInterval(() => {
    showMobileSlide(currentMobileSlide + 1);
  }, 3000);
}

// Function to stop auto-slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Function to pause auto-slide for 10 seconds
function pauseAutoSlide() {
  stopAutoSlide();
  clearTimeout(manualPauseTimeout); // Clear any existing pause timers
  manualPauseTimeout = setTimeout(() => {
    startAutoSlide(); // Resume auto-slide after 10 seconds
  }, 10000);
}

// Add touch event listeners for swipe interaction
const slideshowContainer = document.querySelector(".mobile-slideshow");
let startX = 0;
let endX = 0;

slideshowContainer.addEventListener("touchstart", (e) => {
  clearTimeout(manualPauseTimeout); // Cancel pause timer on new interaction
  stopAutoSlide(); // Pause auto-slide during manual interaction
  startX = e.touches[0].clientX;
});

slideshowContainer.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

slideshowContainer.addEventListener("touchend", () => {
  if (startX - endX > 50) {
    // Swipe left
    showMobileSlide(currentMobileSlide + 1);
  } else if (endX - startX > 50) {
    // Swipe right
    showMobileSlide(currentMobileSlide - 1);
  }
  pauseAutoSlide(); // Pause auto-slide for 10 seconds after manual interaction
});

// Add event listeners for navigation links
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    clearTimeout(manualPauseTimeout); // Cancel manual pause
    startAutoSlide(); // Resume auto-slide immediately
  });
});


// Intersection Observer to detect slideshow visibility
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Slideshow is in the viewport, resume with 3-second interval
        clearTimeout(manualPauseTimeout); // Cancel any 10-second pause
        startAutoSlide();
      } else {
        // Slideshow is out of the viewport, stop auto-sliding
        stopAutoSlide();
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the slideshow is visible
);

// Get the sticky header and mobile menu
const mobileMenu = document.querySelector(".mobile-menu");
const stickyHeader = document.querySelector(".mobile-header");

const headerHeight = stickyHeader.offsetHeight;

// Add smooth scroll to navigation links
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Get the target section
    const targetId = navLink.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Calculate scroll position
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        150;

      // Smooth scroll to the adjusted position
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Hide the mobile menu after clicking a link
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }

    // Resume auto-slide for the slideshow
    clearTimeout(manualPauseTimeout); // Cancel manual pause
    startAutoSlide(); // Resume auto-slide immediately
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


document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });
});



// Observe the slideshow container
observer.observe(slideshowContainer);

// Initialize slideshow
updateSlideClasses(currentMobileSlide);
startAutoSlide();
