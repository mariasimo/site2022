import { Link, Arrow } from './styles';

export default function ArrowLink({
  label,
  link,
  target,
}: {
  label: string;
  link: string;
  target?: string;
}) {
  return (
    <Link as="a" href={link} target={target}>
      <Arrow />
      {label}
    </Link>
  );
}
