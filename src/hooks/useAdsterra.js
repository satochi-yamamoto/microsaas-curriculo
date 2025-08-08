import { useEffect, useRef } from 'react';

export const useAdsterra = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    // Load Adsterra scripts dynamically
    const loadAdsterraScripts = () => {
      // Script for native ads
      const nativeScript = document.createElement('script');
      nativeScript.type = 'text/javascript';
      nativeScript.src = '//pl27372989.profitableratecpm.com/42/24/41/422441cb4fa6a8c428808f107916a92f.js';
      nativeScript.async = true;
      document.head.appendChild(nativeScript);

      // Script for pop-under
      const popunderScript = document.createElement('script');
      popunderScript.async = true;
      popunderScript.setAttribute('data-cfasync', 'false');
      popunderScript.src = '//pl27372886.profitableratecpm.com/d5870d88a2a32c9f35fb037b69b43bf5/invoke.js';
      document.head.appendChild(popunderScript);

      initialized.current = true;
    };

    // Load scripts when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadAdsterraScripts);
    } else {
      loadAdsterraScripts();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', loadAdsterraScripts);
    };
  }, []);

  return { initialized: initialized.current };
};

export default useAdsterra;
