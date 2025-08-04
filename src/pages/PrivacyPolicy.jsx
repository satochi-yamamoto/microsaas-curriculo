import React from 'react';
import { Button } from '@/components/ui/button';
import { SEOHelmet } from '@/components/SEOHelmet';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
      <SEOHelmet
        title="Política de Privacidade - Gerador de Currículos IA | LGPD e AdSense"
        description="Saiba como tratamos seus dados no gerador de currículos, nossa política de anúncios Google AdSense e conformidade com LGPD. Transparência total sobre cookies e privacidade."
        keywords="política privacidade, LGPD, Google AdSense, cookies, proteção dados, privacidade online"
        url="https://geradordecurriculosai.com/politica-de-privacidade"
        noIndex={false}
      />
      
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
              O Google AdSense é um serviço de publicidade fornecido pela Google Inc. que utiliza cookies e outras tecnologias de rastreamento.
            </p>
            
            <h3 className="text-lg font-semibold text-green-300 mb-2">Como funcionam os anúncios:</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Os anúncios são exibidos apenas em páginas com conteúdo editorial relevante e de qualidade</li>
              <li>Utilizamos anúncios responsivos que se adaptam automaticamente ao dispositivo do usuário</li>
              <li>O Google AdSense pode usar cookies para exibir anúncios baseados em seus interesses e navegação anterior</li>
              <li>Os anúncios são claramente identificados e separados do conteúdo editorial</li>
              <li>Não influenciamos o conteúdo editorial com base nos anúncios exibidos</li>
            </ul>

            <h3 className="text-lg font-semibold text-green-300 mb-2">Cookies e Tecnologias do Google AdSense:</h3>
            <p className="mb-2">O Google AdSense utiliza as seguintes tecnologias:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Cookies de publicidade:</strong> Para exibir anúncios relevantes e medir a eficácia das campanhas</li>
              <li><strong>DoubleClick Cookie:</strong> Para servir anúncios mais relevantes e evitar mostrar anúncios que você já viu</li>
              <li><strong>Cookies de conversão:</strong> Para medir quando alguém realiza uma ação após ver um anúncio</li>
              <li><strong>Pixels de rastreamento:</strong> Para coletar informações sobre como você interage com anúncios</li>
            </ul>

            <h3 className="text-lg font-semibold text-green-300 mb-2">Controle de Anúncios Personalizados:</h3>
            <p className="mb-2">Você pode controlar os anúncios que vê:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Configurações de anúncios do Google
                </a> - Para personalizar ou desativar anúncios baseados em interesses
              </li>
              <li>
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Opt-out do Google Analytics
                </a> - Para desativar o rastreamento do Google Analytics
              </li>
              <li>
                <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  AdChoices
                </a> - Para optar por não receber anúncios comportamentais de várias empresas
              </li>
            </ul>

            <p className="mb-4">
              Para mais informações detalhadas sobre como o Google coleta e usa dados para anúncios, consulte:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Como o Google usa dados quando você usa sites ou apps de nossos parceiros
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Política de Privacidade do Google
                </a>
              </li>
              <li>
                <a href="https://support.google.com/adsense/answer/1348695" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Políticas do Google AdSense
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-orange-400 mb-3">Conformidade com LGPD e Regulamentações</h2>
            <p className="mb-4">
              Nosso site está em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras regulamentações aplicáveis:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Coletamos apenas dados necessários para o funcionamento do serviço</li>
              <li>Informamos claramente sobre o uso de cookies e rastreamento</li>
              <li>Oferecemos opções para controlar cookies e anúncios personalizados</li>
              <li>Mantemos a transparência sobre parceiros de publicidade</li>
              <li>Excluímos dados automaticamente quando não são mais necessários</li>
            </ul>
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
            <strong>Última atualização:</strong> 19 de dezembro de 2024
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
