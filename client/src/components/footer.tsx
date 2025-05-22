import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ShortLink | Simple URL Shortening
          </p>
        </div>
      </div>
    </footer>
  );
}
