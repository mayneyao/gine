
export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mx-auto max-w-2xl">
    {children}
  </div>
}