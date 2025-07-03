import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-center py-4 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-gray-400 text-sm flex flex-col sm:flex-row gap-2 justify-center">
        <Link to="/politica-de-privacidade" className="hover:text-white">Política de Privacidade</Link>
        <span className="hidden sm:block">|</span>
        <Link to="/termos-de-uso" className="hover:text-white">Termos de Uso</Link>
      </div>
    </footer>
  );
}


export default Footer;
