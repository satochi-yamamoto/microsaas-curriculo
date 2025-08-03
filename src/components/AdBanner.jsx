import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AdBanner({ id, className, slot, format = "auto", editorialContent }) {
  useEffect(() => {
    try {
      // Initialize AdSense ads only if adsbygoogle is available
      if (window.adsbygoogle && window.adsbygoogle.push) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.log('AdSense not loaded');
    }
  }, []);

  return (
    <div className={cn("ad-banner my-8", className)}>
      {/* Editorial content before ad - required by AdSense policies */}
      {editorialContent && (
        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {editorialContent}
          </div>
        </div>
      )}
      
      {/* AdSense Ad Unit */}
      <div className="text-center">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4789090074866563"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </div>
      
      {/* Fallback content for development or ad-blocked environments */}
      {!slot && (
        <div className="flex items-center justify-center h-24 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Espaço reservado para anúncio
          </span>
        </div>
      )}
    </div>
  );
}