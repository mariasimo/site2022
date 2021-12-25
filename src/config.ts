const contentful = {
  apiUrl: `https://graphql.contentful.com/content/v1/spaces/${
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? ''
  }`,
  spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  previewAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  previewSecret: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET,
  managementAccessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN ?? '',
};

export default { contentful };
