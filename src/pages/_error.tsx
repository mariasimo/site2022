import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = () => ({
  redirect: {
    destination: '/',
    permanent: true,
  },
});

export default getStaticProps;
