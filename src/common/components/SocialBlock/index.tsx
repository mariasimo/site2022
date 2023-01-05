import { externalLinks } from '$/common/utils/links';
import { Text, Link, SocialAbbr } from './styles';

export default function SocialBlock() {
  return (
    <>
      <Text>Also find me at</Text>

      <Text>
        <SocialAbbr>in</SocialAbbr>
        <Link as="a" href={externalLinks.linkedin} target="_blank">
          @mariasimo
        </Link>{' '}
      </Text>
      <Text>
        <SocialAbbr>tw</SocialAbbr>
        <Link as="a" href={externalLinks.twitter} target="_blank">
          @mariasimocodes
        </Link>
      </Text>
    </>
  );
}
