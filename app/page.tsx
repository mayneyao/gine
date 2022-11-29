import Link from 'next/link'
import { Header } from '@/components/Head'

export default function Home() {
  return (
    <main className='fixed h-full w-full'>
      <Header />
      <div className='max-w-screen-sm px-6 mx-auto'>
        <Link href='/posts'>
          posts
        </Link>
        <Link href='/about'>
          about
        </Link>
        <Link href='/friends'>
          friends
        </Link>
      </div>
    </main>
  )
}
