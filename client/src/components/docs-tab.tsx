import React from "react";

export default function DocsTab() {
  return (
    <div className="p-6">
      <section id="getting-started" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="mb-4">ShortLink API allows you to create shortened URLs through a simple RESTful API. Here's how to get started:</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">1. Sign up for an API key</h3>
          <p className="mb-2">Register for an account to get your API key.</p>
          <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Register for an API key →</a>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">2. Make your first API request</h3>
          <p className="mb-2">Use the examples below to shorten your first URL.</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">3. Use your shortened URL</h3>
          <p className="mb-2">Once created, the shortened URL will redirect to your original URL.</p>
        </div>
      </section>

      <section id="api" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">API Reference</h2>
        
        <div className="mb-8 border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">POST</span>
            <span className="font-mono text-sm">/api/shorten</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Create a shortened URL</h3>
            <p className="text-gray-600 mb-4">Takes a long URL and returns a shortened URL.</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Request Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">url</td>
                      <td className="px-4 py-3 text-sm text-gray-500">string</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-500">The URL to be shortened</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">customSlug</td>
                      <td className="px-4 py-3 text-sm text-gray-500">string</td>
                      <td className="px-4 py-3 text-sm text-gray-500">No</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Optional custom slug for the shortened URL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Request Headers</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Content-Type</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-500">application/json</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">X-API-Key</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Your API key</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Example Request</h4>
              <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-2">
                <span className="text-[#50fa7b]">POST</span> <span className="text-[#8be9fd]">/api/shorten</span>
{`
Content-Type: application/json
X-API-Key: your_api_key_here

{
  "url": "https://example.com/very/long/url/that/needs/shortening",
  "customSlug": "mylink"
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Example Response</h4>
              <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-2">
                <span className="text-[#ff79c6]">Status</span>: <span className="text-[#bd93f9]">200</span> OK
{`
{
  "success": true,
  "shortUrl": "https://yourdomain.com/mylink",
  "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
  "created": "2023-08-15T14:30:45Z",
  "expiresAt": null
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="mb-8 border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
            <span className="font-mono text-sm">/{"{slug}"}</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Redirect to original URL</h3>
            <p className="text-gray-600 mb-4">Redirects from the shortened URL to the original URL.</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">URL Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">slug</td>
                      <td className="px-4 py-3 text-sm text-gray-500">string</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-500">The unique slug for the shortened URL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Response</h4>
              <p className="text-gray-600 mb-2">Redirects to the original URL with a 302 status code.</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <div className="flex items-center">
                  <div className="text-yellow-500 shrink-0 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-yellow-700 text-sm">If the slug is not found, returns a 404 Not Found response.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
            <span className="font-mono text-sm">/api/stats/{"{slug}"}</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Get URL statistics</h3>
            <p className="text-gray-600 mb-4">Returns statistics for a shortened URL.</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">URL Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">slug</td>
                      <td className="px-4 py-3 text-sm text-gray-500">string</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-500">The unique slug for the shortened URL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Request Headers</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">X-API-Key</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Your API key</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Example Response</h4>
              <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-2">
                <span className="text-[#ff79c6]">Status</span>: <span className="text-[#bd93f9]">200</span> OK
{`
{
  "slug": "mylink",
  "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
  "shortUrl": "https://yourdomain.com/mylink",
  "created": "2023-08-15T14:30:45Z",
  "clicks": 42,
  "lastClickedAt": "2023-08-16T09:12:33Z",
  "referrers": [
    {
      "domain": "google.com",
      "count": 15
    },
    {
      "domain": "twitter.com",
      "count": 8
    }
  ],
  "browsers": [
    {
      "name": "Chrome",
      "count": 25
    },
    {
      "name": "Firefox",
      "count": 10
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="rate-limits" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
        <p className="mb-4">To ensure service stability and availability, the API has the following rate limits:</p>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create URLs</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Get Stats</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Free</td>
                <td className="px-4 py-3 text-sm text-gray-500">50 requests / hour</td>
                <td className="px-4 py-3 text-sm text-gray-500">100 requests / hour</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Basic</td>
                <td className="px-4 py-3 text-sm text-gray-500">500 requests / hour</td>
                <td className="px-4 py-3 text-sm text-gray-500">1,000 requests / hour</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Premium</td>
                <td className="px-4 py-3 text-sm text-gray-500">5,000 requests / hour</td>
                <td className="px-4 py-3 text-sm text-gray-500">10,000 requests / hour</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-semibold mb-2">Rate Limit Response</h3>
          <p className="mb-2">When rate limits are exceeded, the API will respond with:</p>
          <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto">
            <span className="text-[#ff79c6]">Status</span>: <span className="text-[#bd93f9]">429</span> Too Many Requests
{`
{
  "error": "Rate limit exceeded",
  "retryAfter": 120
}`}
          </pre>
        </div>
      </section>

      <section id="error-handling">
        <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
        <p className="mb-4">The API uses standard HTTP status codes to indicate success or failure:</p>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Code</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">200 OK</td>
                <td className="px-4 py-3 text-sm text-gray-500">The request was successful</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">400 Bad Request</td>
                <td className="px-4 py-3 text-sm text-gray-500">The request was invalid or missing required parameters</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">401 Unauthorized</td>
                <td className="px-4 py-3 text-sm text-gray-500">Invalid or missing API key</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">404 Not Found</td>
                <td className="px-4 py-3 text-sm text-gray-500">The requested resource was not found</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">409 Conflict</td>
                <td className="px-4 py-3 text-sm text-gray-500">The custom slug is already in use</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">429 Too Many Requests</td>
                <td className="px-4 py-3 text-sm text-gray-500">Rate limit exceeded</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">500 Internal Server Error</td>
                <td className="px-4 py-3 text-sm text-gray-500">An unexpected error occurred on the server</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-semibold mb-2">Error Response Format</h3>
          <p className="mb-2">All error responses follow this format:</p>
          <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto">
{`{
  "error": "Error message description",
  "details": "Additional details about the error (optional)"
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
