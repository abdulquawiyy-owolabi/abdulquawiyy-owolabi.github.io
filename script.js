// Portfolio JavaScript
(function() {
    'use strict';

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const contactForm = document.getElementById('contactForm');
    const portfolioFilters = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const toast = document.getElementById('toast');

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        const isActive = sidebar.classList.contains('active');
        
        if (isActive) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scroll to section
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = window.innerWidth <= 1024 ? 80 : 0;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 1024) {
                closeMobileMenu();
            }
        }
    }

    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Portfolio filtering
    function filterPortfolio(filter) {
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === '*' || category === filter) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                
                // Trigger animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        toastMessage.textContent = message;
        
        // Update icon and color based on type
        if (type === 'success') {
            toastIcon.className = 'fas fa-check-circle toast-icon';
            toast.style.backgroundColor = '#10b981';
        } else if (type === 'error') {
            toastIcon.className = 'fas fa-times-circle toast-icon';
            toast.style.backgroundColor = '#ef4444';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Handle contact form submission
    async function handleFormSubmission(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            
        } catch (error) {
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Handle scroll events
    function handleScroll() {
        // Update active navigation
        updateActiveNavLink();
        
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Add scroll effect to hero particles
        const particles = document.querySelectorAll('.hero-particle');
        const scrolled = window.scrollY;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // Initialize animations on scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Set current year in footer
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Add smooth scroll behavior to anchor links
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });
    }

    // Initialize performance optimizations
    function initPerformanceOptimizations() {
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 16); // ~60fps
            }
        });
        
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize logic here if needed
                if (window.innerWidth > 1024) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Overlay click to close menu
        if (overlay) {
            overlay.addEventListener('click', closeMobileMenu);
        }
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                scrollToSection(sectionId);
            });
        });
        
        // Portfolio filters
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                filter.classList.add('active');
                
                // Filter portfolio items
                const filterValue = filter.getAttribute('data-filter');
                filterPortfolio(filterValue);
            });
        });
        
        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmission);
        }
        
        // Scroll to top button
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Initialize features
        setCurrentYear();
        initSmoothScroll();
        initScrollAnimations();
        initLazyLoading();
        initPerformanceOptimizations();
        
        // Initial scroll handler call
        handleScroll();
        
        // Add loading class to body to trigger entrance animations
        document.body.classList.add('loaded');
    });

    // Global functions (accessible from HTML)
    window.scrollToSection = scrollToSection;
    window.showToast = showToast;

    // Handle external link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.target) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Navigate sections with arrow keys (when not in form elements)
        if (!e.target.matches('input, textarea, select')) {
            const currentActive = document.querySelector('.nav-link.active');
            const allNavLinks = Array.from(navLinks);
            const currentIndex = allNavLinks.indexOf(currentActive);
            
            if (e.key === 'ArrowDown' && currentIndex < allNavLinks.length - 1) {
                e.preventDefault();
                const nextSection = allNavLinks[currentIndex + 1].getAttribute('data-section');
                scrollToSection(nextSection);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                const prevSection = allNavLinks[currentIndex - 1].getAttribute('data-section');
                scrollToSection(prevSection);
            }
        }
    });

    // Add touch swipe support for mobile navigation
    let startX, startY, endX, endY;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50 && sidebar.classList.contains('active')) {
                // Swipe left to close menu
                closeMobileMenu();
            } else if (diffX < -50 && !sidebar.classList.contains('active') && startX < 50) {
                // Swipe right from left edge to open menu
                toggleMobileMenu();
            }
        }
        
        // Reset values
        startX = startY = endX = endY = null;
    }, { passive: true });

    // Progressive Web App support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Register service worker if available
            // navigator.serviceWorker.register('/sw.js');
        });
    }

    // Handle print styles
    window.addEventListener('beforeprint', () => {
        // Ensure all content is visible when printing
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
    });

})();