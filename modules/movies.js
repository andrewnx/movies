const moviesDiv = document.getElementById("movies");

import { getPopularMovies } from "./api.js";
import { getMovieDetails } from "./api.js";
import { config } from "./config.js";

const IMAGE_BASE_URL = config.image_base_url;

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

export async function renderMovies() {
  const movies = await getPopularMovies();
  console.log(movies);
  moviesDiv.innerHTML = movies
    ?.map((movie) => renderSingleMovie(movie))
    .join("");
}

export async function renderMovieDetail() {
  const movies = await getMovieDetails(params.id);
  console.log(params.id);
  console.log(movies);
  moviesDiv.innerHTML = renderMovieDetails(movies);
  console.log(
    movies.release_dates.results.find((item) => item.iso_3166_1 === "US")
  );
}

function renderSingleMovie(movie) {
  var stringDate = new Date(movie.release_date);

  return `
        <div class="col-4 col-lg-3 col-xl-2 p-0 m-1 rounded overflow-hidden border" style="background-color: rgba(0,0,0,0.5)">
        <a href="./movie.html?id=${movie.id}"><img src="${
    config.image_base_url + movie?.poster_path
  }" class="img-fluid" ></a>
            <p class="text-center neonText"><strong>${movie.title}</strong></p>
            <p class="text-center neonText">${stringDate.toDateString()}</p>
        </div>
        `;
}

function renderMovieDetails(movie) {
  var num = movie.runtime;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  return `
        <div class="col-12 p-4 m-1 rounded overflow-hidden border d-flex bg-image"
            style="
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0.95) 100%),url('${
                  IMAGE_BASE_URL + movie?.backdrop_path
                }');
                background-size: cover;
            "
            >
            <div class="col-3 p-0 rounded border overflow-hidden ">
               <img src="${
                 config.image_base_url + movie?.poster_path
               }" class="img-fluid" >
            </div>
            <div class="col-8 p-0  overflow-hidden">
                <p><h2>${movie.title}</h2></p>
                <p>${
                  movie.release_dates.results.find(
                    (item) => item.iso_3166_1 === "US"
                  ).release_dates[0].certification
                } • ${movie.release_date} • ${
    movie.genres[0].name
  } • ${rhours}h${rminutes}m</p>
                
                <p>${movie.tagline}</p>
                <p><h4>Overview</h4>${movie.overview}</p>
                <table>
                <tr>
                <th>${movie.credits.cast[0].name}</th><th>${
    movie.credits.cast[1].name
  }</th><th>${movie.credits.crew[0].name}</th><th>${
    movie.credits.crew[1].name
  }</th>
                </tr>
                <tr>
                <td>${movie.credits.cast[0].character}</td><td>${
    movie.credits.cast[1].character
  }</td><td>${movie.credits.crew[0].job}</td><td>${
    movie.credits.crew[1].job
  }</td>
                </tr>
                </table>
            </div>
        </div>
        
        `;
}
