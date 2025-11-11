// Handle active state for navigation links
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust for header height
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (href === 'Assets/workhighlights.html') {
            href = 'work-highlights';
        } else {
            href = href.substring(1); // Remove #
        }
        if (href === currentSectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add scroll event listener for active state
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Slideshow functionality with smooth right-to-left animation
let slideIndex = 0;
let slideTimer;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

function showSlides() {
    // Remove prev class from all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "prev");
    }

    // Mark current slide as prev
    slides[slideIndex].classList.add("prev");

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Move to next slide
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Show next slide
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");

    slideTimer = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function currentSlide(n) {
    clearTimeout(slideTimer);

    // Remove classes from all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "prev");
    }

    // Mark current as prev
    slides[slideIndex].classList.add("prev");

    // Update to selected slide
    slideIndex = n;

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");

    slideTimer = setTimeout(showSlides, 5000);
}

// Start slideshow when page loads
window.addEventListener('load', function () {
    // Initialize first slide
    slides[0].classList.add("active");
    dots[0].classList.add("active");
    slideTimer = setTimeout(showSlides, 5000);
});

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('navMenu').classList.remove('active');
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, section');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.classList.add('animate-in');

            // Animate children with delay
            const children = element.querySelectorAll('.scroll-animate:not(.animate-in)');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 200);
            });
        }
    });
}

// Initial check on page load
window.addEventListener('load', function () {
    animateOnScroll();
});

// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            animateOnScroll();
            updateActiveNavLink();
            scrollTimeout = null;
        }, 10);
    }
});

// Initialize everything on load
window.addEventListener('load', () => {
    animateOnScroll();
    updateActiveNavLink();
    updateInfraArrows();
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
            updateInfraArrows();
            resizeTimeout = null;
        }, 100);
    }
});
// Infrastructure scroll functionality
function scrollInfrastructure(direction) {
    const container = document.querySelector('.infra-scroll');
    const cardWidth = document.querySelector('.infra-card').offsetWidth;
    const scrollAmount = (cardWidth + 32) * 1; // 1 cards at a time + gap

    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Update arrow visibility
    setTimeout(() => updateInfraArrows(), 300);
}

function updateInfraArrows() {
    const container = document.querySelector('.infra-scroll');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');

    leftArrow.style.opacity = container.scrollLeft <= 0 ? '0.5' : '1';
    rightArrow.style.opacity =
        Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth ? '0.5' : '1';
}

// Initialize infrastructure scroll
window.addEventListener('load', function () {
    updateInfraArrows();
    window.addEventListener('resize', updateInfraArrows);
});


//Work Highlights page specific scripts can go here

// --- Fade-in effect for highlights section ---
let highlightScrollTimeout;
function handleHighlightScroll() {
  if (highlightScrollTimeout) cancelAnimationFrame(highlightScrollTimeout);
  highlightScrollTimeout = requestAnimationFrame(() => {
    const elements = document.querySelectorAll('.fade-in:not(.active)');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
        el.classList.add('active');
      }
    });
  });
}
window.addEventListener('load', handleHighlightScroll);
window.addEventListener('scroll', handleHighlightScroll, { passive: true });