import type { IBlogPost, IBlogPostFields } from '$/@types/generated/contentful';
import { formatDate } from '$/lib/dates';
import { fetchGraphQL } from '.';

const POST_GRAPHQL_FIELDS = `
  title
  sys {
    id
    publishedAt
    firstPublishedAt
  }
  slug
  summary
  markdownContent
  linkedFrom {
    entryCollection {
      items {
        ... on BlogPost {
          title
          slug
        }
      }
    }
  }
  references    
`;

type RawBlogPostCollection = {
  data: { blogPostCollection: { items: RawBlogPost[] } };
};

type RawBlogPost = IBlogPost &
  IBlogPostFields & {
    sys: { firstPublishedAt: string; publishedAt: string };
    references: { links: { [key: string]: string }[] };
    linkedFrom: {
      entryCollection: { items: { title: string; slug: string }[] };
    };
  };

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

  return extractPostList(entries);
}

export async function getPostBySlug(preview: boolean, slug: string) {
  const entries = (await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
  )) as RawBlogPostCollection;

  return extractPostEntry(entries);
}

function extractPostList(fetchResponse: RawBlogPostCollection) {
  const { items } = fetchResponse?.data.blogPostCollection;
  const posts = items.map((p) => normalizePost(p));

  return posts;
}

function extractPostEntry(fetchResponse: RawBlogPostCollection) {
  const { items } = fetchResponse?.data.blogPostCollection;
  const [post] = items.map((p) => normalizePost(p));

  return post;
}

function normalizePost(post: RawBlogPost) {
  return {
    id: post.sys.id,
    title: post.title,
    published: formatDate(post.sys.firstPublishedAt),
    lastUpdated: formatDate(post.sys.publishedAt),
    slug: post.slug,
    summary: post.summary,
    content: post.markdownContent ?? '',
    references: post.references?.links ?? [],
    backlinks: post.linkedFrom.entryCollection.items,
  };
}

export type BlogPost = ReturnType<typeof normalizePost>;
export type BlogPostCollection = ReturnType<typeof extractPostList>;
