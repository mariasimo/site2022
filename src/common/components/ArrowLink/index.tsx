import { Link, Arrow, IconContainer } from './styles';

export default function ArrowLink({
  label,
  link,
  target,
  backlink,
  className,
}: {
  label: string;
  link: string;
  target?: string;
  backlink?: boolean;
  className?: string;
}) {
  return (
    <Link href={link} target={target} className={className}>
      <IconContainer>
        <Arrow $flip={backlink} />
      </IconContainer>
      {label}
    </Link>
  );
}
