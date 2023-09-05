import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { getForumTheme } from './getForumTheme';

export const setForumComment = (topicId, text) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/TopicMessages/CreateTopicMessage`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      topicId,
      text,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setForumComment, topicId, text);
        }
        const res = await response.json();
        console.log(res);
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      getForumTheme(topicId);
    })
    .catch((err) => {
      console.log(err);
    });
};
