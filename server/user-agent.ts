// Simple user agent parser
export function parseUserAgent(userAgent: string): string {
  if (!userAgent) return "Unknown";
  
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) return "Internet Explorer";
  if (userAgent.includes("Opera") || userAgent.includes("OPR/")) return "Opera";
  
  return "Other";
}