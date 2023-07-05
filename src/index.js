import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', getCatData);

function getCatData(event) {
  const catId = event.target.value;
  fetchCatByBreed(catId)
    .then(data => {
      error.style.display = 'none';
      const img = data.url;
      const description = data.breeds[0].description;
      const name = data.breeds[0].name;
      const temperament = data.breeds[0].temperament;

      const catInfoHTML = `
        <img src="${img}" alt="${name}" />
        <h2>${name}</h2>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      `;
      catInfo.innerHTML = catInfoHTML;
    })
    .catch(() => {
      error.style.display = 'block';
    });
}

fetchBreeds()
  .then(cats => {
    error.style.display = 'none';
    cats.map(cat => {
      const option = `<option value="${cat.id}">${cat.name}</option>`;
      select.insertAdjacentHTML('beforeend', option);
    });
  })
  .catch(() => {
    error.style.display = 'block';
  });
