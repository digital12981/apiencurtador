import React from "react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="mb-12 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">URL Shortener API</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        A simple and robust API for shortening URLs, with easy integration for your applications.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <a href="#getting-started" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
          Get Started
        </a>
        <a href="#api-key" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
          Get API Key
        </a>
      </div>
    </section>
  );
}
