// Modal related functions

// Open movie modal with details
const openMovieModal = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    if (!movieDetails) return;
    
    const modalBody = document.getElementById('modal-body');
    
    // Format the backdrop path
    const backdropUrl = getImageUrl(movieDetails.backdrop_path, BACKDROP_SIZE);
    
    // Format the poster path
    const posterUrl = getImageUrl(movieDetails.poster_path, POSTER_SIZE);
    
    // Format the release year
    const year = formatReleaseYear(movieDetails.release_date);
    
    // Format the runtime
    const runtime = formatRuntime(movieDetails.runtime);
    
    // Format the rating
    const rating = movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A';
    
    // Get genres
    const genres = movieDetails.genres || [];
    const genresHtml = genres.map(genre => 
        `<span class="modal-genre">${genre.name}</span>`
    ).join('');
    
    modalBody.innerHTML = `
        <div class="modal-backdrop" style="background-image: url(${backdropUrl})"></div>
        <div class="modal-details">
            <div class="modal-poster">
                <img src="${posterUrl}" alt="${movieDetails.title}">
            </div>
            <div class="modal-info">
                <h1 class="modal-title">${movieDetails.title}</h1>
                <div class="modal-meta">
                    <div class="modal-year">${year}</div>
                    <div class="modal-runtime">${runtime}</div>
                    <div class="modal-rating">
                        <i class="fas fa-star"></i> ${rating}
                    </div>
                </div>
                <div class="modal-genres">
                    ${genresHtml}
                </div>
                <p class="modal-overview">${movieDetails.overview}</p>
                <div class="modal-actions">
                    <a href="javascript:void(0)" class="watch-now-btn" data-id="${movieDetails.id}">
                        <i class="fas fa-play"></i> Watch Now
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener to watch button
    const watchBtn = modalBody.querySelector('.watch-now-btn');
    watchBtn.addEventListener('click', () => {
        if(confirm("If you don't have Adblock installed, just click OK and install it.")) {
            window.open("Adblocker.html", "_blank");
        }
        watchMovie(movieDetails.id);
    });
    
    // Show the modal
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'block';
    
    // Prevent scrolling of body
    document.body.style.overflow = 'hidden';
};

// Close the movie modal
const closeMovieModal = () => {
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
};

// Watch the movie (open in new tab)
const watchMovie = (movieId) => {
    const embedUrl = getEmbedUrl(movieId);
    window.open(embedUrl, '_blank');
};