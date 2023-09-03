document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const apiKey = 'NJ14eK563IA5RKL4KiUwrm2GuhJNwElyNUrn97Cz'; 
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImageData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getImageOfTheDay(date) {
  const apiKey = 'NJ14eK563IA5RKL4KiUwrm2GuhJNwElyNUrn97Cz'; 
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImageData(data);
      saveSearch(date);
      addSearchToHistory();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayImageData(data) {
  const currentImageContainer = document.getElementById('current-image-container');

  currentImageContainer.innerHTML = `
  <h2>${data.title}</h2>
  <p>${data.explanation}</p>
`;

  const imageElement = document.createElement('img');
  imageElement.src = data.url;
  imageElement.alt = data.title;

  const titleElement = document.createElement('h2');
  titleElement.textContent = data.title;

  currentImageContainer.appendChild(imageElement);
  currentImageContainer.appendChild(titleElement);
}

function saveSearch(date) {
  let searches = localStorage.getItem('searches');

  if (searches) {
    searches = JSON.parse(searches);
  } else {
    searches = [];
  }

  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
  const searchHistory = document.getElementById('search-history');
  searchHistory.innerHTML = '';

  let searches = localStorage.getItem('searches');

  if (searches) {
    searches = JSON.parse(searches);

    searches.forEach(date => {
      const listItem = document.createElement('li');
      listItem.textContent = date;

      listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
      });

      searchHistory.appendChild(listItem);
    });
  }
}

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchInput = document.getElementById('search-input');
  const selectedDate = searchInput.value;

  if (selectedDate) {
    getImageOfTheDay(selectedDate);
  }
});

addSearchToHistory();