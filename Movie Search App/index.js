document.getElementById('searchBtn').addEventListener('click', searchMovies);

async function searchMovies() {
  const query = document.getElementById('searchInput').value;
  const apiKey = '2536b9b5'; // OMDB API key
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      displayErrorMessage(data.Error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayMovies(movies) {
  const movieGrid = document.getElementById('movieGrid');
  movieGrid.innerHTML = ''; // Clear previous results

  movies.forEach(movie => {
    const movieCard = `
      <div class="col-md-3">
        <div class="card movie-card" onclick="fetchMovieDetails('${movie.imdbID}')" data-bs-toggle="modal" data-bs-target="#movieModal">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" class="card-img-top movie-poster" alt="${movie.Title}">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">Year: ${movie.Year}</p>
          </div>
        </div>
      </div>`;
    movieGrid.innerHTML += movieCard;
  });
}

function displayErrorMessage(message) {
  const movieGrid = document.getElementById('movieGrid');
  movieGrid.innerHTML = `<p class="text-center text-danger">${message}</p>`;
}

// Fetch full movie details when a card is clicked
async function fetchMovieDetails(imdbID) {
  const apiKey = '2536b9b5'; // OMDB API key
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const movie = await response.json();
    
    displayMovieDetails(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

// Display movie details in the modal
function displayMovieDetails(movie) {
  const movieDetails = document.getElementById('movieDetails');
  
  const detailsHTML = `
    <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" class="img-fluid" alt="${movie.Title}">
      </div>
      <div class="col-md-8">
        <h3>${movie.Title}</h3>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
      </div>
    </div>`;
  
  movieDetails.innerHTML = detailsHTML;
}
