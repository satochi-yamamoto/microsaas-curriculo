import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar automaticamente após 5 segundos
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <AlertCircle className="w-24 h-24 text-red-400" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-6xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-gray-300">
              Página não encontrada
            </h2>
            <p className="text-gray-400">
              A página que você está procurando não existe ou foi removida.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Redirecionando automaticamente em 5 segundos...
            </p>
            
            <Button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white inline-flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Voltar para o início
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFoundPage;
