'use client';

import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark' ? true : false;

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return <span onClick={() => { toggleTheme() }} className="cursor-pointer">
    {isDark ? '🌙' : '🌞'}
  </span>

}