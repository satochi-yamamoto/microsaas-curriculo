import React from 'react';
import { motion } from 'framer-motion';

export function EditorialContent({ title, children, className = "" }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className={`bg-slate-800/50 rounded-lg p-6 mb-8 ${className}`}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="prose prose-invert max-w-none text-gray-300">
        {children}
      </div>
    </motion.article>
  );
}

export function TechTrends() {
  return (
    <EditorialContent title="Tendências do Mercado de Tecnologia em 2024">
      <p className="mb-4">
        O mercado de tecnologia continua em constante evolução, e estar preparado com um currículo que reflita 
        as tendências atuais é fundamental para se destacar. Análises de dados de recrutamento mostram padrões 
        interessantes que podem influenciar diretamente suas chances de sucesso.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-400 mb-2">🤖 Inteligência Artificial</h3>
          <p className="text-sm">
            95% das empresas tech já utilizam IA em seus processos de recrutamento. 
            Currículos otimizados para sistemas automatizados têm 40% mais chances de aprovação.
          </p>
        </div>
        
        <div className="bg-purple-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-400 mb-2">📊 Habilidades Específicas</h3>
          <p className="text-sm">
            72% dos recrutadores priorizam competências técnicas específicas sobre formação acadêmica. 
            Destacar tecnologias relevantes é crucial.
          </p>
        </div>
        
        <div className="bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-400 mb-2">⚡ Velocidade de Contratação</h3>
          <p className="text-sm">
            60% das vagas em tecnologia são preenchidas em menos de 30 dias. 
            Ter um currículo pronto e otimizado é vantagem competitiva.
          </p>
        </div>
        
        <div className="bg-yellow-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-400 mb-2">👀 Atenção do Recrutador</h3>
          <p className="text-sm">
            Recrutadores levam apenas 8 segundos para decidir se um currículo merece atenção. 
            Layout profissional é essencial.
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mt-6">
        Fonte: Pesquisa "State of Tech Recruiting 2024" realizada com mais de 1.000 recrutadores e profissionais de RH.
      </p>
    </EditorialContent>
  );
}

export function ResumeOptimizationGuide() {
  return (
    <EditorialContent title="Guia Completo: Como Otimizar seu Currículo para Tecnologia">
      <p className="mb-4">
        Criar um currículo eficaz para a área de tecnologia requer conhecimento específico sobre o que 
        recrutadores e sistemas automatizados procuram. Este guia aborda as melhores práticas baseadas 
        em dados reais do mercado.
      </p>
      
      <h3 className="text-xl font-semibold text-blue-400 mb-3 mt-6">1. Estrutura e Formatação</h3>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Formato PDF:</strong> Sempre exporte em PDF para garantir formatação consistente</li>
        <li><strong>Tamanho ideal:</strong> 1-2 páginas para profissionais com até 10 anos de experiência</li>
        <li><strong>Fontes legíveis:</strong> Use fontes profissionais como Arial, Calibri ou Open Sans</li>
        <li><strong>Espaçamento:</strong> Mantenha espaçamento adequado para facilitar a leitura</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-purple-400 mb-3">2. Conteúdo Estratégico</h3>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Resumo profissional:</strong> 2-3 linhas destacando suas principais qualificações</li>
        <li><strong>Palavras-chave:</strong> Inclua tecnologias e termos específicos da vaga</li>
        <li><strong>Quantificação:</strong> Use números para demonstrar impacto e resultados</li>
        <li><strong>Projetos relevantes:</strong> Destaque projetos que demonstrem suas habilidades</li>
      </ul>
      
      <h3 className="text-xl font-semibold text-green-400 mb-3">3. Otimização para ATS</h3>
      <p className="mb-4">
        Sistemas de rastreamento de candidatos (ATS) são usados por 85% das empresas. 
        Para passar por esses filtros:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Evite elementos gráficos complexos que podem confundir o sistema</li>
        <li>Use títulos de seção padrão como "Experiência", "Educação", "Habilidades"</li>
        <li>Inclua palavras-chave da descrição da vaga naturalmente no texto</li>
        <li>Mantenha formatação simples e consistente</li>
      </ul>
      
      <div className="bg-yellow-900/20 p-4 rounded-lg mt-6">
        <p className="text-sm">
          <strong>💡 Dica de especialista:</strong> Nossa ferramenta de IA foi treinada especificamente 
          para criar currículos que atendem a todos esses critérios, garantindo máxima compatibilidade 
          com sistemas ATS e preferências de recrutadores.
        </p>
      </div>
    </EditorialContent>
  );
}
