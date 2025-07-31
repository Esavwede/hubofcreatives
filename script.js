// Hero Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        }
      }
    });
  });

  // CTA Button Interactions
  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Handle specific CTA actions
      const buttonText = this.textContent.trim();

      if (buttonText.includes("Free Brand Audit")) {
        // Scroll to contact section or open contact form
        console.log("Opening brand audit form...");
        // You can add actual form logic here
      } else if (buttonText.includes("View Our Work")) {
        // Scroll to portfolio section
        const portfolioSection = document.querySelector("#portfolio");
        if (portfolioSection) {
          portfolioSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Parallax effect for floating shapes
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-shape");

    parallaxElements.forEach((element, index) => {
      const speed = 0.1 + index * 0.05;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Intersection Observer for animations
  var observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".showcase-card, .stat, .hero-text"
  );
  animateElements.forEach((el) => observer.observe(el));

  // Dynamic stats counter animation
  function animateStats() {
    const stats = document.querySelectorAll(".stat-number");

    stats.forEach((stat) => {
      const finalValue = stat.textContent;
      let currentValue = 0;
      const increment = finalValue.includes("%") ? 5 : 10;
      const duration = 2000;
      const stepTime = duration / (parseInt(finalValue) / increment);

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= parseInt(finalValue)) {
          stat.textContent = finalValue;
          clearInterval(timer);
        } else {
          stat.textContent =
            currentValue +
            (finalValue.includes("%")
              ? "%"
              : finalValue.includes("+")
              ? "+"
              : "");
        }
      }, stepTime);
    });
  }

  // Trigger stats animation when hero section is visible
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateStats, 1000);
            heroObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    heroObserver.observe(heroSection);
  }

  // Preload optimization
  function preloadImages() {
    const imageUrls = [
      // Add any background images or hero images here
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  preloadImages();

  // Performance optimization: Debounce scroll events
  function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Optimized scroll handler
  const optimizedScrollHandler = debounce(function () {
    requestTick();
  }, 10);

  window.addEventListener("scroll", optimizedScrollHandler);
});

