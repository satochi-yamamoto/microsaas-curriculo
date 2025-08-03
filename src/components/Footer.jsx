import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-8 px-4 bg-slate-900 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-6">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-white font-semibold mb-3">Gerador de Currículos IA</h3>
            <p className="text-gray-400 text-sm mb-3">
              Crie currículos profissionais para tecnologia usando inteligência artificial. 
              Rápido, seguro e otimizado para recrutadores.
            </p>
          </div>
          
          {/* Coluna 2 - Recursos */}
          <div>
            <h3 className="text-white font-semibold mb-3">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Dicas de Carreira
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-gray-400 hover:text-white transition-colors">
                  Planos Premium
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Templates ATS</span>
              </li>
              <li>
                <span className="text-gray-400">IA Avançada</span>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3 - Artigos */}
          <div>
            <h3 className="text-white font-semibold mb-3">Artigos Populares</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Tendências do Mercado Tech
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Otimização para ATS
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Entrevistas Técnicas
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Habilidades em Demanda
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4 - Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Informações Legais</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Política de Anúncios</span>
              </li>
              <li>
                <span className="text-gray-400">LGPD Compliance</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Linha divisória e copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © 2025 YD Software. Todos os direitos reservados. Sistema 100% seguro e privado.
            </div>
            <div className="flex items-center gap-4">
              <span>🇧🇷 Feito no Brasil</span>
              <span>•</span>
              <span>🤖 Powered by IA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
