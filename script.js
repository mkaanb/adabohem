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

function addUnderlineEffect() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((navLink) => {
    // Remove any existing underline span (if reinitializing)
    const existingUnderline = navLink.querySelector(".underline");
    if (existingUnderline) {
      existingUnderline.remove();
    }

    navLink.style.position = "relative";
    navLink.style.overflow = "hidden";

    const underline = document.createElement("span");
    underline.classList.add("underline");
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
  });
}



const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((navLink) => {

  // Adjust scroll position for sticky header
  document.querySelectorAll("nav a").forEach((navLink) => {
    navLink.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      // Check if the href is an internal link (starts with #)
      if (href.startsWith("#")) {
        event.preventDefault(); // Prevent default anchor behavior
        const targetId = href.substring(1); // Get target section ID
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
      }
    });
  });
  

  // Smooth scroll to section on click
  navLink.addEventListener("click", (e) => {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = navLink.getAttribute("href").substring(1); // Get target section ID
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth", // Smooth scrolling effect
        });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  addUnderlineEffect();
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
        contact: "Contact",
        catalogue: "Catalog"
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
      printinggroup: {
        heading1: "Offset Print Group",
        heading2: "Labeling Group",
        list1: "Magazine / Books / Bulletin / Notebook",
        list2: "Notepad / Folder / File",
        list3: "Cardboard Bag / Cardboard Box",
        list4: "Agenda / Calendar",
        list5: "Promotional Products (Pen / Tech Products / Lighter etc.)",
        list6: "Match / Cigar Match",
        list7: "Food Packaging / Paper Tableware",
        list8: "Collection / Payment Receipts",
        list9: "Letterhead Forms / Service Forms",
        list10: "Currency / Scale Receipt",
        list11: "Work Acceptance Cards / Contracts / Payrolls",
        list12: "Roll Glossy / Thermal / PP / PE / Metalized Label",
        list13: "Thermal Roll / POS Machine Roll / Calculator Roll",
        list14: "In Mould Label (IML)"
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
        contact: "İletişim",
        catalogue: "Katalog"
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
      printinggroup: {
        heading1: "Ofset Baskı Grubu",
        heading2: "Etiket Baskı Grubu",
        list1: "Dergi / Kitap / Bülten / Defter",
        list2: "Bloknot / Dosya / Klasör",
        list3: "Karton Çanta / Karton Kutu",
        list4: "Ajanda / Takvim",
        list5: "Promosyon Ürünleri (Kalem / Teknolojik Ürünler / Çakmak vb.)",
        list6: "Kibrit / Puro Kibriti",
        list7: "Gıda Ambalajları / Kağıt Sofra Ürünleri",
        list8: "Tahsilat / Tediye Makbuzları",
        list9: "Antetli Formlar / Servis Formları",
        list10: "Döviz / Kantar Fişi",
        list11: "İş Kabul Kartları / Sözleşmeler / Maaş Bordroları",
        list12: "Rulo Kuşe / Termal / PP / PE / Metalize Etiket",
        list13: "Termal Bobin / POS Cihazı Bobini / Hesap Makinesi Bobini",
        list14: "In Mould Etiket (IML)"
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
    document.querySelector("nav a[href='https://catalog.adabohem.com']").textContent = translations[language].navigation.catalogue;

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

    const productLists = document.querySelectorAll(".printing-group li");
    productLists.forEach((item, index) => {
        const listKey = `list${index + 1}`;
        if (translations[language].printinggroup[listKey]) {
            item.innerHTML = translations[language].printinggroup[listKey];
        }
    });

    const productHeaders = document.querySelectorAll(".printing-group h3");
    productHeaders[0].textContent = translations[language].printinggroup.heading1;
    productHeaders[1].textContent = translations[language].printinggroup.heading2;

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
    addUnderlineEffect();
    
    if (language === 'tr') {
      metaDesc.setAttribute("content", "Kıbrıs’ta güvenilir baskı, ambalaj, etiket baskı, rulo etiket ve ithalat çözümleri sağlayıcısı. Ayrıca nargile, tütün ve aksesuar tedariki ile kalite ve verimlilik sunulmaktadır.");
    } else {
      metaDesc.setAttribute("content", "Trusted provider of printing, packaging, label printing, roll labels, and business import solutions in Cyprus. Also supplying shisha, tobacco, and hookah accessories with a commitment to quality and efficiency.");
    }
    if (language === 'tr') {
      document.title = "AdaBohem | Güvenilir İthalat & Nargile Tedarikçiniz - KKTC";
    } else {
      document.title = "AdaBohem | Your Trusted Import & Hookah Supplier in Cyprus";
    }
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
  
function updateTitle() {
if (navigator.language.startsWith('tr')) {
    document.title = "AdaBohem | Güvenilir İthalat & Nargile Tedarikçiniz - KKTC";
  } else {
    document.title = "AdaBohem | Your Trusted Import & Hookah Supplier in Cyprus";
  }
}
  function updateMetaDescription() {
    let metaDesc = document.getElementById("metaDesc");
    
    if (navigator.language.startsWith('tr')) {
      metaDesc.setAttribute("content", "Kıbrıs’ta güvenilir baskı, ambalaj, etiket baskı, rulo etiket ve ithalat çözümleri sağlayıcısı. Ayrıca nargile, tütün ve aksesuar tedariki ile kalite ve verimlilik sunulmaktadır.");
    } else {
      metaDesc.setAttribute("content", "Trusted provider of printing, packaging, label printing, roll labels, and business import solutions in Cyprus. Also supplying shisha, tobacco, and hookah accessories with a commitment to quality and efficiency.");
    }
  }
  updateTitle();
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
  
  
// Ensure all scripts are loaded before hiding the spinner
window.onload = function() {
  let loader = document.getElementById("loading-screen");
  loader.style.opacity = "0";  // Smooth fade-out effect
  setTimeout(() => {
      loader.style.display = "none"; // Hide completely
  }, 600); // Wait for fade-out animation
};


// Function to check if the page exists
document.addEventListener("DOMContentLoaded", function() {
  fetch(window.location.href, { method: 'HEAD' })
      .then(response => {
          if (!response.ok) {
              show404Screen();
          }
      })
      .catch(() => show404Screen()); // If fetch fails, assume it's broken
    });

function show404Screen() {
  let errorScreen = document.getElementById("error-screen");
  // If the 404 screen doesn't exist in the DOM, create it
  if (!errorScreen) {
      errorScreen = document.createElement("div");
      errorScreen.id = "error-screen";
      errorScreen.innerHTML = `
          <h2>Oops! Seems like the wrong way!</h2>
          <p>The page you're looking for doesn't exist.</p>
          <br><br>
          <button onclick="goHome()">AdaBohem</button>
          <br><br>
          <h2>Sanıyoruz ki yanlış geldiniz!</h2>
          <p>Böyle bir sayfa bulunamadı!</p>
      `;
      document.body.appendChild(errorScreen);
  }

  // Show the 404 screen
  errorScreen.style.display = "flex";
}

// Redirect to Homepage
function goHome() {
  window.location.href = "/";
}
