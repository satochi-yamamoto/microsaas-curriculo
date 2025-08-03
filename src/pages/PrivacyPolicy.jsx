import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
      <Helmet>
        <title>Política de Privacidade - Gerador de Currículos</title>
        <meta name="description" content="Saiba como tratamos seus dados no gerador de currículos e nossa política de anúncios." />
        <meta name="google-adsense-account" content="ca-pub-4789090074866563" />
      </Helmet>
      
      <div className="glass-effect rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Política de Privacidade</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-blue-400 mb-3">Coleta e Uso de Dados</h2>
            <p className="mb-4">
              Nosso gerador de currículos coleta apenas as informações necessárias para criar seu currículo profissional. 
              Os dados informados (nome, cargo, experiências, tecnologias) são utilizados exclusivamente para gerar o conteúdo 
              do seu currículo através de nossa inteligência artificial.
            </p>
            <p className="mb-4">
              <strong>Importante:</strong> Não armazenamos permanentemente suas informações pessoais em nossos servidores. 
              Após a geração do currículo, os dados são automaticamente removidos de nossos sistemas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-3">Cookies e Tecnologias Similares</h2>
            <p className="mb-4">
              Utilizamos cookies essenciais para o funcionamento básico do site, incluindo:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Cookies de sessão para manter o estado do formulário</li>
              <li>Cookies de preferências para melhorar sua experiência</li>
              <li>Cookies analíticos para entender como os usuários interagem com o site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">Publicidade e Google AdSense</h2>
            <p className="mb-4">
              Este site exibe anúncios fornecidos pelo Google AdSense para ajudar a manter o serviço gratuito. 
              Sobre nossa publicidade:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Os anúncios são exibidos apenas em páginas com conteúdo editorial relevante</li>
              <li>Utilizamos anúncios responsivos que se adaptam ao dispositivo do usuário</li>
              <li>O Google pode usar cookies para exibir anúncios baseados em interesses</li>
              <li>Você pode gerenciar suas preferências de anúncios através das configurações do Google</li>
            </ul>
            <p className="mb-4">
              Para mais informações sobre como o Google usa dados para anúncios, visite: 
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-1">
                Políticas de Anúncios do Google
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-3">Segurança dos Dados</h2>
            <p className="mb-4">
              Implementamos medidas de segurança adequadas para proteger suas informações durante o processamento:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Conexões HTTPS criptografadas</li>
              <li>Processamento temporário dos dados</li>
              <li>Exclusão automática após geração do currículo</li>
              <li>Acesso restrito aos sistemas de IA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-3">Seus Direitos</h2>
            <p className="mb-4">
              Como usuário, você tem direito a:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Saber quais dados são coletados e como são utilizados</li>
              <li>Solicitar a exclusão de dados (quando aplicável)</li>
              <li>Optar por não receber anúncios personalizados</li>
              <li>Receber suporte sobre questões de privacidade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-red-400 mb-3">Contato</h2>
            <p className="mb-4">
              Para questões sobre esta política de privacidade ou sobre o tratamento de seus dados, 
              entre em contato conosco através dos canais disponíveis no site.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            <strong>Última atualização:</strong> 02 de agosto de 2025
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <Button 
            onClick={() => navigate('/')} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
