import Link from 'next/link';
import { Logo } from '../logo/Logo';

export const LogoLink = () => {
  return (
    <Link href="/" className="z-50 font-extrabold">
      <Logo />
    </Link>
  );
};