// Social Proof Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for animations
  var observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  /*** Contact form */
  class ContactForm {
    constructor() {
      this.form = document.getElementById("contactForm");
      this.submitBtn = document.getElementById("submitBtn");
      this.btnText = document.getElementById("btnText");
      this.successMessage = document.getElementById("successMessage");
      this.init();
    }

    init() {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));

      // Real-time validation
      const inputs = this.form.querySelectorAll(".form-input, .form-textarea");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => this.validateField(input));
        input.addEventListener("input", () => this.clearError(input));
      });
    }

    validateField(field) {
      const value = field.value.trim();
      const fieldName = field.name;
      let isValid = true;
      let errorMessage = "";

      switch (fieldName) {
        case "name":
          if (!value) {
            errorMessage = "Please enter your name";
            isValid = false;
          } else if (value.length < 2) {
            errorMessage = "Name must be at least 2 characters long";
            isValid = false;
          }
          break;

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            errorMessage = "Please enter your email address";
            isValid = false;
          } else if (!emailRegex.test(value)) {
            errorMessage = "Please enter a valid email address";
            isValid = false;
          }
          break;

        case "message":
          if (!value) {
            errorMessage = "Please enter your message";
            isValid = false;
          } else if (value.length < 10) {
            errorMessage = "Message must be at least 10 characters long";
            isValid = false;
          }
          break;
      }

      this.showError(field, errorMessage, !isValid);
      return isValid;
    }

    showError(field, message, show) {
      const errorElement = document.getElementById(field.name + "Error");

      if (show) {
        field.classList.add("error");
        errorElement.textContent = message;
        errorElement.classList.add("show");
      } else {
        field.classList.remove("error");
        errorElement.classList.remove("show");
      }
    }

    clearError(field) {
      field.classList.remove("error");
      const errorElement = document.getElementById(field.name + "Error");
      errorElement.classList.remove("show");
    }

    validateForm() {
      const fields = ["name", "email", "message"];
      let isValid = true;

      fields.forEach((fieldName) => {
        const field = document.getElementById(fieldName);
        if (!this.validateField(field)) {
          isValid = false;
        }
      });

      return isValid;
    }

    async handleSubmit(e) {
      e.preventDefault();

      if (!this.validateForm()) {
        return;
      }

      // Show loading state
      this.setLoadingState(true);

      // Simulate form submission (replace with your actual form submission logic)
      try {
        await this.simulateFormSubmission();
        this.showSuccess();
        this.form.reset();
      } catch (error) {
        console.error("Form submission error:", error);
        alert(
          "Sorry, there was an error sending your message. Please try again."
        );
      } finally {
        this.setLoadingState(false);
      }
    }

    async simulateFormSubmission() {
      // Simulate API call delay
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      // Replace this with your actual form submission logic:
      /*
                const formData = new FormData(this.form);
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                return response.json();
                */
    }

    setLoadingState(loading) {
      if (loading) {
        this.submitBtn.disabled = true;
        this.btnText.innerHTML = '<div class="loading"></div>Sending...';
      } else {
        this.submitBtn.disabled = false;
        this.btnText.textContent = "Send Message";
      }
    }

    showSuccess() {
      this.successMessage.classList.add("show");

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.successMessage.classList.remove("show");
      }, 5000);
    }
  }

  // Initialize the contact form when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new ContactForm();
  });

  /** End of contact form code */

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Trigger stats animation for social proof section
        if (entry.target.classList.contains("social-proof-section")) {
          animateSocialStats();
        }
      }
    });
  }, observerOptions);

  // Observe social proof section
  const socialProofSection = document.querySelector(".social-proof-section");
  if (socialProofSection) {
    observer.observe(socialProofSection);
  }

  // Animate stats numbers
  function animateSocialStats() {
    const stats = document.querySelectorAll(".quick-stat .stat-number");

    stats.forEach((stat, index) => {
      setTimeout(() => {
        const finalValue = stat.textContent.trim();
        const hasPercent = finalValue.includes("%");
        const hasPlus = finalValue.includes("+");
        const hasSlash = finalValue.includes("/");

        let numericValue = parseInt(finalValue.replace(/[^\d]/g, ""));
        let currentValue = 0;

        // Different animation speeds for different types
        let duration = 1500;
        let increment = 1;

        if (hasPercent || hasSlash) {
          increment = hasSlash ? 0.1 : 2;
          duration = 1000;
        } else if (numericValue > 100) {
          increment = 5;
          duration = 2000;
        }

        const stepTime = duration / (numericValue / increment);

        const timer = setInterval(() => {
          currentValue += increment;

          if (currentValue >= numericValue) {
            stat.textContent = finalValue;
            clearInterval(timer);
          } else {
            let displayValue = Math.floor(currentValue);

            if (hasSlash) {
              stat.textContent = displayValue / 10 + "/5";
            } else if (hasPercent) {
              stat.textContent = displayValue + "%";
            } else if (hasPlus) {
              stat.textContent = displayValue + "+";
            } else {
              stat.textContent = displayValue;
            }
          }
        }, stepTime);
      }, index * 200); // Stagger the animations
    });
  }

  // Logo carousel pause on hover
  const logoTrack = document.querySelector(".logos-track");
  const logoCarousel = document.querySelector(".logos-carousel");

  if (logoCarousel && logoTrack) {
    logoCarousel.addEventListener("mouseenter", function () {
      logoTrack.style.animationPlayState = "paused";
    });

    logoCarousel.addEventListener("mouseleave", function () {
      logoTrack.style.animationPlayState = "running";
    });
  }

  // Logo click interactions
  const logoItems = document.querySelectorAll(".logo-placeholder");
  logoItems.forEach((logo) => {
    logo.addEventListener("click", function () {
      // Add click effect
      this.style.transform = "scale(0.95) translateY(-5px)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);

      // You can add specific actions for each logo here
      const companyName = this.textContent.trim();
      console.log(`Clicked on ${companyName} - could show case study modal`);
    });
  });

  // Quick stats hover effects
  const quickStats = document.querySelectorAll(".quick-stat");
  quickStats.forEach((stat) => {
    stat.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".icon-circle");
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)";
      }
    });

    stat.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".icon-circle");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });

  // Testimonial interaction
  const testimonialHighlight = document.querySelector(".testimonial-highlight");
  if (testimonialHighlight) {
    testimonialHighlight.addEventListener("click", function () {
      // Could open a modal with more testimonials
      console.log("Opening testimonials modal...");
    });
  }

  // Performance optimization: Reduce animation frequency on mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Adjust animations for mobile performance
  if (isMobile()) {
    const logoTrack = document.querySelector(".logos-track");
    if (logoTrack) {
      logoTrack.style.animationDuration = "40s"; // Slower on mobile
    }
  }

  // Lazy load optimization for better performance
  function lazyLoadElements() {
    const lazyElements = document.querySelectorAll(".logo-placeholder");

    const lazyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("loaded");
            lazyObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    lazyElements.forEach((el) => lazyObserver.observe(el));
  }

  lazyLoadElements();

  // Dynamic testimonial rotation (if you want to add more testimonials later)
  const testimonials = [
    {
      quote:
        "Hub of Creatives transformed our entire brand identity. Our sales increased by 150% within 3 months of the rebrand launch.",
      author: "Jessica Davis",
      title: "CEO, TechFlow Solutions",
      avatar: "JD",
    },
    // Add more testimonials here later
  ];

  function rotateTestimonial() {
    // This function can be used to rotate through multiple testimonials
    // Currently showing just one, but ready for expansion
  }

  // Accessibility improvements
  function enhanceAccessibility() {
    // Add proper ARIA labels
    const logoCarousel = document.querySelector(".logos-carousel");
    if (logoCarousel) {
      logoCarousel.setAttribute("role", "region");
      logoCarousel.setAttribute("aria-label", "Client logos carousel");
    }

    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
      ".logo-placeholder, .quick-stat"
    );
    interactiveElements.forEach((el) => {
      el.setAttribute("tabindex", "0");
      el.addEventListener("keypress", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  enhanceAccessibility();

  // Monitor performance and adjust if needed
  if ("requestIdleCallback" in window) {
    requestIdleCallback(function () {
      // Perform non-critical optimizations when browser is idle
      console.log("Social proof section loaded and optimized");
    });
  }

  // Intersection Observer for step animations
  var observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const stepObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class with staggered delay
        const stepIndex = Array.from(entry.target.parentNode.children).indexOf(
          entry.target
        );
        setTimeout(() => {
          entry.target.classList.add("animate-in");

          // Trigger progress circle animation
          const progressCircle = entry.target.querySelector(".step-progress");
          if (progressCircle) {
            animateProgressCircle(entry.target, stepIndex + 1);
          }
        }, stepIndex * 200);

        // Unobserve after animation
        stepObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all process steps
  const processSteps = document.querySelectorAll(".process-step");
  processSteps.forEach((step) => stepObserver.observe(step));

  // Progress circle animation
  function animateProgressCircle(stepElement, stepNumber) {
    const progressElement = stepElement.querySelector(".step-progress");
    if (!progressElement) return;

    const colors = {
      1: "var(--orange)",
      2: "var(--green)",
      3: "var(--blue)",
      4: "var(--yellow)",
    };

    let progress = 0;
    const targetProgress = stepNumber * 90; // 90, 180, 270, 360 degrees
    const duration = 1500;
    const increment = targetProgress / (duration / 16);

    const animationInterval = setInterval(() => {
      progress += increment;

      if (progress >= targetProgress) {
        progress = targetProgress;
        clearInterval(animationInterval);
      }

      progressElement.style.background = `conic-gradient(${colors[stepNumber]} 0deg, ${colors[stepNumber]} ${progress}deg, transparent ${progress}deg)`;
    }, 16);
  }

  // Step hover interactions
  processSteps.forEach((step, index) => {
    const stepDetails = step.querySelector(".step-details");
    const stepIcon = step.querySelector(".step-icon .icon-circle");

    if (stepDetails && stepIcon) {
      stepDetails.addEventListener("mouseenter", function () {
        // Add hover glow effect
        this.style.boxShadow =
          "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 69, 0, 0.2)";

        // Animate icon
        stepIcon.style.transform = "scale(1.1) rotate(5deg)";
        stepIcon.style.transition = "all 0.3s ease";
      });

      stepDetails.addEventListener("mouseleave", function () {
        this.style.boxShadow = "";
        stepIcon.style.transform = "";
      });
    }
  });

  // Duration badge animation on scroll
  const durationBadges = document.querySelectorAll(".duration-badge");
  const badgeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "scale(1.05)";
          setTimeout(() => {
            entry.target.style.transform = "scale(1)";
          }, 200);
          badgeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  durationBadges.forEach((badge) => badgeObserver.observe(badge));

  // Summary cards counter animation
  const summaryCards = document.querySelectorAll(".summary-card");
  const summaryObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const valueElement = entry.target.querySelector(".summary-value");
          if (valueElement) {
            animateSummaryValue(valueElement);
          }
          summaryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  summaryCards.forEach((card) => summaryObserver.observe(card));

  function animateSummaryValue(element) {
    const finalText = element.textContent.trim();
    const isPercentage = finalText.includes("%");
    const isUnlimited = finalText.toLowerCase().includes("unlimited");
    const hasNumber = /\d/.test(finalText);

    if (isUnlimited || !hasNumber) {
      // For non-numeric values, just add a scale animation
      element.style.transform = "scale(1.2)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 300);
      return;
    }

    // Extract numeric value
    const numericValue = parseInt(finalText.replace(/[^\d]/g, ""));
    let currentValue = 0;
    const duration = 1500;
    const increment = Math.max(1, Math.floor(numericValue / 50));

    const timer = setInterval(() => {
      currentValue += increment;

      if (currentValue >= numericValue) {
        element.textContent = finalText;
        clearInterval(timer);
      } else {
        if (isPercentage) {
          element.textContent = currentValue + "%";
        } else if (finalText.includes("-")) {
          element.textContent =
            currentValue + "-" + (currentValue + 10) + " Days";
        } else {
          element.textContent =
            currentValue + (finalText.includes("Days") ? " Days" : "");
        }
      }
    }, duration / (numericValue / increment));
  }

  // CTA button interactions
  const processCtaButtons = document.querySelectorAll(
    ".process-cta .cta-button"
  );

  // Portfolio Animation on Scroll
  document.addEventListener("DOMContentLoaded", function () {
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    portfolioCards.forEach((card) => {
      observer.observe(card);
    });
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      faqItem.classList.toggle("active");
    });
  });

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formMessage = document.getElementById("formMessage");
      // Simple validation or sending logic here (mocked)
      formMessage.textContent =
        "Thanks for reaching out! We'll get back to you soon.";
      this.reset();
    });
});
