import React, { useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Download, CheckCircle, ArrowLeft, FileText } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import html2pdf from 'html2pdf.js';

// Lazy load ResumePreview component
const ResumePreview = React.lazy(() => import('@/components/ResumePreview').then(module => ({ default: module.ResumePreview })));

function ResultPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [curriculoData, setCurriculoData] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    return () => {
      localStorage.removeItem('curriculoData');
    };
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('curriculoData');
    if (!data) {
      navigate('/');
      return;
    }
    setCurriculoData(JSON.parse(data));

    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_subscriber')
          .eq('id', user.id)
          .single();
        if (!error && data) {
          setIsSubscriber(data.is_subscriber);
        }
      }
    };
    fetchProfile();
  }, [navigate, user]);

  const handleDownload = async () => {
    const element = document.getElementById('resume-to-print');
    if (!element) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Elemento do currículo não encontrado."
      });
      return;
    }

    toast({
      title: "Gerando PDF...",
      description: "Seu currículo está sendo processado para download."
    });

    try {
      const opt = {
        margin: [10, 15, 10, 15], // top, right, bottom, left in mm
        filename: `curriculo-${curriculoData.nomeCompleto.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "PDF gerado com sucesso!",
        description: "O download do seu currículo foi iniciado."
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o PDF. Tente novamente."
      });
    }
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

      <div className="min-h-screen py-6 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          

          <div className="grid gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-effect rounded-2xl p-8"
              >
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Currículo Gerado</span>
                    <br />
                    <span className="text-white">com Sucesso!</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-6">
                    Seu currículo profissional foi criado usando IA e está pronto para download!
                  </p>
                </motion.div>

                {curriculoData && (
                  <Suspense fallback={<LoadingSpinner size="lg" className="my-8" />}>
                    <ResumePreview data={curriculoData} />
                  </Suspense>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 space-y-4 text-center"
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

            
          </div>

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

          {/* Conteúdo editorial sobre otimização de currículo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-slate-800/50 rounded-lg p-6 mt-12 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Próximos passos para maximizar suas oportunidades</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">✅ Personalize para cada vaga</h3>
                <p className="text-sm">Adapte as palavras-chave e experiências relevantes para cada posição que você aplicar. Isso aumenta significativamente suas chances de sucesso.</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">📧 Carta de apresentação</h3>
                <p className="text-sm">Complemente seu currículo com uma carta de apresentação personalizada que destaque sua motivação para a vaga específica.</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-2">🔗 Perfil LinkedIn</h3>
                <p className="text-sm">Mantenha seu perfil do LinkedIn atualizado e consistente com as informações do seu currículo para máxima visibilidade.</p>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">📊 Acompanhe resultados</h3>
                <p className="text-sm">Monitore a taxa de resposta das suas aplicações e ajuste estratégias conforme necessário para melhorar os resultados.</p>
              </div>
            </div>
          </motion.div>
        </div>

       
      </div>
    </>
  );
}

export default ResultPage;
