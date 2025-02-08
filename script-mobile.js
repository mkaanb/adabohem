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
        200;

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
        group2: "Hookah Group",
        text1: "At AdaBohem, we take pride in offering a diverse range of high-quality products and services tailored to meet the needs of businesses and individuals alike. With a strong presence in printing, packaging, labeling, corporate promotion, and hookah product distribution, we ensure reliable solutions backed by years of experience and expertise.",
        text2: "With years of experience in importing goods from Turkey, we manage quality control, logistics, and customs clearance for businesses seeking seamless supply chain solutions. Our expertise ensures that businesses receive their products on time, hassle-free.",
        text3: "From custom packaging solutions to high-quality printed materials, we support businesses in creating impactful branding and packaging that stands out. Whether it's food packaging, labels, promotional materials, or customized prints, our advanced printing technology guarantees precision, durability, and aesthetic appeal.",
        text4: "We are a leading distributor of premium hookah products, accessories, and tobacco brands in Cyprus. Our carefully curated selection includes high-quality hookahs, hoses, bowls, coals, and tobacco sourced from reputable manufacturers. As an importer, we also assist businesses in procuring and transporting hookah products seamlessly."
      },
      portfolio: {
        heading: "Portfolio",
        text1: "Over the years, AdaBohem has been an integral part of our customers' success by providing essential products and services that support their business growth. Whether through custom-printed packaging, high-quality labels, promotional merchandise, or premium hookah products, we have helped countless businesses bring their ideas to life.",
        text2: "We are proud to have collaborated with leading brands, businesses, and entrepreneurs, ensuring they receive top-tier solutions tailored to their needs. Our commitment to quality, reliability, and customer satisfaction continues to set us apart in the industry."
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
        group2: "Nargile Grubu",
        text1: "AdaBohem olarak, işletmelerin ve bireylerin ihtiyaçlarına yönelik baskı, ambalaj, etiketleme, kurumsal promosyon ve nargile ürünleri dağıtımı alanlarında yüksek kaliteli çözümler sunmaktan gurur duyuyoruz. Yılların getirdiği deneyim ve uzmanlık ile müşterilerimize güvenilir ve etkili hizmetler sağlıyoruz.",
        text2: "Türkiye’den yapılan ithalat süreçlerinde geniş deneyime sahibiz. Kalite kontrol, lojistik ve gümrükleme hizmetleri ile işletmelerin tedarik süreçlerini kolaylaştırıyoruz. Ürünlerinizin güvenli ve zamanında teslim edilmesine destek oluyoruz.",
        text3: "Özgün tasarımlarınızla fark yaratmanızı sağlayan özel ambalaj çözümleri ve yüksek kaliteli baskı hizmetleri sunuyoruz. Gıda ambalajları, etiketler, promosyon materyalleri ve özel baskılar gibi geniş bir ürün yelpazesinde en son teknolojiyle kaliteli, dayanıklı ve estetik baskılar sağlıyoruz.",
        text4: "Kıbrıs'ta nargile ürünleri, aksesuarları ve tütün markalarının öncü distribütörlerinden biriyiz. Özenle seçilmiş nargileler, marpuçlar, lüleler, kömürler ve tütün ürünleri gibi geniş ürün yelpazemizle hem perakende hem de toptan satış çözümleri sunuyoruz. Aynı zamanda, ithalatçı olarak işletmelerin nargile ürünlerini kolay ve güvenilir bir şekilde temin etmelerine yardımcı oluyoruz."
      },
      portfolio: {
        heading: "Portföy",
        text1: "Yıllar içinde, müşterilerimizin büyüme yolculuğunda önemli bir rol oynayarak ihtiyaç duydukları baskı, ambalaj, etiketleme, promosyon ürünleri ve nargile ekipmanları konusunda destek sağladık.",
        text2: "AdaBohem olarak, öncü markalar, işletmeler ve girişimcilerle iş birliği yaparak onlara özel çözümler sunduk. Kalite, güvenilirlik ve müşteri memnuniyetine olan bağlılığımız, sektörde bizi farklı kılan en önemli özelliklerimizden biri olmaya devam ediyor."
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
    document.querySelector("#about h1").textContent = translations[language].about.heading;
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
    document.querySelector("#products h1").textContent = translations[language].products.heading;
    const productGroups = document.querySelectorAll("#products h2");
    productGroups[0].textContent = translations[language].products.group1;
    productGroups[1].textContent = translations[language].products.group2;

    // Products P Sections
    const productParagraphs = document.querySelectorAll("#products p");
    productParagraphs[0].textContent = translations[language].products.text1;
    productParagraphs[1].textContent = translations[language].products.text2;
    productParagraphs[2].textContent = translations[language].products.text3;
    productParagraphs[3].textContent = translations[language].products.text4;

    // Portfolio P Sections
    const portfolioParagraphs = document.querySelectorAll("#portfolio p");
    portfolioParagraphs[0].textContent = translations[language].portfolio.text1;
    portfolioParagraphs[1].textContent = translations[language].portfolio.text2;


    // Portfolio Section
    document.querySelector("#portfolio h1").textContent = translations[language].portfolio.heading;

    // Contact Section
    document.querySelector("#contact h1").textContent = translations[language].contact.heading;
    const locations = document.querySelectorAll("#contact .location");
    locations[0].querySelector("h3").textContent = translations[language].contact.location1.title;
    locations[0].querySelector("p").innerHTML = `
      <strong>${translations[language].contact.location1.phone}</strong> 0 (539) 101 11 99<br />
      <strong>${translations[language].contact.location1.address}</strong> Gazeteci Hasan Tahsin Cd 83/B, Lefkoşa<br />
      <strong>${translations[language].contact.location1.email}</strong> <a href="mailto:info@bohem.com">info@bohem.com</a>
    `;
    locations[1].querySelector("h3").textContent = translations[language].contact.location2.title;
    locations[1].querySelector("p").innerHTML = `
      <strong>${translations[language].contact.location2.phone}</strong> 0 (539) 100 55 50<br />
      <strong>${translations[language].contact.location2.address}</strong> Naci Talat Cd 3, Girne<br />
      <strong>${translations[language].contact.location2.email} </strong> <a href="mailto:info@bohem.com">info@bohem.com</a>
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

if (navigator.language.startsWith('tr')) {
  document.title = "AdaBohem | Güvenilir İthalat & Nargile Tedarikçiniz - KKTC";
} else {
  document.title = "AdaBohem | Your Trusted Import & Hookah Supplier in Cyprus";
}

function updateMetaDescription() {
  let metaDesc = document.getElementById("metaDesc");
  
  if (navigator.language.startsWith('tr')) {
    metaDesc.setAttribute("content", "Kıbrıs’ta güvenilir baskı, ambalaj, etiket baskı, rulo etiket ve ithalat çözümleri sağlayıcısı. Ayrıca nargile, tütün ve aksesuar tedariki ile kalite ve verimlilik sunulmaktadır.");
  } else {
    metaDesc.setAttribute("content", "Trusted provider of printing, packaging, label printing, roll labels, and business import solutions in Cyprus. Also supplying shisha, tobacco, and hookah accessories with a commitment to quality and efficiency.");
  }
}
updateMetaDescription();

function updateHTMLVersion() {
  console.log('Checking screen size...');

  const isMobile = window.innerWidth <= 768;
  const currentPage = window.location.pathname;

  // Handle cases where index.html is not explicitly in the URL (e.g., "/")
  const isIndex = currentPage === "/" || currentPage.includes("index.html");

  if (isMobile && !currentPage.includes("mobile.html")) {
    window.location.href = "mobile.html"; 
  } else if (!isMobile && !isIndex) {
    window.location.href = "index.html";
  }
}

// Run on load
window.addEventListener("load", updateHTMLVersion);

// Run on resize with debounce to prevent excessive redirections
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateHTMLVersion, 300);
});
