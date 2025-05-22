import React from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShortUrlForm from "@/components/short-url-form";
import { Link } from "wouter";

export default function Dashboard() {
  // Fetch URLs from the API
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/urls"],
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Your URLs</h1>
          <Link href="/">
            <a className="text-sm text-gray-600 hover:text-gray-900">Home</a>
          </Link>
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* URL Creation */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-sm font-medium mb-3 text-gray-700">Create New URL</h2>
              <ShortUrlForm />
            </div>
          </div>
          
          {/* URL List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-sm font-medium mb-3 text-gray-700">Recent Links</h2>
              
              {isLoading ? (
                <p className="text-sm text-gray-500 py-4 text-center">Loading your URLs...</p>
              ) : error ? (
                <p className="text-sm text-red-500 py-4 text-center">Could not load your URLs</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs text-gray-500">
                        <th className="px-2 py-2">Short URL</th>
                        <th className="px-2 py-2">Clicks</th>
                        <th className="px-2 py-2">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data?.map((url: any) => (
                        <tr key={url.slug} className="hover:bg-gray-50">
                          <td className="px-2 py-3">
                            <a 
                              href={url.shortUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm truncate block max-w-[200px]"
                            >
                              {url.shortUrl}
                            </a>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{url.originalUrl}</p>
                          </td>
                          <td className="px-2 py-3 text-sm">{url.clicks}</td>
                          <td className="px-2 py-3 text-xs text-gray-500">
                            {new Date(url.created).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      
                      {/* If no data, show empty state */}
                      {(!data || data.length === 0) && (
                        <tr>
                          <td colSpan={3} className="px-2 py-4 text-center text-sm text-gray-500">
                            No URLs created yet. Create your first short link above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
