import './sass/index.scss'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import {fetchPictures} from './fetchPictures'

const inputForm =  document.querySelector('input');
const searchBtn = document.querySelector('button[type="submit"]');
const moreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');





searchForm.addEventListener('submit', onSearch);

function onSearch (event) {
    event.preventDefault();
    // силка на інпут
    const inputValue = inputForm.value.trim();
    if (inputValue.length !== 0) {
         
        fetchPictures(inputValue)
        .then(searchCountry)
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name')
        });
    }
}

function searchCountry (images) {
    gallery.innerHTML = images.hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
        return `
        <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
      </div>
    </a>`
    })
    .join('');
};

var simpleLightBox = $('.gallery a').simpleLightbox();
gallery.refresh();



// function renderGallery(images) {
//     const markup = images
//       .map(image => {
//         const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
//         return `
//           <a class="gallery__link" href="${largeImageURL}">
//             <div class="gallery-item" id="${id}">
//               <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//               <div class="info">
//                 <p class="info-item"><b>Likes</b>${likes}</p>
//                 <p class="info-item"><b>Views</b>${views}</p>
//                 <p class="info-item"><b>Comments</b>${comments}</p>
//                 <p class="info-item"><b>Downloads</b>${downloads}</p>
//               </div>
//             </div>
//           </a>
//         `;
//       })
//       .join('');
  
//     gallery.insertAdjacentHTML('beforeend', markup);
//   }

// // ======================================================

// function onSearch (event) {
//     event.preventDefault();
//     const clientRequest = inputForm.value.trim();
//     if (clientRequest.length !== 0) {
         
//         fetchPictures(clientRequest)
//         .then(images => console.log(images))
//         .catch(error => {
//             Notiflix.Notify.failure('Oops, there is no country with that name')
//         });
//     }
// }





// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


