import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_14hJxevY1y7lnqGwEVwpPKWvthJ7DM0MLsb3N7uV4Payqz6XzFvbHMLOQMh9CwPL';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_DATA_URL = 'https://api.thecatapi.com/v1/images/search';
const loader = document.querySelector('.loader');

function fetchBreeds() {
  loader.style.display = 'block';
  return axios(BASE_URL).then(response => {
    loader.style.display = 'none';
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  loader.style.display = 'block';
  return axios(`${CAT_DATA_URL}?breed_ids=${breedId} `).then(response => {
    loader.style.display = 'none';
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data[0];
  });
}

export { fetchBreeds, fetchCatByBreed };
