import type { IBlogPost, IBlogPostFields } from '$/@types/generated/contentful';
import { formatDate } from '../dates';
import { fetchGraphQL } from '.';

const POST_GRAPHQL_FIELDS = `
  sys {
    id
    firstPublishedAt
  }
  title
  slug
  summary {
    json
  }
  content {
    json
  }
`;

type RawBlogPostCollection = {
  data: { blogPostCollection: { items: RawBlogPost[] } };
};

type RawBlogPost = IBlogPost &
  IBlogPostFields & { sys: { firstPublishedAt: string } };

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
  )) as RawBlogPostCollection;

  return extractPostEntries(entries);
}

function extractPostEntries(fetchResponse: RawBlogPostCollection) {
  const { items } = fetchResponse?.data.blogPostCollection;
  const posts = items.map((p) => normalizePost(p));

  return posts;
}

function normalizePost(post: RawBlogPost) {
  return {
    id: post.sys.id,
    title: post.title,
    date: formatDate(post.sys.firstPublishedAt),
    slug: post.slug,
  };
}

export type BlogPost = ReturnType<typeof normalizePost>;
export type BlogPostCollection = ReturnType<typeof extractPostEntries>;
