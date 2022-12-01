import Link from "next/link"
import { ThemeSwitcher } from "./ThemeSwitch"

export const Nav = ({ backTo = '/' }: {
  backTo?: string
}) => {
  return <nav className="mx-auto max-w-2xl">
    <div className='flex items-center justify-between px-3 py-3'>
      <Link href={backTo} className='inline-block'>👈back</Link>
      <ThemeSwitcher />
    </div>
    <hr />
  </nav>
}