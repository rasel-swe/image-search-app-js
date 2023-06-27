const acccssKey = 'jlI-6oEyhUQQ_VhOhZrala4_dyrlKA2uW5g6ttyNMN0';

const formEl = document.querySelector('form');
const inputEl = document.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');
const showMoreButton = document.getElementById('show-more-button');

let inputData = '';
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acccssKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.innerText = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (results.length === 0) {
    showMoreButton.style.display = 'none';
  } else {
    showMoreButton.style.display = 'block';
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener('click', () => {
  searchImages();
});


showMoreButton.style.display = 'none';
