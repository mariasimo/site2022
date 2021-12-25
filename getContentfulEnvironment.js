const { createClient } = require('contentful-management');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

module.exports = function getContentfulEnvironment() {
  const contentfulClient = createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment('master'));
};
