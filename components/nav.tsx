import Link from "next/link"
import { ThemeSwitcher } from "./ThemeSwitch"

export const Nav = ({ backTo = '/', styleName }: {
  backTo?: string;
  styleName?: string;
}) => {
  return <nav className={`mx-auto ${styleName || ''} sticky top-0 bg-white dark:bg-[#121212]`}>
    <div className='flex items-center justify-between px-3 py-3'>
      <Link href={backTo} className='inline-block'>👈back</Link>
      <ThemeSwitcher />
    </div>
  </nav>
}