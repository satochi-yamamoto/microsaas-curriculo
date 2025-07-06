import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-6 px-4 bg-slate-900 border-t border-white/10 text-center text-sm text-gray-400">
      <div className="max-w-4xl mx-auto space-y-2">
        <div className="space-x-2">
          <Link to="/politica-de-privacidade" className="hover:underline text-gray-300">
            Política de Privacidade
          </Link>
          <span>|</span>
          <Link to="/termos-de-uso" className="hover:underline text-gray-300">
            Termos de Uso
          </Link>
        </div>
        <div className="text-gray-500">
          © 2025 YD Software. Todos os direitos reservados. Sistema 100% local e seguro.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
