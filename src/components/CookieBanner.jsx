import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Settings, ExternalLink } from 'lucide-react';

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie_policy_accepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_policy_accepted', 'true');
    localStorage.setItem('cookie_preferences', JSON.stringify({
      necessary: true,
      analytics: true,
      advertising: true,
      acceptedAt: new Date().toISOString()
    }));
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_policy_accepted', 'true');
    localStorage.setItem('cookie_preferences', JSON.stringify({
      necessary: true,
      analytics: false,
      advertising: false,
      acceptedAt: new Date().toISOString()
    }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/98 backdrop-blur-sm border-t border-white/10 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              🍪 Configurações de Cookies e Privacidade
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Main content */}
          <div className="text-sm text-gray-300">
            <p className="mb-3">
              Este site utiliza cookies essenciais para funcionamento e cookies de terceiros para publicidade e análise. 
              Também usamos <strong>Google AdSense</strong> para exibir anúncios que ajudam a manter o serviço gratuito.
            </p>

            {showDetails && (
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4 space-y-3">
                <h4 className="font-semibold text-white mb-2">Tipos de cookies utilizados:</h4>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Cookies Essenciais:</strong>
                      <span className="ml-2">Necessários para o funcionamento básico do site (sempre ativos)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚡</span>
                    <div>
                      <strong className="text-purple-300">Cookies Analíticos:</strong>
                      <span className="ml-2">Google Analytics para entender como você usa o site</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">🎯</span>
                    <div>
                      <strong className="text-green-300">Cookies de Publicidade:</strong>
                      <span className="ml-2">Google AdSense para exibir anúncios relevantes e manter o serviço gratuito</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700">
                  <p className="text-xs text-gray-400 mb-2">Links úteis para gerenciar suas preferências:</p>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <a 
                      href="https://adssettings.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Configurações de anúncios do Google <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="/politica-de-privacidade" 
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Política de Privacidade
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-400 hover:text-white text-xs flex items-center gap-1"
              >
                <Settings className="w-3 h-3" />
                {showDetails ? 'Ocultar detalhes' : 'Ver detalhes e gerenciar preferências'}
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Apenas essenciais
                </Button>
                <Button
                  onClick={handleAccept}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Aceitar todos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
