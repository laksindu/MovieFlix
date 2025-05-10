// API Configuration
const API_KEY = 'c7bcf175ba313dd60177994273919b60';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'original';
const EMBED_BASE_URL = 'https://www.nontongo.win/embed/movie/';

// Endpoints
const ENDPOINTS = {
    trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    search: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`,
    movieDetails: (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`,
};