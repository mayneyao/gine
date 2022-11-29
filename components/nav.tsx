'use client';

import { useState } from "react";


export const Nav = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {
    setIsDark(!isDark);
    const htmlElement = document.querySelector("html");
    console.log(htmlElement)
    htmlElement?.setAttribute("data-theme", isDark ? "light" : "dark");
  };

  return <div className="flex justify-items-end">
    <span onClick={() => { toggleDark }} className="cursor-pointer">
      {isDark ? '🌙' : '🌞'}
    </span>
  </div>
}