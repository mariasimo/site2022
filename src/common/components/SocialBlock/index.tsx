import { externalLinks } from '$/common/utils/links';
import { Text, Link } from './styles';

export default function SocialBlock() {
  return (
    <>
      <Text>Also find me at</Text>
      <Text>
        <Link as="a" href={externalLinks.github} target="_blank">
          github.com/mariasimo
        </Link>
      </Text>
      <Text>
        in{' '}
        <Link as="a" href={externalLinks.linkedin} target="_blank">
          @mariasimo
        </Link>{' '}
        tw{' '}
        <Link as="a" href={externalLinks.twitter} target="_blank">
          @mariasimocodes
        </Link>
      </Text>
    </>
  );
}
