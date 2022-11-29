import Link from "next/link"
import Image from 'next/image'

export const Header = () => {
  return <div className="max-w-screen-sm h-full px-6 mx-auto flex flex-col items-center justify-center">
    <Link href="/">
      <Image
        src="/avatar.jpg"
        alt="home"
        width={48}
        height={48}
      />
    </Link>
    <span className="p-2">{"Mayne's Blog"}</span>
    <span>
      <Link href="/posts">posts</Link>
    </span>
  </div>
}