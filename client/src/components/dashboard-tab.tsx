import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ShortUrlForm from "@/components/short-url-form";
import { useToast } from "@/hooks/use-toast";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

// Mock data for display
const mockData = [
  {
    slug: "promo",
    shortUrl: "yourdomain.com/promo",
    originalUrl: "https://example.com/summer-promotion-2023-special-discount",
    created: "2023-08-15T14:30:45Z",
    clicks: 1245,
    lastClickedAt: "2023-08-16T09:12:33Z"
  },
  {
    slug: "blog",
    shortUrl: "yourdomain.com/blog",
    originalUrl: "https://myblog.example.com/top-10-tips-for-effective-url-management",
    created: "2023-08-12T10:20:30Z",
    clicks: 867,
    lastClickedAt: "2023-08-16T08:10:20Z"
  },
  {
    slug: "event",
    shortUrl: "yourdomain.com/event",
    originalUrl: "https://events.example.org/annual-tech-conference-2023-registration",
    created: "2023-08-10T08:15:25Z",
    clicks: 523,
    lastClickedAt: "2023-08-15T14:30:45Z"
  }
];

export default function DashboardTab() {
  const { toast } = useToast();
  const [, copy] = useCopyToClipboard();
  
  // This would normally fetch actual data
  // Using mock data here as per requirements
  const { data = mockData, isLoading, error } = useQuery({
    queryKey: ['/api/urls'],
    enabled: false, // Disable auto-fetching for this example
  });
  
  const handleCopyLink = (url: string) => {
    copy(url);
    toast({
      title: "Link copied",
      description: "The short URL has been copied to your clipboard.",
    });
  };
  
  const handleDeleteLink = (slug: string) => {
    // This would normally delete the link
    toast({
      title: "Link deleted",
      description: `The link ${slug} has been deleted.`,
    });
  };

  return (
    <div className="p-6">
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Total Links</h3>
              <span className="text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">142</p>
            <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Total Clicks</h3>
              <span className="text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">8,549</p>
            <p className="text-sm text-gray-500 mt-1">+28% from last month</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">API Usage</h3>
              <span className="text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">43%</p>
            <p className="text-sm text-gray-500 mt-1">of monthly limit</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent Links</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
          </div>
          
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((url: any) => (
                  <tr key={url.slug}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`https://${url.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                      {url.originalUrl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(url.created).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {url.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          title="View Stats"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          title="Copy Link"
                          onClick={() => handleCopyLink(`https://${url.shortUrl}`)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button 
                          className="text-gray-500 hover:text-red-600"
                          title="Delete Link"
                          onClick={() => handleDeleteLink(url.slug)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Create New Short URL</h2>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <ShortUrlForm />
        </div>
      </section>
    </div>
  );
}
