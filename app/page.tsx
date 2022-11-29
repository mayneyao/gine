import Link from 'next/link'
import { Entry } from '@/components/entry'

export default function Home() {
  return (
    <main className='fixed h-full w-full'>
      <Entry />
    </main>
  )
}
