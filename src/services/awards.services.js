import axios from 'axios';

const API_URL = 'https://data-imdb1.p.rapidapi.com/actor/id/nm0000199/awards/';

const headers = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
  'x-rapidapi-key': '8b584d4e92msh8b372f756033b00p181d1ejsnaeb86879e5b1',
};

export default async function getAwards() {
  const response = await axios({
    method: 'GET',
    url: API_URL,
    headers,

  });
  return response.data;
}
