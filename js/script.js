import { apiKey, apiUrl } from "./config.js";

const slidermovie = document.querySelector(".trend-movies-slider");
const slides = document.querySelectorAll(".trend-movies-slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;

const movieTitles = ["Invasion", "Mythic Quest", "Inception"];

function showSlide(index) {
  const totalSlide = slides.length;

  // Slayt döngüsü
  if (index >= totalSlide) {
    currentIndex = 0; // İlk slayta döner
  } else if (index < 0) {
    currentIndex = totalSlide - 1; // Son slayta döner
  } else {
    currentIndex = index;
  }

  // Slayt kaydırma işlemi
  const offset = -currentIndex * 100;
  slidermovie.style.transform = `translateX(${offset}%)`;

  // Slayt değiştiğinde yeni film verisini getir
  fetchMovieData(movieTitles[currentIndex], currentIndex);
}

nextButton.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

prevButton.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

// Sayfa yüklendiğinde ilk slayt gösteriliyor
showSlide(currentIndex);

// API'den film verisini çek
async function fetchMovieData(title, slideIndex) {
  const url = `${apiUrl}${apiKey}&t=${title}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayMovieData(data, slideIndex);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

function displayMovieData(data, slideIndex) {
  const movieContent = document.getElementById(`slide${slideIndex + 1}`);
  const moviePoster = document.getElementById(`poster${slideIndex + 1}`);
  const slide = document.querySelectorAll(".blur-background")[slideIndex];

  if (data.Response === "True") {
    movieContent.innerHTML = `
        <h4>${data.Genre}</h4>
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>⭐️⭐️⭐️⭐️⭐️</strong> ${data.imdbRating} | 2h 15m </p>
        <p>${data.Plot}</p>
    `;
    moviePoster.innerHTML = `<img class="trend-movie-img" src="${data.Poster}" alt="Movie Poster" />`;
    slide.style.backgroundImage = `url(${data.Poster})`;
  } else {
    movieContent.innerHTML = `<p>Film bulunamadı: ${data.Error}</p>`;
  }
}
//Check screen size change
function enableSlideClick() {
  slides.forEach((slide) => {
    slide.addEventListener("click", handleSlideClick);
  });
}

function disableSlideClick() {
  slides.forEach((slide) => {
    slide.removeEventListener("click", handleSlideClick);
  });
}

function handleSlideClick(event) {
  showSlide(currentIndex + 1);
}

function checkScreenSize() {
  if (window.innerWidth <= 1400) {
    enableSlideClick();
  } else {
    disableSlideClick();
  }
}

window.addEventListener("resize", checkScreenSize);

checkScreenSize();

// Ebru - News and Events Section - Start
let currentSlide = 0;
const totalSlides = 6; // Toplam kart sayısı
const slideInterval = 5000; // Geçiş süresi (milisaniye cinsinden)

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentSlide) {
      dot.classList.add("active");
    }
  });
}

function slide(direction) {
  const slider = document.getElementById("news-slider");
  const cards = document.querySelectorAll(".news-card");
  const cardWidth = cards[0].offsetWidth + 20; // Kart genişliği + margin
  currentSlide += direction;

  // Sınırları kontrol et
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Geriye giderken son karta
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // İleri giderken başa döner
  }

  slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  updateDots();
}

function goToSlide(slideIndex) {
  const slider = document.getElementById("news-slider");
  const cards = document.querySelectorAll(".news-card");
  const cardWidth = cards[0].offsetWidth + 20; // Kart genişliği + margin
  currentSlide = slideIndex;
  slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  updateDots();
}

function startAutoSlide() {
  return setInterval(() => {
    slide(1); // 1 adım ileri kaydır
  }, slideInterval);
}

function addDotClickListeners() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index); // Tıklanan dot'un indexine göre slayta git
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateDots();
  addDotClickListeners();
  startAutoSlide();
});
// Ebru - News and Events Section - End

// Beyzanurmete - Most Watched Section - Start
const movieBoxes = document.querySelectorAll(".movie-box");
const movieWatchTitles = [
  "For All Mankind",
  "Prehistoric Planet",
  "Lovely Little Farm",
];

async function fetchMovieWatchData(title, index) {
  const url = `${apiUrl}${apiKey}&t=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayMoviePoster(data, index);
  } catch (error) {
    console.error("Film verileri çekilirken hata oluştu:", error);
  }
}

function displayMoviePoster(data, index) {
  const movieBox = movieBoxes[index];
  const movieImage = movieBox.querySelector(".movie-image");
  console.log(data);
  if (data.Response === "True") {
    movieImage.src = data.Poster;
  } else {
    console.error(`Film bulunamadı: ${data.Error}`);
  }
}

async function loadMovies() {
  for (let i = 0; i < movieWatchTitles.length; i++) {
    await fetchMovieWatchData(movieWatchTitles[i], i);
  }
}

loadMovies();

// Beyzanurmete - Most Watched Section - End

