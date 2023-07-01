import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_14hJxevY1y7lnqGwEVwpPKWvthJ7DM0MLsb3N7uV4Payqz6XzFvbHMLOQMh9CwPL';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_DATA_URL = 'https://api.thecatapi.com/v1/images/search';

function fetchBreeds() {
  return axios(BASE_URL).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios(`${CAT_DATA_URL}?breed_ids=${breedId} `).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data[0];
  });
}

export { fetchBreeds, fetchCatByBreed };
