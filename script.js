document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const downloadCVBtn = document.getElementById('downloadCV');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Toggle sidebar on menu click
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking a navigation link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
            
            // Active link state
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Download CV button
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showExportModal();
        });
    }
    
    // Scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the contact form
    const contactForm = document.getElementById('contactForm');
    
    // Add submit event listener to the form
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get the submit button
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        // Change button text and disable it during submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Create FormData object from the form
        const formData = new FormData(contactForm);
        
        // Send the form data using fetch API
        fetch('send_message.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = data.status === 'success' 
                ? 'notification success-message' 
                : 'notification error-message';
            notification.textContent = data.message;
            
            // Add notification before the form
            contactForm.parentNode.insertBefore(notification, contactForm);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.remove();
            }, 5000);
            
            // Clear form on success
            if (data.status === 'success') {
                contactForm.reset();
            }
        })
        .catch(error => {
            // Create error notification
            const notification = document.createElement('div');
            notification.className = 'notification error-message';
            notification.textContent = 'There was a problem sending your message. Please try again later.';
            
            // Add notification before the form
            contactForm.parentNode.insertBefore(notification, contactForm);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.remove();
            }, 5000);
            
            console.error('Error:', error);
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});
            }
        });
    });
});
