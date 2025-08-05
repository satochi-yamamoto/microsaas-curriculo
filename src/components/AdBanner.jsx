import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function AdBanner({ 
  id, 
  className, 
  slot, 
  format = "auto", 
  editorialContent,
  style = { display: 'block' },
  responsive = true 
}) {
  const adRef = useRef(null);

  useEffect(() => {
    // Only initialize if we have a valid slot and AdSense is loaded
    if (slot && window.adsbygoogle && adRef.current) {
      try {
        // Check if ad is already initialized
        if (!adRef.current.dataset.adsbygoogleStatus) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.warn('AdSense initialization error:', error);
      }
    }
  }, [slot]);

  // Don't render ad component if no slot is provided
  if (!slot) {
    return null;
  }

  return (
    <div className={cn("ad-banner-wrapper", className)} role="complementary" aria-label="Publicidade">
      {/* Editorial content before ad - REQUIRED by AdSense policies */}
      {editorialContent && (
        <div className="editorial-content mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {editorialContent}
          </div>
        </div>
      )}
      
      {/* AdSense Ad Unit - Properly configured */}
      <div className="ad-container text-center my-8">
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={style}
          data-ad-client="ca-pub-4789090074866563"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive.toString()}
          data-ad-region="content"
        />
      </div>
    </div>
  );
}

// Specialized components for different ad placements
export function HeaderAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      slot="1234567890" 
      format="horizontal"
      editorialContent={editorialContent}
      className="header-ad"
    />
  );
}

export function ContentAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      slot="2345678901" 
      format="rectangle"
      editorialContent={editorialContent}
      className="content-ad"
    />
  );
}

export function SidebarAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      slot="3456789012" 
      format="vertical"
      editorialContent={editorialContent}
      className="sidebar-ad"
    />
  );
}

export function FooterAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      slot="4567890123" 
      format="horizontal"
      editorialContent={editorialContent}
      className="footer-ad"
    />
  );
}