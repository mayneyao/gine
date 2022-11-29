import Link from "next/link"
import Image from 'next/image'
import config from '@/gine.config';

export const Entry = () => {
  return <div className="max-w-screen-sm h-full px-6 mx-auto flex flex-col items-center justify-center">
    <Link href="/">
      <Image
        src="/avatar.jpg"
        alt="home"
        width={48}
        height={48}
      />
    </Link>
    <span className="p-2">{config.site.name}</span>
    <span>
      <Link href="/posts">posts</Link>
    </span>
  </div>
}