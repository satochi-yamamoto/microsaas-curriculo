import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800/90 backdrop-blur-sm p-4 border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-200">
          Usamos cookies essenciais para o funcionamento do site. Nenhum dado informado 
          é armazenado e todas as informações são excluídas após a geração do currículo.
        </p>
        <Button onClick={acceptCookies} size="sm">
          Aceitar
        </Button>
      </div>
    </div>
  );
}

export default CookieBanner;
