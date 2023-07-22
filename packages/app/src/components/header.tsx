import { config } from '@/utils/config';
import Link from 'next/link';
import { Connect } from './connect';

export function Header() {
  return (
    <div className="navbar flex justify-between px-8">
      <Link href="/">
        <h1>{config.title}</h1>
      </Link>

      <Connect />
    </div>
  );
}
