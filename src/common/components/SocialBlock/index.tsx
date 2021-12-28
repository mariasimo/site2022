import { Text, Link } from './styles';

export default function SocialBlock() {
  return (
    <>
      <Text>Also find me at</Text>
      <Link as="a" href={'https://github.com/mariasimo'} target="_blank">
        github.com/mariasimo
      </Link>
      <Text>
        in{' '}
        <Link as="a" href="https://github.com/mariasimo" target="_blank">
          @mariasimo
        </Link>{' '}
        tw{' '}
        <Link as="a" href="https://github.com/mariasimo" target="_blank">
          @mariasimocodes
        </Link>
      </Text>
    </>
  );
}
