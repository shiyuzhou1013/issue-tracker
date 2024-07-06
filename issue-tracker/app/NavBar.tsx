"use client";

import { AiFillSchedule } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 items-center border-b mb-5 px-6 h-14">
      <Link href="/" className="px-5">
        <AiFillSchedule className="text-pink-700" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            // className={`${
            //   link.href === currentPage ? "text-zinc-900" : "text-zinc-500"
            // } hover:text-zinc-800 transition-colors px-5 `}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
