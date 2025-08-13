import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.redirectTimer = null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Redirecionar para a página inicial após 10 segundos
    this.redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 10000);
  }

  componentWillUnmount() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  }

  handleGoHome = () => {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
    window.location.href = '/';
  };

  handleReload = () => {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="max-w-md w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <AlertTriangle className="w-24 h-24 text-red-400" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-white">Oops!</h1>
                <h2 className="text-xl font-semibold text-gray-300">
                  Algo deu errado
                </h2>
                <p className="text-gray-400">
                  Ocorreu um erro inesperado. Você será redirecionado automaticamente para a página inicial.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Redirecionando em 10 segundos...
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={this.handleGoHome}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <Home className="w-4 h-4" />
                    Ir para o início
                  </button>
                  
                  <button
                    onClick={this.handleReload}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 transition-all border border-white/20"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Recarregar página
                  </button>
                </div>
              </div>

              {this.state.error && (
                <details className="mt-6 text-left bg-white/5 rounded-lg p-4 border border-white/10">
                  <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                    Detalhes técnicos do erro
                  </summary>
                  <pre className="mt-3 text-xs text-red-300 bg-red-900/20 p-3 rounded border border-red-500/20 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;