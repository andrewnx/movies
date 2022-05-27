import { config } from "./config.js";

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;
const API_TOKEN = config.api_token;

export async function getPopularMovies(page = 1) {
  let data = [];
  try {
    const response = await fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const responseData = await response.json();
    data = responseData?.results;
  } catch (error) {
    console.log(error);
  }
  return data;
}

export async function getMovieDetails(movieID, page = 1) {
  let data = [];
  try {
    const response = await fetch(
      `${BASE_URL}movie/${movieID}?append_to_response=credits,release_dates&page=${page}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        }),
      }
    );
    const responseData = await response.json();
    data = responseData;
  } catch (error) {
    console.log(error);
  }
  return data;
}
