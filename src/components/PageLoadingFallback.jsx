import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoadingFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <LoadingSpinner size="xl" className="mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Carregando sua experiência...</h2>
          <p className="text-gray-300 text-sm mb-6">
            Estamos preparando nossa ferramenta de geração de currículos com IA. 
            Em instantes você terá acesso à melhor tecnologia para criar currículos profissionais.
          </p>
        </div>
        
        {/* Conteúdo educativo durante o loading */}
        <div className="bg-slate-800/50 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-blue-400 mb-2">💡 Dica rápida</h3>
          <p className="text-gray-300 text-sm">
            Currículos bem estruturados aumentam em até 60% as chances de conseguir uma entrevista. 
            Nossa IA garante formatação profissional e destaque das competências técnicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoadingFallback;