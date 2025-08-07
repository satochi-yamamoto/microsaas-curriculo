import { useEffect } from 'react';

// Hook para inicializar o Adsterra globalmente
export function useAdsterra() {
  useEffect(() => {
    // Configurar opções globais do Adsterra
    if (typeof window !== 'undefined') {
      window.atOptions = window.atOptions || {
        'key': '594094ec53033d648141c0b5a324c0e9',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };

      // Carregar script do Adsterra se ainda não foi carregado
      const existingScript = document.querySelector('script[src*="highperformanceformat.com"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//www.highperformanceformat.com/594094ec53033d648141c0b5a324c0e9/invoke.js';
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);
}

// Componente para anúncios Adsterra
export function AdsterraBanner({ 
  adKey = '594094ec53033d648141c0b5a324c0e9',
  height = 250,
  width = 300,
  className = '',
  editorialContent 
}) {
  useEffect(() => {
    // Configurar este anúncio específico
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        atOptions = {
          'key': '${adKey}',
          'format': 'iframe',
          'height': ${height},
          'width': ${width},
          'params': {}
        };
      `;
      
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
      invokeScript.async = true;
      
      document.head.appendChild(script);
      document.head.appendChild(invokeScript);
      
      return () => {
        // Cleanup
        try {
          document.head.removeChild(script);
          document.head.removeChild(invokeScript);
        } catch (e) {
          // Scripts may have been removed already
        }
      };
    }
  }, [adKey, height, width]);

  return (
    <div className={`adsterra-wrapper ${className}`} role="complementary" aria-label="Publicidade">
      {/* Editorial content before ad */}
      {editorialContent && (
        <div className="editorial-content mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {editorialContent}
          </div>
        </div>
      )}
      
      {/* Container para o anúncio Adsterra */}
      <div 
        className="adsterra-ad-container text-center my-8"
        style={{ 
          minHeight: height,
          width: '100%',
          maxWidth: width,
          margin: '0 auto'
        }}
      >
        {/* O script do Adsterra irá injetar o anúncio aqui */}
      </div>
    </div>
  );
}
