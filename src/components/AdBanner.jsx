
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AdBanner({ id, className, content, slot }) {
  useEffect(() => {
    if (import.meta.env.DEV) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div id={id} className={cn('ad-banner', className)}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4789090074866563"
        data-ad-slot={slot || 'xxxxxxxxxx'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {import.meta.env.DEV && (
        <div className="flex items-center justify-center h-full">
          <span className="text-sm font-medium opacity-75">
            {content}
          </span>
        </div>
      )}
    </div>
  );
}
