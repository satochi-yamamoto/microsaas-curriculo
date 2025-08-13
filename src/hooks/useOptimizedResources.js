import { useEffect } from 'react';

/**
 * Hook otimizado para carregar recursos de forma assíncrona
 * Melhora a performance ao evitar bloqueios no carregamento inicial
 */
export const useOptimizedResources = () => {
  useEffect(() => {
    // Preload de recursos críticos de forma inteligente
    const loadCriticalResources = () => {
      // Preload de imagens importantes apenas quando necessário
      const criticalImages = [
        '/og-image.jpg',
        '/twitter-image.jpg',
        '/favicon-32x32.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
      });

      // Otimizar carregamento de fontes com fallback
      const fontDisplay = document.createElement('style');
      fontDisplay.innerHTML = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: local('Inter'), url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
        }
      `;
      document.head.appendChild(fontDisplay);
    };

    // Executar apenas após o DOM estar carregado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadCriticalResources);
    } else {
      // Se já carregou, executar com delay para não bloquear
      setTimeout(loadCriticalResources, 100);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', loadCriticalResources);
    };
  }, []);
};

export default useOptimizedResources;
