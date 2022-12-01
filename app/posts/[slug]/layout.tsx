import { Nav } from '@/components/nav'


export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <Nav backTo='/posts' />
    {children}
  </>
}