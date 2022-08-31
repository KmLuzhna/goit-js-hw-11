const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api';
const KEY = '29488143-fc1f5e1ea256bfdc98e4452e8';

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
