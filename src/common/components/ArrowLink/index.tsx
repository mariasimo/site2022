import { Link, Arrow } from './styles';

export default function ArrowLink({
  label,
  link,
  target,
  className,
}: {
  label: string;
  link: string;
  target?: string;
  className?: string;
}) {
  return (
    <Link href={link} target={target} className={className}>
      <Arrow />
      {label}
    </Link>
  );
}
