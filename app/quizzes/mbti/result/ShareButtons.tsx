'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Twitter, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareTwitter = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank');
  };

  const handleShareFacebook = () => {
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Button 
        onClick={handleCopyLink}
        variant="outline"
        className="flex items-center space-x-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md"
      >
        <Copy className="h-4 w-4 mr-2" />
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>

      <Button 
        onClick={handleShareTwitter}
        className="flex items-center space-x-2 bg-[#1DA1F2] hover:bg-[#1a94da] text-white shadow-sm transition-all hover:shadow-md"
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>

      <Button 
        onClick={handleShareFacebook}
        className="flex items-center space-x-2 bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-sm transition-all hover:shadow-md"
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
    </div>
  );
} 