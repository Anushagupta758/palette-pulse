/* ========================================
   PALETTE PULSE - JAVASCRIPT FUNCTIONALITY
   ======================================== */

// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Hide loading spinner after page loads
  const loadingSpinner = document.getElementById("loading-spinner");
  if (loadingSpinner) {
    // Hide spinner after a short delay to ensure smooth transition
    setTimeout(() => {
      loadingSpinner.classList.add("hidden");
    }, 1000);
  }
  /* ========================================
       MOBILE MENU TOGGLE FUNCTIONALITY
       ======================================== */

  // Get the mobile menu toggle button and navigation list
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-list");

  // Add click event listener to toggle mobile menu
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener("click", function () {
      // Toggle the 'active' class on the navigation list
      navList.classList.toggle("active");

      // Toggle the hamburger menu animation
      const spans = mobileMenuToggle.querySelectorAll("span");
      mobileMenuToggle.classList.toggle("active");

      // Animate the hamburger menu (optional enhancement)
      if (mobileMenuToggle.classList.contains("active")) {
        // Transform to X shape
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        // Reset to hamburger shape
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  /* ========================================
       HERO SLIDER FUNCTIONALITY
       ======================================== */

  // Get slider elements
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval;
  let isTransitioning = false;

  // Function to show a specific slide with enhanced transitions
  function showSlide(slideIndex) {
    if (isTransitioning) return; // Prevent rapid clicking during transitions

    isTransitioning = true;

    // Remove all transition classes from slides
    slides.forEach((slide) => {
      slide.classList.remove("active", "prev");
    });

    // Remove active class from all dots
    dots.forEach((dot) => dot.classList.remove("active"));

    // Calculate previous slide index for smooth transitions
    const prevIndex = currentSlide;

    // Add appropriate classes for smooth transitions
    if (
      slideIndex > currentSlide ||
      (currentSlide === slides.length - 1 && slideIndex === 0)
    ) {
      // Moving forward
      slides[prevIndex].classList.add("prev");
      slides[slideIndex].classList.add("active");
    } else {
      // Moving backward
      slides[prevIndex].classList.add("prev");
      slides[slideIndex].classList.add("active");
    }

    // Add active class to current dot
    dots[slideIndex].classList.add("active");

    currentSlide = slideIndex;

    // Reset transition flag after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 800); // Match the CSS transition duration
  }

  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Function to go to previous slide
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Add click event listeners to dots with enhanced interaction
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      if (index !== currentSlide) {
        showSlide(index);
        // Reset the auto-slide timer
        startAutoSlide();
      }
    });
  });

  // Add keyboard navigation for accessibility
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      prevSlide();
      startAutoSlide(); // Reset timer
    } else if (event.key === "ArrowRight") {
      nextSlide();
      startAutoSlide(); // Reset timer
    }
  });

  // Function to start auto-sliding
  function startAutoSlide() {
    // Clear any existing interval
    if (slideInterval) {
      clearInterval(slideInterval);
    }

    // Start new interval (change slide every 6 seconds for better UX)
    slideInterval = setInterval(nextSlide, 6000);
  }

  // Start auto-sliding when page loads
  if (slides.length > 0) {
    startAutoSlide();

    // Pause auto-sliding when user hovers over slider
    const slider = document.getElementById("hero-slider");
    if (slider) {
      slider.addEventListener("mouseenter", function () {
        if (slideInterval) {
          clearInterval(slideInterval);
        }
      });

      slider.addEventListener("mouseleave", function () {
        startAutoSlide();
      });
    }
  }

  /* ========================================
       ADDITIONAL ENHANCEMENTS
       ======================================== */

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation to images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    // Add loading state
    img.addEventListener("load", function () {
      this.style.opacity = "1";
      this.classList.add("loaded");
    });

    img.addEventListener("error", function () {
      console.warn("Image failed to load:", this.src);
      this.style.opacity = "1"; // Show broken image icon
    });

    // Set initial opacity to 0 for fade-in effect
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";

    // If image is already loaded (cached), show it immediately
    if (img.complete) {
      img.style.opacity = "1";
      img.classList.add("loaded");
    }
  });

  // Add scroll effect to header (optional enhancement)
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down - hide header
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up - show header
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add transition to header for smooth hide/show
  if (header) {
    header.style.transition = "transform 0.3s ease";
  }

  /* ========================================
       ERROR HANDLING
       ======================================== */

  // Handle missing elements gracefully
  function handleMissingElements() {
    const requiredElements = [
      { selector: ".mobile-menu-toggle", name: "Mobile menu toggle" },
      { selector: ".nav-list", name: "Navigation list" },
      { selector: ".slide", name: "Slider slides" },
      { selector: ".dot", name: "Slider dots" },
    ];

    requiredElements.forEach((element) => {
      if (!document.querySelector(element.selector)) {
        console.warn(`${element.name} not found in the DOM`);
      }
    });
  }

  // Run error handling
  handleMissingElements();

  /* ========================================
       PERFORMANCE OPTIMIZATIONS
       ======================================== */

  // Debounce scroll events for better performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(function () {
    // Scroll handling code here if needed
  }, 10);

  window.addEventListener("scroll", debouncedScrollHandler);

  /* ========================================
     COUNTDOWN TIMER FUNCTIONALITY
     ======================================== */

  // Countdown timer for promotional banner
  function updateCountdown() {
    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) return;

    // Set target time (24 hours from now)
    const now = new Date().getTime();
    const targetTime = now + 24 * 60 * 60 * 1000; // 24 hours

    function updateTimer() {
      const currentTime = new Date().getTime();
      const timeLeft = targetTime - currentTime;

      if (timeLeft <= 0) {
        countdownElement.textContent = "00:00:00";
        return;
      }

      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.textContent = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // Initialize countdown timer
  updateCountdown();

  console.log("Palette Pulse JavaScript loaded successfully!");
});
