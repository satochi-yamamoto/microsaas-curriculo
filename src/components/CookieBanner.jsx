import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie_policy_accepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_policy_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-between text-sm text-gray-300">
        <span>
          Este site utiliza cookies estritamente necessários. Nenhum dado pessoal é armazenado e todas as informações são removidas após o uso.
        </span>
        <Button onClick={handleAccept}>Entendi</Button>
      </div>
    </div>
  );
}

export default CookieBanner;
