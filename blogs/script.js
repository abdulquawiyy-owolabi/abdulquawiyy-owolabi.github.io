// Blog Posts Data
const blogPosts = [
     {
        id: 1,
        title: "Land Suitability Study for Solar Power Plant in Kano State",
        excerpt: "GIS and AHP-based multicriteria decision analysis to identify optimal sites for solar farm development in Northern Nigeria.",
        image: "../assets/img/solar_farm.jpg",
        category: "gis",
        date: "2024-05-20",
        readTime: "15 min read",
        link: "../blogs/land suitability/index.html",
        external: false
    },
    {
        id: 2,
        title: "Land Use Classification Using Random Forest and Support Vector Machine",
        excerpt: "Analysis of Sentinel-2 satellite imagery using machine learning to classify land cover in Iwo LGA, Osun State, Nigeria. Focused on spatial patterns, vegetation insights, and model-based classification.",
        image: "../assets/img/land_analysis.png",
        category: "machine-learning",
        date: "2024-03-15",
        readTime: "12 min read",
        link: "https://medium.com/@abdulquawiyyhardisir/satellite-image-classification-using-machine-learning-techniques-for-land-cover-analysis-4c93488f16af",
        external: true
    },
     {
        id: 3,
        title: "Spectral Indices in Remote Sensing: Meaning and Applications (An example)",
        excerpt: "A spectral index is a mathematical combination of two or more wavelengths that enhances the information content of the data. Spectral indices help extract insights on vegetation, soil moisture, and water quality from satellite imagery.",
        image: "../assets/img/spectral.png",
        category: "remote-sensing",
        date: "2023-04-22",
        readTime: "8 min read",
        link: "https://medium.com/@abdulquawiyyhardisir/spectral-indices-in-remote-sensing-meaning-and-applications-an-example-ba2cdc78fa9a",
        external: true
    },
   
];

// Application State
let currentPosts = [];
let displayedPosts = [];
let postsPerLoad = 6;
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const blogGrid = document.getElementById('blog-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');
const noResults = document.getElementById('no-results');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('back-to-top');
const loadingIndicator = document.getElementById('loading-indicator');
const currentYearElement = document.getElementById('current-year');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setCurrentYear();
});

function initializeApp() {
    currentPosts = [...blogPosts];
    displayedPosts = [];
    loadInitialPosts();
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', loadMorePosts);
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    // Back to top functionality
    backToTopButton.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);
    
    // Newsletter subscription (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubscription);
    }
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-content a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase().trim();
    filterPosts();
}

function handleFilter(event) {
    // Remove active class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update current filter
    currentFilter = event.target.dataset.category;
    
    // Filter posts
    filterPosts();
}

function filterPosts() {
    showLoading();
    
    setTimeout(() => {
        // Apply filters
        currentPosts = blogPosts.filter(post => {
            const matchesCategory = currentFilter === 'all' || post.category === currentFilter;
            const matchesSearch = searchQuery === '' || 
                post.title.toLowerCase().includes(searchQuery) ||
                post.excerpt.toLowerCase().includes(searchQuery);
            
            return matchesCategory && matchesSearch;
        });
        
        // Reset displayed posts
        displayedPosts = [];
        blogGrid.innerHTML = '';
        
        // Load initial posts
        loadInitialPosts();
        hideLoading();
    }, 500);
}

function loadInitialPosts() {
    const postsToLoad = currentPosts.slice(0, postsPerLoad);
    displayedPosts = [...postsToLoad];
    renderPosts(postsToLoad);
    updateLoadMoreButton();
    updateNoResults();
}

function loadMorePosts() {
    showLoading();
    
    setTimeout(() => {
        const nextBatch = currentPosts.slice(displayedPosts.length, displayedPosts.length + postsPerLoad);
        displayedPosts = [...displayedPosts, ...nextBatch];
        renderPosts(nextBatch, true);
        updateLoadMoreButton();
        hideLoading();
    }, 800);
}

function renderPosts(posts, append = false) {
    if (!append) {
        blogGrid.innerHTML = '';
    }
    
    posts.forEach((post, index) => {
        const postElement = createPostElement(post);
        blogGrid.appendChild(postElement);
        
        // Add staggered animation
        setTimeout(() => {
            postElement.classList.add('fade-in');
        }, index * 100);
    });
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    const getCategoryName = (category) => {
        const categoryMap = {
            'remote-sensing': 'Remote Sensing',
            'gis': 'GIS',
            'machine-learning': 'Machine Learning',
            'analysis': 'Spatial Analysis',
            'environment': 'Environment'
        };
        return categoryMap[category] || category;
    };
    
    article.innerHTML = `
        <div class="blog-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-category">${getCategoryName(post.category)}</span>
                <span class="blog-date">${formatDate(post.date)}</span>
            </div>
            <h3 class="blog-title">
                <a href="${post.link}" ${post.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    ${post.title}
                </a>
            </h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="${post.link}" ${post.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="read-more">
                Read More <i class="fas fa-${post.external ? 'external-link-alt' : 'arrow-right'}"></i>
            </a>
        </div>
    `;
    
    return article;
}

function updateLoadMoreButton() {
    if (displayedPosts.length >= currentPosts.length) {
        loadMoreContainer.classList.add('hidden');
    } else {
        loadMoreContainer.classList.remove('hidden');
    }
}

function updateNoResults() {
    if (currentPosts.length === 0) {
        noResults.classList.remove('hidden');
        blogGrid.classList.add('hidden');
        loadMoreContainer.classList.add('hidden');
    } else {
        noResults.classList.add('hidden');
        blogGrid.classList.remove('hidden');
    }
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScroll() {
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    // Add navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

function handleNewsletterSubscription(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    
    if (email) {
        // Simulate API call
        showLoading();
        setTimeout(() => {
            hideLoading();
            alert('Thank you for subscribing! You will receive updates on new blog posts.');
            document.getElementById('newsletter-email').value = '';
        }, 1000);
    }
}

function showLoading() {
    loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

function setCurrentYear() {
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Utility function for debouncing
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

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Handle external links
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
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
    
    // Search focus with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});