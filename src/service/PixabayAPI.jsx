import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '14665608-5c267132ac5256a05f9292b82';

const getImage = (query, page) => {
  return axios.get(`${BASE_URL}?key=${KEY}&q=${query}&page=${page}`);
};

export default getImage;