/*Melisa Start*/
document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".categories");
  const prevButton = document.querySelector(".arrow-left");
  const nextButton = document.querySelector(".arrow-right");
  const categoryWrappers = document.querySelectorAll(".category-wrapper");
  const totalItems = categoryWrappers.length;
  let index = 0;

  // Ekranda aynı anda gösterilecek öğe sayısı
  const visibleItems = 6;

  // Ekran boyutuna göre visibleItems değerini dinamik olarak ayarlamak için
  function getVisibleItems() {
    const width = window.innerWidth;
    if (width <= 576) return 2;
    if (width <= 768) return 3;
    if (width <= 992) return 4;
    if (width <= 1200) return 5;
    return 6;
  }

  let currentVisible = getVisibleItems();

  // Maksimum kaydırma sayısını hesapla
  function getMaxIndex() {
    return totalItems - currentVisible;
  }

  let maxIndex = getMaxIndex();

  // Slider'ı güncellemek için bir fonksiyon
  function updateSliderPosition() {
    const transformValue =
      index * (sliderContainer.clientWidth / currentVisible);
    sliderContainer.style.transform = `translateX(-${transformValue}px)`;
  }

  // Sonraki slayta geçiş
  function sliderNext() {
    if (index < maxIndex) {
      index++;
    } else {
      index = 0; // Baştan başla
    }
    updateSliderPosition();
  }

  // Önceki slayta dönüş
  function sliderPrev() {
    if (index > 0) {
      index--;
    } else {
      index = maxIndex; // Son slayta dön
    }
    updateSliderPosition();
  }

  // Ok butonları için olay dinleyicileri
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", sliderPrev);
    nextButton.addEventListener("click", sliderNext);
  }

  // İlk slaytı göster
  updateSliderPosition();

  // Pencere boyutu değiştiğinde visibleItems ve maxIndex güncelle
  window.addEventListener("resize", () => {
    currentVisible = getVisibleItems();
    maxIndex = getMaxIndex();
    if (index > maxIndex) {
      index = maxIndex;
    }
    updateSliderPosition();
  });
});
/*Melisa End*/

/*Beyza Start*/
document.querySelectorAll(".collab-box").forEach((box) => {
  box.addEventListener("click", function () {
    toggleContent(this);
  });
});

function toggleContent(element) {
  // Diğer tüm "active" sınıfını kaldır
  document.querySelectorAll(".collab-box").forEach((box) => {
    if (box !== element) {
      box.classList.remove("active");
    }
  });

  // Tıklanan öğenin "active" sınıfını değiştir
  element.classList.toggle("active");
}
/*Beyza End*/
function ToggleContent(element) {
  document.querySelectorAll("second-box-btn").forEach((box) => {
    if (box !== element) {
      box.classList.remove("active");
    }
  });

  element.classList.toggle("active");
}
document.querySelectorAll(".second-box-btn").forEach((box) => {
  box.addEventListener("click", function () {
    toggleContent(this);
  });
});

// melikeaksoy/BE-5-Header-section start

document
  .querySelector(".hamburger-menu")
  .addEventListener("click", function () {
    const mobileMenu = document.querySelector(".mobile-menu");
    const hamburgerIcon = document.querySelector(".hamburger-menu");

    // Menüyü görünür kılma veya gizleme
    if (mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      hamburgerIcon.textContent = "\u2630"; // Menü açılınca çarpı işaretine dönüş
    } else {
      mobileMenu.classList.add("open");
      hamburgerIcon.textContent = "\u00D7"; // Menü kapanınca üç çizgiye dönüş
    }
  });

const settingBar = document.querySelector(".settings-menu");
const hiddenMenu = document.querySelector(".menu-hidden");

settingBar.addEventListener("click", () => {
  hiddenMenu.classList.toggle("active");
});

// melikeaksoy/BE-5-Header-section end
//Dark-Light Mode Section Start
const themeIcon = document.getElementById("theme-icon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
} else {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}

themeIcon.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  }
});
//Dark-Light Mode Section End
// Cookie Banner-Start
document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookieBtn = document.getElementById("cookieBtn");

  //Check if clicted ACCEPT-Btn
  if (localStorage.getItem("cookieBtn")) {
    cookieBanner.style.display = "none";
  }

  acceptCookieBtn.addEventListener("click", function () {
    localStorage.setItem("cookieBtn", true);
    cookieBanner.style.display = "none";
  });
});
// Cookie Banner-End
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("myVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = playPauseBtn.querySelector(".play-btn");
  const pauseIcon = playPauseBtn.querySelector(".pause-btn");
  // Butona tıklama olayı ekliyoruz
  playPauseBtn.addEventListener("click", () => {
    if (video.paused || video.ended) {
      video.play(); // Video oynatılıyor
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    } else {
      video.pause(); // Video durduruluyor
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  });
  // Video sona erdiğinde play tuşuna geri dön
  video.addEventListener("ended", () => {
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  });
});
