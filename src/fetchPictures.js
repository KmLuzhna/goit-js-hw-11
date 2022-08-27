const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api';
const KEY = '29488143-fc1f5e1ea256bfdc98e4452e8';




// // async function fetchPictures(clientRequest, page) {
// //     try {
// //       const response = await axios.get(`${BASE_URL}/?key=${KEY}&q=${clientRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
// //       console.log(response);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }
  
// export {fetchPictures}

// async function fetchPictures(clientRequest, page) {
//   const response = await axios.get(
//     `${BASE_URL}/?key=${KEY}&q=${clientRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//   );
//   return response;
// }

// // export default class NewApiServ {
// //   constructor() {
// //     this.searchQuery = "";
// //     this.page = 1;
  
// //   }
// //   // async function fetchPictures(clientRequest, page) {
// // //     try {
// // //       const response = await axios.get(`${BASE_URL}/?key=${KEY}&q=${clientRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
// // //       console.log(response);
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   }
// // }
 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// const axios = require('axios').default;
// export async function fetchPicture(request, page) {
//   try {
//     const pictures = await axios.get(
//       `https://pixabay.com/api/?key=29111135-c68df28752f5bff5a67727daa&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//     );
//     const response = await pictures.data;
//     return response;
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.status);
//     }
//   }}


export async function fetchPicture(clientRequest, page) {
    try {
      const images = await axios.get(
        `${BASE_URL}/?key=${KEY}&q=${clientRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
        const response = await images.data;
        return response;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.status);
      }
    }
  }
