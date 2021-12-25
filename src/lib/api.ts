import config from '$/config';
import type { IBlogPostFields } from '$/@types/generated/contentful';

const POST_GRAPHQL_FIELDS = `
    title
    slug
    summary {
      json
    }
    content {
      json
    }
`;

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

type BlogPostCollection = {
  data: { blogPostCollection: { items: IBlogPostFields[] } };
};

function extractPostEntries(fetchResponse: BlogPostCollection) {
  return fetchResponse?.data.blogPostCollection.items;
}

export async function getAllPostsForHome(preview: boolean) {
  const entries = (await fetchGraphQL(
    `query {
        blogPostCollection(preview: ${preview ? 'true' : 'false'}) {
            items {
            ${POST_GRAPHQL_FIELDS}
            }
        }
        }`,
    preview,
  )) as BlogPostCollection;

  return extractPostEntries(entries);
}
