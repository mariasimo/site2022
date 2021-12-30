import { externalLinks } from '$/common/utils/links';
import { Text, Link } from './styles';

export default function ContactBlock() {
  return (
    <>
      <Text>Currently Based in Madrid</Text>
      <Text>Made in Murcia</Text>
      <Text>
        <Link as="a" href={externalLinks.mail} target="_blank">
          holasoymariasimo@gmail.com
        </Link>
      </Text>
    </>
  );
}
