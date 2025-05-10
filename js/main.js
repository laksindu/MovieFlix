// Main application initialization

// DOM ready function
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the application
    initApp();
    
    // Setup event listeners
    setupEventListeners();
});

// Initialize the application
const initApp = async () => {
    try {
        // Fetch trending movies for hero section
        const trendingData = await getTrendingMovies();
        if (trendingData && trendingData.results && trendingData.results.length > 0) {
            // Get first trending movie for hero section
            const featuredMovie = trendingData.results[0];
            
            // Get full movie details for hero section
            const movieDetails = await getMovieDetails(featuredMovie.id);
            if (movieDetails) {
                renderHeroSection(movieDetails);
            }
            
            // Render trending movies grid (skip the first one as it's in hero)
            renderMovies(trendingData.results.slice(1), 'trending-movies');
        }
        
        // Fetch popular movies
        const popularData = await getPopularMovies();
        if (popularData && popularData.results) {
            renderMovies(popularData.results, 'popular-movies');
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
};

// Setup event listeners
const setupEventListeners = () => {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Clear search
    const clearSearchBtn = document.getElementById('clear-search');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Modal close button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMovieModal);
    }
    
    // Close modal when clicking outside of modal content
    const modal = document.getElementById('movie-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeMovieModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeMovieModal();
            }
        });
    }
};