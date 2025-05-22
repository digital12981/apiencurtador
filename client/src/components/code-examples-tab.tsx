import React, { useState } from "react";

type CodeExampleTab = "curl" | "javascript" | "python" | "php";

export default function CodeExamplesTab() {
  const [activeExample, setActiveExample] = useState<CodeExampleTab>("curl");

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
        <p className="mb-6">Integrate with our URL shortener API using these code examples.</p>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button 
                onClick={() => setActiveExample("curl")} 
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeExample === "curl" 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-gray-500"
                }`}
              >
                cURL
              </button>
              <button 
                onClick={() => setActiveExample("javascript")} 
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeExample === "javascript" 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-gray-500"
                }`}
              >
                JavaScript
              </button>
              <button 
                onClick={() => setActiveExample("python")} 
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeExample === "python" 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-gray-500"
                }`}
              >
                Python
              </button>
              <button 
                onClick={() => setActiveExample("php")} 
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeExample === "php" 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-gray-500"
                }`}
              >
                PHP
              </button>
            </nav>
          </div>
          
          <div className="mt-4">
            {/* cURL Example */}
            {activeExample === "curl" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Create a Shortened URL with cURL</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-6">
{`curl -X POST https://yourdomain.com/api/shorten \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your_api_key_here" \\
  -d '{
    "url": "https://example.com/very/long/url/that/needs/shortening",
    "customSlug": "mylink"
  }'`}
                </pre>
                
                <h3 className="text-lg font-medium mb-3">Get URL Statistics with cURL</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto">
{`curl -X GET https://yourdomain.com/api/stats/mylink \\
  -H "X-API-Key: your_api_key_here"`}
                </pre>
              </div>
            )}
            
            {/* JavaScript Example */}
            {activeExample === "javascript" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Create a Shortened URL with JavaScript</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-6">
{`// Using fetch API
async function createShortUrl(longUrl, customSlug = null) {
  const response = await fetch('https://yourdomain.com/api/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'your_api_key_here'
    },
    body: JSON.stringify({
      url: longUrl,
      customSlug: customSlug
    })
  });
  
  return await response.json();
}

// Example usage
createShortUrl('https://example.com/very/long/url', 'mylink')
  .then(data => console.log('Shortened URL:', data.shortUrl))
  .catch(error => console.error('Error:', error));`}
                </pre>
                
                <h3 className="text-lg font-medium mb-3">Get URL Statistics with JavaScript</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto">
{`async function getUrlStats(slug) {
  const response = await fetch(\`https://yourdomain.com/api/stats/\${slug}\`, {
    method: 'GET',
    headers: {
      'X-API-Key': 'your_api_key_here'
    }
  });
  
  return await response.json();
}

// Example usage
getUrlStats('mylink')
  .then(data => console.log('URL Stats:', data))
  .catch(error => console.error('Error:', error));`}
                </pre>
              </div>
            )}
            
            {/* Python Example */}
            {activeExample === "python" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Create a Shortened URL with Python</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-6">
{`import requests
import json

def create_short_url(long_url, custom_slug=None, api_key='your_api_key_here'):
    url = 'https://yourdomain.com/api/shorten'
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    }
    payload = {
        'url': long_url
    }
    
    if custom_slug:
        payload['customSlug'] = custom_slug
        
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Example usage
result = create_short_url('https://example.com/very/long/url', 'mylink')
print('Shortened URL:', result['shortUrl'])`}
                </pre>
                
                <h3 className="text-lg font-medium mb-3">Get URL Statistics with Python</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto">
{`def get_url_stats(slug, api_key='your_api_key_here'):
    url = f'https://yourdomain.com/api/stats/{slug}'
    headers = {
        'X-API-Key': api_key
    }
    
    response = requests.get(url, headers=headers)
    return response.json()

# Example usage
stats = get_url_stats('mylink')
print('URL Stats:', stats)`}
                </pre>
              </div>
            )}
            
            {/* PHP Example */}
            {activeExample === "php" && (
              <div>
                <h3 className="text-lg font-medium mb-3">Create a Shortened URL with PHP</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto mb-6">
{`<?php
function createShortUrl($longUrl, $customSlug = null, $apiKey = 'your_api_key_here') {
    $url = 'https://yourdomain.com/api/shorten';
    $data = [
        'url' => $longUrl
    ];
    
    if ($customSlug) {
        $data['customSlug'] = $customSlug;
    }
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\\r\\nX-API-Key: $apiKey\\r\\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    return json_decode($result, true);
}

// Example usage
$result = createShortUrl('https://example.com/very/long/url', 'mylink');
echo 'Shortened URL: ' . $result['shortUrl'];
?>`}
                </pre>
                
                <h3 className="text-lg font-medium mb-3">Get URL Statistics with PHP</h3>
                <pre className="bg-[#1a1a1a] text-[#f8f8f2] rounded-md p-4 overflow-x-auto">
{`<?php
function getUrlStats($slug, $apiKey = 'your_api_key_here') {
    $url = "https://yourdomain.com/api/stats/$slug";
    
    $options = [
        'http' => [
            'header'  => "X-API-Key: $apiKey\\r\\n",
            'method'  => 'GET'
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    return json_decode($result, true);
}

// Example usage
$stats = getUrlStats('mylink');
echo 'URL Stats: ' . print_r($stats, true);
?>`}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Implementation Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="text-primary-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">API Key Security</h3>
            <p className="text-gray-600 text-sm">Never expose your API key in client-side code. Always make API calls from your server.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="text-primary-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Error Handling</h3>
            <p className="text-gray-600 text-sm">Implement robust error handling for API responses, especially for rate limiting and validation errors.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="text-primary-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Caching</h3>
            <p className="text-gray-600 text-sm">Cache API responses where appropriate to improve performance and reduce API calls.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="text-primary-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Retry Logic</h3>
            <p className="text-gray-600 text-sm">Implement exponential backoff for retries when encountering rate limits or server errors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
