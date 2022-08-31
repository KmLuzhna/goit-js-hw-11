import './sass/index.scss'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import {fetchPicture} from './fetchPictures'

const inputForm =  document.querySelector('input');
const searchBtn = document.querySelector('button[type="submit"]');
const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');


const lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250, });

let page = 1;



searchForm.addEventListener('submit', onSearch);
loadMoreBtn.classList.add('is-hidden');

function onSearch (event) {
    event.preventDefault();
    gallery.innerHTML = '';
    // силка на інпут
    const inputValue = inputForm.value.trim();
    if (inputValue.length !== 0) {
        page = 1;
        fetchPicture(inputValue, page)
        .then(buildForSearch)
        .catch(error => {
        });
    }
}
// WORK
    function buildForSearch (images) {
      let totalPage = images.totalHits/40;
      
      if (images.totalHits === 0) {
          Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
            );
            gallery.innerHTML = '';
            loadMoreBtn.classList.add('is-hidden');
      }
      if (images.totalHits !== 0) {
          
          Notiflix.Notify.success(
              `Hooray! We found ${images.totalHits} images.`,
            );
            const markup = images.hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
              return `
              <div class="photo-card">
              <a href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" width=310 height=205/></a>
              <div class="info">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
              </div>
            </div>`
          })
          .join('');
          gallery.insertAdjacentHTML('beforeend', markup);
          lightbox.refresh();
          loadMoreBtn.classList.remove('is-hidden');
      };
      if (page > totalPage) {
          loadMoreBtn.classList.add('is-hidden');
    }
      } ;


      function buildForLoadMore (images) {
       let totalPage = images.totalHits/40;
        if (images.totalHits !== 0) {
              const markup = images.hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
                return `
                <div class="photo-card">
                <a href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" width=320 height=210/></a>
                <div class="info">
                  <p class="info-item"><b>Likes</b>${likes}</p>
                  <p class="info-item"><b>Views</b>${views}</p>
                  <p class="info-item"><b>Comments</b>${comments}</p>
                  <p class="info-item"><b>Downloads</b>${downloads}</p>
                </div>
              </div>`
            })
            .join('');
            gallery.insertAdjacentHTML('beforeend', markup);
            lightbox.refresh();
        };
        if (page > totalPage) {
          Notiflix.Notify.warning(
              "We're sorry, but you've reached the end of search results."
            );
            loadMoreBtn.classList.add('is-hidden');
      }
        } ;

    loadMoreBtn.addEventListener('click', onLoadMoreBtn);

    function onLoadMoreBtn(images) {
        const inputValue = inputForm.value.trim();
        if (images.totalHits !== 0) {
            fetchPicture(inputValue, page += 1)
            .then(buildForLoadMore)
            .catch(error => {
            });
        }
      }


// WORK
// function buildForSearch (images) {
//   if (images.totalHits === 0) {
//       Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.',
//         ); 
//         gallery.innerHTML = '';
//   }
//   if (images.totalHits !== 0) {
      
//       Notiflix.Notify.success(
//           `Hooray! We found ${images.totalHits} images.`,
//         );
//         gallery.innerHTML = gallery.innerHTML + images.hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
//           return `
//           <div class="photo-card">
//           <a href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" width=310 height=205/></a>
//           <div class="info">
//             <p class="info-item"><b>Likes</b>${likes}</p>
//             <p class="info-item"><b>Views</b>${views}</p>
//             <p class="info-item"><b>Comments</b>${comments}</p>
//             <p class="info-item"><b>Downloads</b>${downloads}</p>
//           </div>
//         </div>`
//       })
//       .join('');
//       lightbox.refresh();
//   };
//   } ;
