import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateUrl(url: string, maxLength = 40): string {
  if (url.length <= maxLength) return url;
  
  // Remove protocol (http://, https://) for display
  let displayUrl = url.replace(/^https?:\/\//, '');
  
  if (displayUrl.length <= maxLength) return displayUrl;
  
  // Split into domain and path
  const urlParts = displayUrl.split('/');
  const domain = urlParts[0];
  
  // Return domain + truncated path
  return domain + '/...' + displayUrl.substring(displayUrl.length - (maxLength - domain.length - 4));
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}
