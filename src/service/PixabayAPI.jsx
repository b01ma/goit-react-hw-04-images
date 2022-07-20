const BASE_URL = 'https://pixabay.com/api/';
const KEY = '14665608-5c267132ac5256a05f9292b82';

const getImage = (query, page, perPage) => {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&per_page=${perPage}`
  );
};

export default getImage;
