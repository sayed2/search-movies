// http://www.omdbapi.com/?apikey=71b0ef96&s=${title}

document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("movieForm");
  // const submitBtn = document.querySelector("button");
  const movieResults = document.getElementById("movieResults");

  movieForm.addEventListener("submit", (e) => {
    const movieName = document.getElementById("movieInput").value;
    // Prevent the browser default
    e.preventDefault();
    searchMovies(movieName);
  });

  // Search for movies
  async function searchMovies(movieName) {
    try {
      // Show Loading
      movieResults.innerHTML = '<div class="loading">Searching movies</div>';
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=71b0ef96&s=${movieName}`
      );
      const data = await response.json();
      if ((data.Response = "False")) {
        movieResults.innerHTML = `
        <div class = 'error-message'>
          ${data.Error} 
        </div>
        `;
      }
      displayMovies(data.Search);
    } catch (error) {
      movieResults.innerHTML = `
      <div class = 'error-message'>
        "Error searching movie. Please try again" 
      </div>
      `;
    }
  }

  // Function to display movies on the page
  function displayMovies(movies) {
    movieResults.innerHTML = `
    <div class = "movies-grid">
        ${movies
          .map(
            (movie) => `
            <div class = "movie-card">
                <img
                    src = "${movie.Poster}"
                    alt = "${movie.Title}"
                    class = "movie-poster"
                />
                <div class = "movie-info">
                    <h3 class = "movie-title">
                        ${movie.Title}
                    </h3>
                    <div class = "movie-year">
                        ${movie.Year}
                    </div>
                </div>
            </div>
            `
          )
          .join("")}
    </div>
    `;
  }
});
