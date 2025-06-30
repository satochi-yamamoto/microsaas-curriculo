
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/AdBanner';
import { useToast } from '@/components/ui/use-toast';
import { Download, CheckCircle, ArrowLeft, FileText } from 'lucide-react';

function ResultPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [curriculoData, setCurriculoData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('curriculoData');
    if (!data) {
      navigate('/');
      return;
    }
    setCurriculoData(JSON.parse(data));
  }, [navigate]);

  const handleDownload = () => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "O download do PDF será implementado em breve! Solicite esta funcionalidade no próximo prompt! 🚀"
    });
  };

  const handleNewCurriculo = () => {
    localStorage.removeItem('curriculoData');
    navigate('/');
  };

  if (!curriculoData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Currículo Gerado com Sucesso - Download Disponível</title>
        <meta name="description" content="Seu currículo profissional foi gerado com sucesso. Faça o download agora mesmo!" />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Banner Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <AdBanner 
              id="header-banner"
              className="h-24"
              content="🎯 Espaço para Banner AdSense - Cabeçalho da Página de Resultado"
            />
          </motion.div>

          {/* Conteúdo Principal */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-effect rounded-2xl p-8 text-center"
              >
                {/* Ícone de Sucesso */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <CheckCircle className="relative w-20 h-20 text-green-400" />
                  </div>
                </motion.div>

                {/* Mensagem de Sucesso */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Currículo Gerado</span>
                    <br />
                    <span className="text-white">com Sucesso!</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-6">
                    Seu currículo profissional foi criado usando IA e está pronto para download!
                  </p>

                  <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Dados do Currículo:</h3>
                    <div className="text-left space-y-2 text-gray-300">
                      <p><strong>Nome:</strong> {curriculoData.nomeCompleto}</p>
                      <p><strong>Cargo:</strong> {curriculoData.cargoDesejado}</p>
                      <p><strong>Tecnologias:</strong> {curriculoData.tecnologias.join(', ')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Botão de Download */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4"
                >
                  <Button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 pulse-glow"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Baixar Currículo PDF
                  </Button>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleNewCurriculo}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Criar Novo Currículo
                    </Button>
                    
                    <Button
                      onClick={() => toast({
                        title: "🚧 Funcionalidade em desenvolvimento",
                        description: "O compartilhamento será implementado em breve! Solicite esta funcionalidade no próximo prompt! 🚀"
                      })}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Coluna Lateral - Banner */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sticky top-8"
              >
                <AdBanner 
                  id="sidebar-banner"
                  className="h-96"
                  content="📊 Espaço para Banner AdSense - Lateral do Botão de Download"
                />
              </motion.div>
            </div>
          </div>

          {/* Dicas e Informações */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="glass-effect rounded-xl p-6 text-center">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Formato PDF</h3>
              <p className="text-gray-400 text-sm">
                Currículo em formato PDF profissional, pronto para envio
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Otimizado</h3>
              <p className="text-gray-400 text-sm">
                Layout moderno e otimizado para sistemas de recrutamento
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 text-center">
              <Download className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Download Rápido</h3>
              <p className="text-gray-400 text-sm">
                Baixe instantaneamente e comece a aplicar para vagas
              </p>
            </div>
          </motion.div>
        </div>

        {/* Banner Rodapé Fixo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-sm border-t border-white/10"
        >
          <div className="max-w-4xl mx-auto">
            <AdBanner 
              id="footer-banner"
              className="h-16"
              content="🚀 Espaço para Banner AdSense - Rodapé Fixo"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default ResultPage;
