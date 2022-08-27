// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// import {fetchPictures} from './fetchPictures'

// const inputForm =  document.querySelector('input');
// const searchBtn = document.querySelector('button[type="submit"]');
// const moreBtn = document.querySelector('.load-more');
// const searchForm = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');


// searchForm.addEventListener('submit', onSearch);

// // function onSearch (event) {
// //     event.preventDefault();
// //     // gallery.innerHTML = hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
// //     //     return `
// //     //     <a class="gallery__link" href="${largeImageURL}">
// //     //     <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
// //     //     <div class="info">
// //     //       <p class="info-item"><b>Likes</b>${likes}</p>
// //     //       <p class="info-item"><b>Views</b>${views}</p>
// //     //       <p class="info-item"><b>Comments</b>${comments}</p>
// //     //       <p class="info-item"><b>Downloads</b>${downloads}</p>
// //     //     </div>
// //     //   </div>
// //     // </a>`
// //     // })
// //     // .join('');
// //     // силка на інпут
// //     const inputValue = inputForm.value.trim();
// //     if (inputValue.length !== 0) {
         
// //         fetchPictures(inputValue)
// //         .then(searchCountry)
// //         .catch(error => {
// //             Notiflix.Notify.failure('Oops, there is no country with that name')
// //         });
// //     }
// // }

// // // function searchCountry (hits) {
// // //     gallery.innerHTML = hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
// // //         return `
// // //         <a class="gallery__link" href="${largeImageURL}">
// // //         <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
// // //         <div class="info">
// // //           <p class="info-item"><b>Likes</b>${likes}</p>
// // //           <p class="info-item"><b>Views</b>${views}</p>
// // //           <p class="info-item"><b>Comments</b>${comments}</p>
// // //           <p class="info-item"><b>Downloads</b>${downloads}</p>
// // //         </div>
// // //       </div>
// // //     </a>`
// // //     })
// // //     .join('');
// // // };

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



import Notiflix from 'notiflix';
import { fetchPicture } from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let totalPages;

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('input'),
  searchBtn: document.querySelector('button[type="submit"]'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

function onFormSubmited(event) {
  event.preventDefault();
  refs.galleryContainer.innerHTML = '';
  page = 1;
  loadNewPictures();
}

function onLoadMore() {
  page += 1;
  loadNewPictures();
}

async function loadNewPictures() {
  const inputValue = refs.searchInput.value.trim();
  const data = await fetchPicture(inputValue, page);
  totalPages = data.totalHits / 40;
  refs.loadMoreBtn.style.display = 'block';

  if (
    totalPages - page >= -1 &&
    totalPages - page <= 0 &&
    data.hits.length !== 0
  ) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.warning(
      'We are sorry, but you have reached the end of search results.'
    );
  } else if (data.hits.length === 0) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else if (page === 1) {
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
  }

  insertNewPhotos(data.hits);
  smoothScroll();
  simpleGallery.refresh();
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.galleryContainer.firstElementChild.getBoundingClientRect();
  setTimeout(() => {
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }, 550);
}

function buildCards(pictures) {
  const markup = pictures
    .map(
      picture => `
  <div class="photo-card">
  <a href='${picture.largeImageURL}'><img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width=307 height=205/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${picture.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${picture.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${picture.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${picture.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  return markup;
}

function insertNewPhotos(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', buildCards(hits));
}

var simpleGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onFormSubmited);
refs.loadMoreBtn.addEventListener('click', onLoadMore);