import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoadingFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

export default PageLoadingFallback;