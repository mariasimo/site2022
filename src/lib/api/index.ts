import config from '$/config';

export function fetchGraphQL(query: string, preview = false) {
  return fetch(config.contentful.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview
          ? config.contentful.previewAccessToken ?? ''
          : config.contentful.accessToken ?? ''
      }`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}
