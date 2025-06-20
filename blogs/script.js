//  Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

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
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// // Newsletter form submission
// document.getElementById('newsletter-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const email = this.querySelector('input[type="email"]').value;
//     if (email) {
//         alert('Thank you for subscribing! We\'ll send you updates soon.');
//         this.reset();
//     }
// });

// Add scroll animation to blog cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = Math.random() * 0.3 + 's';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.post-card').forEach(card => {
    observer.observe(card);
});

// Add click handlers for blog post cards
document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', function() {
        // You can add navigation logic here
        console.log('Blog post clicked:', this.querySelector('h3').textContent);
    });
});

// Add click handlers for social media buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Social media button clicked');
        // You can add actual social media links here
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console log for successful loading
console.log('BlogSpace landing page loaded successfully!');

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'T' to scroll to top
    if (e.key.toLowerCase() === 't') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        document.getElementById('mobile-menu').classList.add('hidden');
    }
});

// Add dynamic year to copyright
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-bottom p');
if (copyrightElement) {
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
}

// Performance optimization: Lazy load images (if you add actual images later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));