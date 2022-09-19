import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const API = async (imageTitle, page, per_page) => {
  return await axios
    .get(
      `/?q=${imageTitle}&page=${page}&key=29205442-de93c714ea8b3e401a30c89a2&image_type=photo&orientation=horizontal&per_page=${per_page}`
    )
    .then(res => res.data);
};
