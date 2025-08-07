import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function AdBanner({ 
  id, 
  className, 
  adKey = '594094ec53033d648141c0b5a324c0e9',
  format = 'iframe',
  height = 250,
  width = 300,
  editorialContent,
  responsive = true 
}) {
  const adRef = useRef(null);

  useEffect(() => {
    // Initialize Adsterra ad
    if (adRef.current && window.atOptions) {
      try {
        // Create script element for Adsterra
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
        script.async = true;
        
        // Configure Adsterra options
        window.atOptions = {
          'key': adKey,
          'format': format,
          'height': height,
          'width': width,
          'params': {}
        };
        
        adRef.current.appendChild(script);
      } catch (error) {
        console.warn('Adsterra initialization error:', error);
      }
    }
  }, [adKey, format, height, width]);

  return (
    <div className={cn("ad-banner-wrapper", className)} role="complementary" aria-label="Publicidade">
      {/* Editorial content before ad - REQUIRED for good user experience */}
      {editorialContent && (
        <div className="editorial-content mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {editorialContent}
          </div>
        </div>
      )}
      
      {/* Adsterra Ad Unit */}
      <div className="ad-container text-center my-8">
        <div 
          ref={adRef}
          className="adsterra-banner"
          style={{ 
            minHeight: height, 
            width: responsive ? '100%' : width,
            maxWidth: width,
            margin: '0 auto'
          }}
        />
      </div>
    </div>
  );
}

// Specialized components for different ad placements
export function HeaderAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      height={90}
      width={728}
      editorialContent={editorialContent}
      className="header-ad"
    />
  );
}

export function ContentAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      height={250}
      width={300}
      editorialContent={editorialContent}
      className="content-ad"
    />
  );
}

export function SidebarAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      height={600}
      width={160}
      editorialContent={editorialContent}
      className="sidebar-ad"
    />
  );
}

export function FooterAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      height={90}
      width={728}
      editorialContent={editorialContent}
      className="footer-ad"
    />
  );
}