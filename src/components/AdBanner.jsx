import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function AdBanner({ 
  id, 
  className, 
  adKey,
  format = 'iframe',
  height = 250,
  width = 300,
  editorialContent,
  responsive = true,
  adType = 'banner' // 'banner', 'native', 'popunder', 'display'
}) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adKey || !adRef.current) return;

    try {
      // Para diferentes tipos de anúncio Adsterra
      if (adType === 'banner' || adType === 'display') {
        // Banner iframe padrão
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.innerHTML = `
          atOptions = {
            'key': '${adKey}',
            'format': '${format}',
            'height': ${height},
            'width': ${width},
            'params': {}
          };
        `;
        
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
        script2.async = true;
        
        adRef.current.appendChild(script1);
        adRef.current.appendChild(script2);
      } 
      else if (adType === 'native') {
        // Anúncio nativo
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//pl27372989.profitableratecpm.com/42/24/41/422441cb4fa6a8c428808f107916a92f.js`;
        script.async = true;
        adRef.current.appendChild(script);
      }
      else if (adType === 'popunder') {
        // Pop-under
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl27372886.profitableratecpm.com/d5870d88a2a32c9f35fb037b69b43bf5/invoke.js';
        adRef.current.appendChild(script);
        
        // Container para o pop-under
        const container = document.createElement('div');
        container.id = 'container-d5870d88a2a32c9f35fb037b69b43bf5';
        adRef.current.appendChild(container);
      }
    } catch (error) {
      console.warn('Adsterra initialization error:', error);
    }
  }, [adKey, format, height, width, adType]);

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

// Specialized components for different ad placements with correct keys
export function HeaderAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      adKey="594094ec53033d648141c0b5a324c0e9"
      height={250}
      width={300}
      editorialContent={editorialContent}
      className="header-ad"
      adType="banner"
    />
  );
}

export function ContentAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      adKey="594094ec53033d648141c0b5a324c0e9"
      height={250}
      width={300}
      editorialContent={editorialContent}
      className="content-ad"
      adType="banner"
    />
  );
}

export function SidebarAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      adKey="e2c5596483e45bb50f598c4311ecf816"
      height={300}
      width={160}
      editorialContent={editorialContent}
      className="sidebar-ad"
      adType="banner"
    />
  );
}

export function NativeAdBanner({ editorialContent, className }) {
  return (
    <AdBanner 
      adKey="422441cb4fa6a8c428808f107916a92f"
      height={150}
      width={300}
      editorialContent={editorialContent}
      className={cn("native-ad", className)}
      adType="native"
    />
  );
}

export function PopunderAdBanner({ editorialContent, className }) {
  return (
    <AdBanner 
      adKey="d5870d88a2a32c9f35fb037b69b43bf5"
      height={0}
      width={0}
      editorialContent={editorialContent}
      className={cn("popunder-ad", className)}
      adType="popunder"
    />
  );
}

export function FooterAdBanner({ editorialContent }) {
  return (
    <AdBanner 
      adKey="594094ec53033d648141c0b5a324c0e9"
      height={250}
      width={300}
      editorialContent={editorialContent}
      className="footer-ad"
      adType="banner"
    />
  );
}