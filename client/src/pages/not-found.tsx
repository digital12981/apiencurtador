import React from "react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-md mx-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you are looking for doesn't exist.</p>
        <Link href="/">
          <a className="text-blue-600 hover:underline">Return to Home</a>
        </Link>
      </div>
    </div>
  );
}
