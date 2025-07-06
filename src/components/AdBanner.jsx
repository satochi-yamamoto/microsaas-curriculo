import React from 'react';
import { cn } from '@/lib/utils';

export function AdBanner({ id, className, content }) {
  return (
    <div className={cn("ad-banner", className)}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="xxxxxxxxxx"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      
      {/* Placeholder content for development */}
      <div className="flex items-center justify-center h-full">
        <span className="text-sm font-medium opacity-75">
          {content}
        </span>
      </div>
    </div>
  );
}