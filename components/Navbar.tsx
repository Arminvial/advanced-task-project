"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center cursor-default">
      <h1 className="text-xl font-bold">پنل کاربری</h1>
      <div className="flex items-center gap-4">
        <button className="bg-red-500 hover:bg-red-600 transition px-2 py-2 rounded cursor-pointer">
        <Link
          href="/about-project"
          className="text-sm text-white"
        >
          درباره پروژه
        </Link>
      </button>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded cursor-pointer"
      >
        خروج
      </button>

      </div>
      
    </nav>
  );
}
