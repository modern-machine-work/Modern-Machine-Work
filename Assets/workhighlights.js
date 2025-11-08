// Add transition delay to menu items
const menuItems = document.querySelectorAll('#navMenu li');
menuItems.forEach((item, index) => {
    item.style.setProperty('--i', index);
});

// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (menu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Close menu when clicking a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelector('.menu-toggle').classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fade-in animation on scroll with debounce
let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        const elements = document.querySelectorAll('.fade-in:not(.active)');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0;
            if (isVisible) {
                element.classList.add('active');
            }
        });
    });
}

// Initial check for elements in view
window.addEventListener('load', handleScroll);

// Add scroll event listener with passive option for better performance
window.addEventListener('scroll', handleScroll, { passive: true });