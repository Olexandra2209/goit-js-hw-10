import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', getCatData);

function getCatData(event) {
  const catId = event.target.value;
  catInfo.innerHTML = '';
  fetchCatByBreed(catId)
    .then(data => {
      error.style.display = 'none';
      const img = data.url;
      const description = data.breeds[0].description;
      const name = data.breeds[0].name;
      const temperament = data.breeds[0].temperament;

      const catInfoHTML = `
        <div class="cat-details">
          <div class="cat-details-column">
            <h2>${name}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
          </div>
          <img src="${img}" alt="${name}" />
        </div>
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
