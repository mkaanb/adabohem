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

document.addEventListener("DOMContentLoaded", () => {
  const translateButton = document.getElementById("translate-btn");
  const userLanguage = navigator.language || navigator.userLanguage; // Detect device language
  const defaultLanguage = localStorage.getItem("language") || (userLanguage.startsWith("tr") ? "tr" : "en");

  // Content for translations
  const translations = {
    en: {
      navigation: {
        about: "About Us",
        products: "Products & Services",
        portfolio: "Portfolio",
        contact: "Contact"
      },
      about: {
        heading: "About Us",
        text1:
          "Bahçıvanlar Group, established in 1927, operates in printing, labeling, packaging, promotion, press, and publishing sectors. As part of this strong structure, AdaBohem was established in 2011 in Northern Cyprus and began its operations.",
        text2:
          "We provide comprehensive services in printing, packaging, and corporate solutions, meeting the demands of customers from various sectors. With our flexibility and innovative solutions, we are the market leader across Cyprus.",
        text3:
          "Additionally, we distribute various hookah products and tobacco brands across Cyprus. We serve our customers directly through two stores specializing in hookah products, accessories, and tobacco sales.",
        text4:
          "With years of experience, we take pride in being a reliable business partner across Northern Cyprus."
      },
      products: {
        heading: "Products & Services",
        group1: "Printing & Packaging Group",
        group2: "Hookah Group"
      },
      portfolio: {
        heading: "Portfolio"
      },
      contact: {
        heading: "Contact",
        location1: {
          title: "Head Office & Hookah Sales Store",
          phone: "Phone:",
          address: "Address:",
          email: "E-Mail:"
        },
        location2: {
          title: "Kyrenia Hookah Sales Store",
          phone: "Phone:",
          address: "Address:",
          email: "E-Mail:"
        }
      },
      footer: {
        copyright: "© 2025 AdaBohem. All Rights Reserved.",
        group: "AdaBohem is a ",
        designed: "Designed by",
        designer: "Mustafa Kaan Bahçıvan",
        group2: " company."
      }
    },
    tr: {
      // Turkish translations (default in HTML)
      navigation: {
        about: "Hakkımızda",
        products: "Ürün ve Hizmetler",
        portfolio: "Portföy",
        contact: "İletişim"
      },
      about: {
        heading: "Hakkımızda",
        text1:
          "Bahçıvanlar Grup, 1927 yılında kurulan köklü geçmişe sahip bir şirket olarak matbaa, etiket, ambalaj, tanıtım, basın ve yayın sektörlerinde faaliyet göstermektedir. Bu güçlü yapının bir parçası olan AdaBohem, 2011 yılında Kuzey Kıbrıs'ta kurulmuş ve faaliyetine başlamıştır.",
        text2:
          "Matbaa, ambalaj ve kurumsal çözümler alanında kapsamlı hizmetler sunarak, farklı sektörlerden müşterilerimizin taleplerini karşılıyoruz. Her türlü gereksinime yönelik esnek ve yenilikçi çözümler üretebilme kabiliyetimizle, Kıbrıs genelinde bu alanda lider konumdayız.",
        text3:
          "Bunun yanı sıra, çeşitli nargile ürünleri ve tütün markalarının Kıbrıs genelindeki distribütörlüğünü yapmaktayız. Nargile ürünleri, aksesuarları ve tütünlerinin satışını gerçekleştiren iki farklı mağazamızla müşterilerimize doğrudan hizmet sunuyoruz.",
        text4:
          "Yıllara dayanan tecrübemizle, Kuzey Kıbrıs genelinde güvenilir bir çözüm ortağı olmaktan gurur duyuyoruz."
      },
      products: {
        heading: "Ürün ve Hizmetler",
        group1: "Matbaa & Ambalaj Grubu",
        group2: "Nargile Grubu"
      },
      portfolio: {
        heading: "Portföy"
      },
      contact: {
        heading: "İletişim",
        location1: {
          title: "Merkez Ofis & Nargile Satış Mağazası",
          phone: "Telefon:",
          address: "Adres:",
          email: "E-Mail:"
        },
        location2: {
          title: "Girne Nargile Satış Mağazası",
          phone: "Telefon:",
          address: "Adres:",
          email: "E-Mail:"
        }
      },
      footer: {
        copyright: "© 2025 AdaBohem. Tüm Hakları Saklıdır.",
        group: "AdaBohem bir ",
        designed: "Designed by",
        designer: "Mustafa Kaan Bahçıvan",
        group2: " şirketidir."
      }
    }
  };

  // Function to update content and flag
  const updateContent = (language) => {
    // Navigation
    document.querySelector("nav a[href='#about']").textContent = translations[language].navigation.about;
    document.querySelector("nav a[href='#products']").textContent = translations[language].navigation.products;
    document.querySelector("nav a[href='#portfolio']").textContent = translations[language].navigation.portfolio;
    document.querySelector("nav a[href='#contact']").textContent = translations[language].navigation.contact;

    // About Section
    document.querySelector("#about h2").textContent = translations[language].about.heading;
    const aboutParagraphs = document.querySelectorAll("#about p");
    aboutParagraphs[0].innerHTML = `
    <a href="http://www.bahcivanlar.com.tr" target="_blank" class="bahcivanlar-link">
      ${language === "tr" ? "Bahçıvanlar Grup," : "Bahçıvanlar Group,"}
    </a>
    ${language === "tr"
      ? "1927 yılında kurulan köklü geçmişe sahip bir şirket olarak matbaa, etiket, ambalaj, tanıtım, basın ve yayın sektörlerinde faaliyet göstermektedir. Bu güçlü yapının bir parçası olan AdaBohem, 2011 yılında Kuzey Kıbrıs'ta kurulmuş ve faaliyetine başlamıştır."
      : "established in 1927, operates in printing, labeling, packaging, promotion, press, and publishing sectors. As part of this strong structure, AdaBohem was established in 2011 in Northern Cyprus and began its operations."
    }
  `;
    aboutParagraphs[1].textContent = translations[language].about.text2;
    aboutParagraphs[2].textContent = translations[language].about.text3;
    aboutParagraphs[3].textContent = translations[language].about.text4;

    // Products Section
    document.querySelector("#products h2").textContent = translations[language].products.heading;
    const productGroups = document.querySelectorAll("#products h3");
    productGroups[0].textContent = translations[language].products.group1;
    productGroups[1].textContent = translations[language].products.group2;

    // Portfolio Section
    document.querySelector("#portfolio h2").textContent = translations[language].portfolio.heading;

    // Contact Section
    document.querySelector("#contact h2").textContent = translations[language].contact.heading;
    const locations = document.querySelectorAll("#contact .location");
    locations[0].querySelector("h3").textContent = translations[language].contact.location1.title;
    locations[0].querySelector("p").innerHTML = `
      <strong>${translations[language].contact.location1.phone}</strong> 0 (539) 101 11 99<br />
      <strong>${translations[language].contact.location1.address}</strong> Gazeteci Hasan Tahsin Cd 83/B, Lefkoşa<br />
      <strong>${translations[language].contact.location1.email}</strong> info@bohem.com
    `;
    locations[1].querySelector("h3").textContent = translations[language].contact.location2.title;
    locations[1].querySelector("p").innerHTML = `
      <strong>${translations[language].contact.location2.phone}</strong> 0 (539) 100 55 50<br />
      <strong>${translations[language].contact.location2.address}</strong> Naci Talat Cd 3, Girne<br />
      <strong>${translations[language].contact.location2.email}</strong> info@bohem.com
    `;

    // Footer
    const footer = document.querySelector("footer");
    footer.innerHTML = `
    <p>
      ${translations[language].footer.copyright}<br />
       ${translations[language].footer.group}
      <a href="http://www.bahcivanlar.com.tr" target="_blank" class="bahcivanlar-link">
        ${language === "tr" ? "Bahçıvanlar Grup" : "Bahçıvanlar Group"}
      </a>
      ${language === "tr" ? "şirketidir." : "company."}
    </p>
    <p class="designed">
      ${translations[language].footer.designed}<br />
      <span class="designedname">${translations[language].footer.designer}</span>
    </p>
  `;


    // Update flag icon
    const flagIcon = language === "tr" ? "images/uk-flag.png" : "images/tr-flag.png";
    translateButton.innerHTML = `<img src="${flagIcon}" alt="Translate to ${language === "tr" ? "English" : "Turkish"}" class="language-icon" />`;

    // Save language preference
    localStorage.setItem("language", language);
  };

  // Detect and apply default language
  updateContent(defaultLanguage);

  // Handle translation button click
  translateButton.addEventListener("click", () => {
    const currentLanguage = localStorage.getItem("language");
    const newLanguage = currentLanguage === "tr" ? "en" : "tr";
    updateContent(newLanguage);
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
