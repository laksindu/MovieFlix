// UI related functions

// Create a movie card element
const createMovieCard = (movie) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;

    // Format the poster path
    const posterUrl = getImageUrl(movie.poster_path, POSTER_SIZE);
    
    // Format the release year
    const year = formatReleaseYear(movie.release_date);
    
    // Format the rating
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    card.innerHTML = `
        <div class="movie-poster">
            <img src="${posterUrl}" alt="${movie.title}">
            <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${year}</p>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', () => {
        openMovieModal(movie.id);
    });
    
    return card;
};

// Render movie cards to container
const renderMovies = (movies, containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content
    
    if (!movies || !movies.length) {
        container.innerHTML = '<p class="no-results">No movies found.</p>';
        return;
    }
    
    movies.forEach(movie => {
        container.appendChild(createMovieCard(movie));
    });
};

// Render hero section with a featured movie
const renderHeroSection = (movie) => {
    const heroSection = document.getElementById('hero-section');
    const backdropUrl = getImageUrl(movie.backdrop_path, BACKDROP_SIZE);
    
    // Format the release year
    const year = formatReleaseYear(movie.release_date);
    
    // Format the rating
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    // Get genres (limited to 3)
    const genres = movie.genres || [];
    const genresHtml = genres.slice(0, 3).map(genre => 
        `<span class="hero-genre">${genre.name}</span>`
    ).join('');
    
    heroSection.style.backgroundImage = `url(${backdropUrl})`;
    
    const heroContent = document.createElement('div');
    heroContent.className = 'hero-content';
    
    heroContent.innerHTML = `
        <h1 class="hero-title">${movie.title}</h1>
        <div class="hero-info">
            <div class="hero-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
            <div class="hero-year">${year}</div>
            ${movie.runtime ? `<div class="hero-duration">${formatRuntime(movie.runtime)}</div>` : ''}
        </div>
        <div class="hero-genres">
            ${genresHtml}
        </div>
        <p class="hero-description">${movie.overview}</p>
        <div class="hero-buttons">
            <a href="javascript:void(0)" class="hero-btn watch-btn" data-id="${movie.id}">
                <i class="fas fa-play"></i> Watch Now
            </a>
            <a href="javascript:void(0)" class="hero-btn info-btn" data-id="${movie.id}">
                <i class="fas fa-info-circle"></i> More Info
            </a>
        </div>
    `;
    
    heroSection.innerHTML = '';
    heroSection.appendChild(heroContent);
    
    // Add event listeners to buttons
    const watchBtn = heroContent.querySelector('.watch-btn');
    const infoBtn = heroContent.querySelector('.info-btn');
    
    watchBtn.addEventListener('click', () => {
        if(confirm("If you don't have Adblock installed, just click OK and install it.")){
            window.open("Adblocker.html", "_blank");
        }
        watchMovie(movie.id);
    });
    
    infoBtn.addEventListener('click', () => {
        openMovieModal(movie.id);
    });
};

// Function to handle movie search
const handleSearch = async () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    
    if (!query) return;
    
    const searchResults = await searchMovies(query);
    
    if (searchResults && searchResults.results) {
        // Hide other sections and show search results
        document.querySelectorAll('.movie-section').forEach(section => {
            section.style.display = 'none';
        });
        
        const searchSection = document.getElementById('search-results-section');
        searchSection.style.display = 'block';
        
        renderMovies(searchResults.results, 'search-results');

        // Scroll to search results with smooth animation
        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Clear search and restore default view
const clearSearch = () => {
    document.getElementById('search-input').value = '';
    
    // Hide search results and show other sections
    document.getElementById('search-results-section').style.display = 'none';
    document.querySelectorAll('.movie-section').forEach(section => {
        if (section.id !== 'search-results-section') {
            section.style.display = 'block';
        }
    });

    // Scroll back to top with smooth animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Toggle mobile menu
const toggleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    
    // Animation for hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
};