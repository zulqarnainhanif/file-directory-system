import axios from 'axios';

export const get = url => {
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios({
    method: 'GET',
    url: url,
    headers: Headers,
  });
};