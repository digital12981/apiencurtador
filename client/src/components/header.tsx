import React from "react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <span className="text-xl font-bold text-gray-900">ShortLink</span>
          </a>
        </Link>
        <Link href="/dashboard">
          <a className="text-sm text-gray-700 hover:text-gray-900">Dashboard</a>
        </Link>
      </div>
    </header>
  );
}
