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
    <Link href={link} target={target}>
      <Arrow />
      {label}
    </Link>
  );
}
