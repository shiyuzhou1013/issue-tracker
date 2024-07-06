import Link from "next/link";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 items-center border-b mb-5 px-6 h-14">
      <Link href="/" className="px-5">
        <AiFillSchedule />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-5  text-zinc-500 hover:text-zinc-800"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
