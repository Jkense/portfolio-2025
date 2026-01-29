"use client";
import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "https://medium.com/@JasperKense": {
    name: "blog",
  },
  "/resume": {
    name: "resume",
  },
};

export function Navbar() {
  return (
    <>
      <div className="font-mono flex justify-center px-6 py-5 z-50 bg-background gap-6 border-b border-foreground/10 lg:h-16 align-center items-center relative min-h-[32px]">
        <div className="max-w-4xl w-full flex items-center gap-6 relative">
          <div className="flex items-center w-full ">
            <a
              className="flex flex-col sm:flex-row sm:inline-flex sm:gap-4 gap-0 cursor-pointer opacity-100"
              href="/"
            >
              <h4 className=" opacity-100 text-foreground font-medium">
                Jasper Kense
              </h4>
              <h4 className="flex items-center gap-0">
                Product Designer + Engineer
              </h4>
            </a>
          </div>
          <div className="md:flex hidden gap-8 w-full justify-end items-center">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link key={path} href={path} className="w-full text-left ">
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="md:hidden flex gap-4 items-center">
            <div>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                className="cursor-pointer hover:opacity-50"
              >
                <path
                  className="transition-all duration-300 origin-center "
                  d="M4 8H20"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
                <path
                  className="transition-all duration-300 origin-center "
                  d="M4 16H20"
                  stroke="currentColor"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div
          className="md:hidden absolute left-0 right-0 z-60 top-full p-6 border-b border-foreground/10 bg-background 
        transition-all duration-300 ease-in-out
        opacity-0 -translate-y-2 pointer-events-none"
        >
          <div className="flex flex-col gap-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-primary opacity-100 w-full text-left hover:cursor-pointer transition-all hover:text-slate-900 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 cursor-pointer"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
