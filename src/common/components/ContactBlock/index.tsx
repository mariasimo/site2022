import { externalLinks } from '$/common/utils/links';
import { Text, Link } from './styles';

export default function ContactBlock() {
  return (
    <>
      <Text>Coding remotely from Murcia</Text>
      <Text>
        <Link as="a" href={externalLinks.mail} target="_blank">
          holasoymariasimo@gmail.com
        </Link>
      </Text>
      <Text>
        <Link as="a" href={externalLinks.github} target="_blank">
          github.com/mariasimo
        </Link>
      </Text>
    </>
  );
}
