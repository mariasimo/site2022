import { Link, Arrow, IconContainer } from './styles';

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
      <IconContainer>
        <Arrow />
      </IconContainer>
      {label}
    </Link>
  );
}
