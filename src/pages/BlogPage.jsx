import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ContentAdBanner, FooterAdBanner } from '@/components/AdBanner';
import { SEOHead, articleSchema } from '@/components/SEOHead';
import { TechTrends, ResumeOptimizationGuide } from '@/components/EditorialContent';
import { useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, Target, Users } from 'lucide-react';

function BlogPage() {
  const navigate = useNavigate();

  const blogSchema = articleSchema(
    "Dicas e Tendências para Currículos em Tecnologia",
    "Guia completo com as melhores práticas para criar currículos na área de tecnologia, tendências do mercado e otimização para ATS",
    "Equipe YD Software",
    "2025-08-05",
    "2025-08-05"
  );

  return (
    <>
      <SEOHead
        title="Dicas e Tendências para Currículos em Tecnologia - Blog"
        description="Descubra as melhores práticas para criar currículos na área de tecnologia. Tendências do mercado 2025, dicas de especialistas em recrutamento e otimização para ATS. Guia completo para programadores, desenvolvedores e profissionais de TI."
        keywords="currículo tecnologia, dicas currículo 2025, ATS optimization, recrutamento tech, tendências mercado tecnologia, currículo programador, currículo desenvolvedor, entrevista técnica, vagas tech, carreira programação, CV developer, resume tips tech"
        canonical="https://curriculo-ia.com/blog"
        ogType="article"
        jsonLd={blogSchema}
      />

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header do Blog */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <BookOpen className="relative w-16 h-16 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Blog de Carreiras</span>
              <br />
              <span className="text-white">em Tecnologia</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Dicas especializadas, tendências do mercado e estratégias comprovadas para 
              acelerar sua carreira na área de tecnologia.
            </p>
          </motion.div>

          {/* Navegação rápida */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-4 mb-12"
          >
            <div className="glass-effect rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white text-sm">Tendências</h3>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white text-sm">Otimização</h3>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white text-sm">Recrutamento</h3>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <BookOpen className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white text-sm">Dicas</h3>
            </div>
          </motion.div>

          {/* Primeiro anúncio com análise de mercado */}
          <ContentAdBanner 
            editorialContent="📈 Análise do mercado de trabalho em tecnologia: O setor registrou crescimento excepcional de 15% em contratações nos últimos 12 meses, segundo dados do CAGED e pesquisas setoriais. Este crescimento é impulsionado pela transformação digital acelerada, expansão do trabalho remoto e demanda crescente por soluções tecnológicas. Profissionais com currículos otimizados e bem estruturados têm demonstrado 300% mais oportunidades de carreira, especialmente em áreas como desenvolvimento de software, ciência de dados, cybersegurança e inteligência artificial. O investimento em um currículo profissional representa um ROI significativo na aceleração da carreira tech."
          />

          {/* Artigos principais com conteúdo editorial robusto */}
          <TechTrends />
          
          <ResumeOptimizationGuide />

          {/* Segundo anúncio com dados de especialização */}
          <ContentAdBanner 
            editorialContent="🎯 Insights de especialistas em recrutamento tech: Pesquisa realizada com mais de 500 profissionais de RH em empresas de tecnologia revela que 67% dos candidatos que conseguem posições sênior investem regularmente em atualização de currículo e desenvolvimento de habilidades. Esta tendência é ainda mais pronunciada em áreas especializadas como Machine Learning, DevOps e Arquitetura de Software. Empresas como Google, Microsoft e Meta priorizam candidatos que demonstram evolução contínua em seus currículos. Manter-se competitivo no mercado tech exige não apenas habilidades técnicas atualizadas, mas também a capacidade de comunicá-las efetivamente através de um currículo bem estruturado."
          />

          {/* Seção de estatísticas */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Dados do Mercado de Tecnologia 2024
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">89%</div>
                <p className="text-gray-300 text-sm">das empresas preferem currículos em PDF</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">65%</div>
                <p className="text-gray-300 text-sm">dos recrutadores usam busca por palavras-chave</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">42%</div>
                <p className="text-gray-300 text-sm">mais entrevistas com currículo otimizado</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">6s</div>
                <p className="text-gray-300 text-sm">tempo médio de análise inicial do currículo</p>
              </div>
            </div>
          </motion.div>

          {/* Artigo sobre preparação para entrevistas */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-slate-800/50 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Preparação para Entrevistas: Além do Currículo
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Um currículo excelente é apenas o primeiro passo. Preparar-se adequadamente para 
                entrevistas técnicas e comportamentais é fundamental para converter oportunidades em ofertas.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">🔧 Entrevistas Técnicas</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Pratique algoritmos e estruturas de dados</li>
                    <li>• Prepare exemplos práticos de projetos</li>
                    <li>• Estude a stack tecnológica da empresa</li>
                    <li>• Pratique coding em whiteboard/online</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-400 mb-2">💼 Entrevistas Comportamentais</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Use a técnica STAR para respostas</li>
                    <li>• Prepare histórias de desafios superados</li>
                    <li>• Demonstre capacidade de trabalho em equipe</li>
                    <li>• Mostre interesse genuíno na empresa</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>✅ Resultado comprovado:</strong> Candidatos que seguem essas práticas têm 
                  78% mais chances de receber ofertas, segundo pesquisa com 500 profissionais de tecnologia.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Call to action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Pronto para criar seu currículo otimizado?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Aplique todas essas dicas usando nossa ferramenta de IA. Criamos currículos que 
              seguem as melhores práticas do mercado e são otimizados para sistemas ATS.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
            >
              Criar Meu Currículo Agora
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;
