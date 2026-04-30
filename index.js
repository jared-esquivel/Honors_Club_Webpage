"use strict";

// Mobile navigation: keeps the phone experience clean without crowding the header.
const navToggle = document.querySelector(".nav_toggle");
const navLinks = document.querySelector(".nav_links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// FAQ: uses buttons and aria-expanded so keyboard and screen-reader users can use it.
const faqItems = document.querySelectorAll(".faq_item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq_question");

  question.addEventListener("click", () => {
    const isAlreadyOpen = item.classList.contains("active");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
      otherItem
        .querySelector(".faq_question")
        .setAttribute("aria-expanded", "false");
    });

    if (!isAlreadyOpen) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

// Officer carousel: checks elements first so the page does not break if HTML changes later.
const officers = [
  {
    name: "Officer Name",
    role: "President",
    image: "Assets/officer1.jpg",
  },
  {
    name: "Officer Name",
    role: "Vice President",
    image: "Assets/officer2.jpg",
  },
  {
    name: "Officer Name",
    role: "Secretary",
    image: "Assets/officer3.jpg",
  },
];

let officerIndex = 0;

const officerImage = document.getElementById("officerImage");
const officerName = document.getElementById("officerName");
const officerRole = document.getElementById("officerRole");
const officerLeft = document.querySelector(".officer_left");
const officerRight = document.querySelector(".officer_right");

function showOfficer(index) {
  if (!officerImage || !officerName || !officerRole) return;

  officerImage.src = officers[index].image;
  officerImage.alt = `${officers[index].name}, ${officers[index].role}`;
  officerName.textContent = officers[index].name;
  officerRole.textContent = officers[index].role;
}

if (officerLeft && officerRight) {
  officerLeft.addEventListener("click", () => {
    officerIndex = (officerIndex - 1 + officers.length) % officers.length;
    showOfficer(officerIndex);
  });

  officerRight.addEventListener("click", () => {
    officerIndex = (officerIndex + 1) % officers.length;
    showOfficer(officerIndex);
  });
}

showOfficer(officerIndex);

// =========================
// HERO IMAGE CAROUSEL
// =========================

// UX: Keep this simple + fast (no libraries, no heavy logic)

const images = [
  "Assets/graduation.png",
  "Assets/students_walking.png",
  "Assets/running_students.png",
  "Assets/graduation.png", // add more if you want
];

let currentIndex = 0;

const carouselImg = document.querySelector(".carousel_img");
const leftBtn = document.querySelector(".arrow_leftside");
const rightBtn = document.querySelector(".arrow_rightside");
const dots = document.querySelectorAll(".dot");

let autoPlayInterval;

// WHY: Single function keeps UI in sync (image + dots)
function updateCarousel(index) {
  if (!carouselImg) return;

  currentIndex = index;

  carouselImg.src = images[currentIndex];

  dots.forEach((dot, i) => {
    dot.classList.toggle("dot_being_active", i === currentIndex);
    dot.classList.toggle("active_dot", i === currentIndex);
  });
}

// WHY: Loop forward infinitely (better UX than stopping)
function nextSlide() {
  const next = (currentIndex + 1) % images.length;
  updateCarousel(next);
}

// WHY: Loop backward infinitely
function prevSlide() {
  const prev = (currentIndex - 1 + images.length) % images.length;
  updateCarousel(prev);
}

// Buttons
if (rightBtn) {
  rightBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay(); // UX: don’t fight the user
  });
}

if (leftBtn) {
  leftBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });
}

// Dots (tap-friendly navigation)
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateCarousel(index);
    resetAutoPlay();
  });
});

// =========================
// AUTO PLAY (MOBILE FRIENDLY)
// =========================

// WHY: subtle motion adds life without being distracting
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 6000); // 4s is ideal for readability
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// WHY: reset after user interaction
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Pause when user hovers (desktop) or touches (mobile)
const carousel = document.querySelector(".hero_card");

if (carousel) {
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);
  carousel.addEventListener("touchstart", stopAutoPlay);
  carousel.addEventListener("touchend", startAutoPlay);
}

// Initialize
if (carouselImg && leftBtn && rightBtn && dots.length > 0) {
  updateCarousel(0);
  startAutoPlay();
}

//=================
// ANIMATIONS
//=================

const reveals = document.querySelectorAll(".reveal");

function handleScrollReveal() {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScrollReveal);
handleScrollReveal();

//cursor glow

//===================
// END OF ANIMATIONS
//===================
