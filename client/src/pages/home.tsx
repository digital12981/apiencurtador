import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShortUrlForm from "@/components/short-url-form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">URL Shortener</h1>
            <p className="text-gray-600">Create short links with a single click</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ShortUrlForm />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Free and simple tool to shorten URLs and generate short links</p>
            <p className="mt-2">Use our URL Shortener for creating shortened URLs that can be easily shared</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
