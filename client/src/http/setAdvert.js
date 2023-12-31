import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const setAdver = (data, reset, fileList, setSuccess) => {
  const token = localStorage.getItem('token');
  const currentData = { ...data, fileStrings: fileList.map((e) => e.data) };

  fetch(`${url}/Adverts/CreateAdvert`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(currentData),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setAdver, data, reset, fileList, setSuccess);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then(() => {
      reset();
      setSuccess('Объявление успешно опубликовано');
    })
    .catch((err) => {
      console.log(err);
    });
};
