import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';

export const getEventBySection = (category, setRenderData) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Events/FindBySubsectionName`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      subsectionName: category,
      sectionName: 'Events',
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getEventBySection, category, setRenderData);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      setRenderData(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
