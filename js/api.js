// API Service Functions

// Show loading spinner
const showLoading = () => {
    document.getElementById('loading-spinner').style.display = 'flex';
};

// Hide loading spinner
const hideLoading = () => {
    document.getElementById('loading-spinner').style.display = 'none';
};

// Fetch data from API
const fetchData = async (url) => {
    try {
        showLoading();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        hideLoading();
        return data;
    } catch (error) {
        hideLoading();
        console.error('Error fetching data:', error);
        return null;
    }
};

// Get trending movies
const getTrendingMovies = async () => {
    return await fetchData(ENDPOINTS.trending);
};

// Get popular movies
const getPopularMovies = async () => {
    return await fetchData(ENDPOINTS.popular);
};

// Search movies by query
const searchMovies = async (query) => {
    if (!query.trim()) return null;
    return await fetchData(`${ENDPOINTS.search}${encodeURIComponent(query)}`);
};

// Get movie details by ID
const getMovieDetails = async (movieId) => {
    return await fetchData(ENDPOINTS.movieDetails(movieId));
};

// Format movie runtime to hours and minutes
const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

// Format release date to year only
const formatReleaseYear = (releaseDate) => {
    if (!releaseDate) return 'N/A';
    return new Date(releaseDate).getFullYear();
};

// Get full image URL
const getImageUrl = (path, size) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
    return `${IMAGE_BASE_URL}${size}/${path}`;
};

// Get embed URL for watching the movie
const getEmbedUrl = (movieId) => {
    return `${EMBED_BASE_URL}${movieId}`;
};