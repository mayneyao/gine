
export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mx-auto">
    {children}
  </div>
}