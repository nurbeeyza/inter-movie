import { apiKey, apiUrl } from "../js/config.js";

window.addEventListener("load", function () {
  const movieTitle = 'Mythic Quest'; // Set the default movie title to fetch
  fetchMovieData(movieTitle); // Fetch movie data when the page loads
});

document.getElementById("searchButton").addEventListener("click", function () {
  const movieTitle = document.getElementById("movieInput").value;
  if (movieTitle) {
    fetchMovieData(movieTitle);
  }
});

async function fetchMovieData(title) {
  const url = `${apiUrl}${apiKey}&t=${title}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovieData(data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

function displayMovieData(data) {
    const resultDiv = document.getElementById("movie-header");
    if (data.Response === "True") {
      resultDiv.style.backgroundImage = `url('${data.Poster}')`;
      resultDiv.innerHTML = `
        <div class="movie-info">
          <h1>${data.Title} (${data.Year})</h1>
          <div class="movie-rating">
            <span>★★★★★ ${data.imdbRating} | 2h 13m</span>
          </div>
          <p class="movie-duration">${data.Runtime}</p>
          <p class="movie-genre">${data.Genre}</p>
           <div class="movie-details-buttons">
              <button class="trailer-btn">WATCH TRAILER</button>
              <button class="full-movie-btn">WATCH FULL MOVIE</button>
            </div>
        </div>
        <div class="movie-poster">
          <img src="${data.Poster}" alt="Poster of ${data.Title}">
          <div class="play-icon">
           <img src="assets/images/moviedetails/Play Button.png" alt="Play Icon">
          </div>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `<p>Movie not found. Please try another title.</p>`;
    }
  }


