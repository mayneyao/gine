import Link from 'next/link'


export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <nav className="mx-auto max-w-3xl">
      <Link href="/posts" className='inline-block p-3'>👈back</Link>
      <hr />
    </nav>
    {children}
  </>
}