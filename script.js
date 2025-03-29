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
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('send_message.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
        });
    }
    
    // Export Modal Functionality
    const exportModal = document.querySelector('.export-modal');
    const exportModalBtn = document.getElementById('exportModal');
    const closeModal = document.querySelector('.close-modal');
    const exportBtns = document.querySelectorAll('.export-btn');
    
    // Show export modal
    function showExportModal() {
        if (exportModal) {
            exportModal.style.display = 'block';
        }
    }
    
    // Open export modal when clicking the export button
    if (exportModalBtn) {
        exportModalBtn.addEventListener('click', function() {
            showExportModal();
        });
    }
    
    // Close export modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            exportModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === exportModal) {
            exportModal.style.display = 'none';
        }
    });
    
    // Export buttons functionality
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnId = this.id;
            
            switch(btnId) {
                case 'exportHTML':
                    exportFile('index.html');
                    break;
                case 'exportCSS':
                    exportFile('css/styles.css');
                    break;
                case 'exportJS':
                    exportFile('js/script.js');
                    break;
                case 'exportPHP':
                    exportFile('send_message.php');
                    break;
                case 'exportAll':
                    exportFile('all');
                    break;
            }
        });
    });
    
    // Export file function
    function exportFile(fileType) {
        window.location.href = `export.php?file=${fileType}`;
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add active class to nav link based on current section
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
