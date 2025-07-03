import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/TagInput';
import { AdBanner } from '@/components/AdBanner';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Sparkles, Zap, Target } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cargoDesejado: '',
    email: '',
    telefone: '',
    tecnologias: [],
    experiencias: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userIp, setUserIp] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const openAiKey = import.meta.env.VITE_OPENAI_TOKEN;
  const deepSeekKey = import.meta.env.VITE_DEEPSEEK_TOKEN;
  const copilotKey = import.meta.env.VITE_GITHUB_COPILOT_TOKEN;

  const apiKey = openAiKey || deepSeekKey || copilotKey;
  const isOpenAI = Boolean(openAiKey);
  const isDeepSeek = !isOpenAI && Boolean(deepSeekKey);
  const isCopilot = !isOpenAI && !isDeepSeek && Boolean(copilotKey);

  useEffect(() => {
    async function fetchIp() {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setUserIp(data.ip);
      } catch (err) {
        console.error('Failed to fetch IP', err);
        setUserIp('unknown');
      }
    }
    fetchIp();
  }, []);

  useEffect(() => {
    if (!userIp) return;
    const submissions = JSON.parse(localStorage.getItem('submissions') || '{}');
    const now = Date.now();
    const dayMs = 86400000;
    const records = (submissions[userIp] || []).filter(ts => now - ts < dayMs);
    submissions[userIp] = records;
    localStorage.setItem('submissions', JSON.stringify(submissions));
    setRemainingAttempts(3 - records.length);
  }, [userIp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissions = JSON.parse(localStorage.getItem('submissions') || '{}');
    const ip = userIp || 'unknown';
    const now = Date.now();
    const dayMs = 86400000;
    const records = (submissions[ip] || []).filter(ts => now - ts < dayMs);
    if (records.length >= 3) {
      toast({
        title: 'Limite atingido',
        description: 'Você já gerou 3 currículos nas últimas 24 horas.',
        variant: 'destructive'
      });
      return;
    }
    records.push(now);
    submissions[ip] = records;
    localStorage.setItem('submissions', JSON.stringify(submissions));
    setRemainingAttempts(3 - records.length);
    setIsLoading(true);

    const prompt = `Crie um currículo para um profissional de tecnologia com base nas seguintes informações. Formate a saída em Markdown, utilizando títulos (###) para as seções e listas com marcadores (*) para itens.

**Nome:** ${formData.nomeCompleto}
**Cargo Desejado:** ${formData.cargoDesejado}
**Email:** ${formData.email}
**Telefone:** ${formData.telefone}
**Tecnologias:** ${formData.tecnologias.join(', ')}
**Experiência:** ${formData.experiencias}

O currículo deve incluir as seguintes seções:
1.  **Resumo Profissional:** Um parágrafo conciso e impactante.
2.  **Tecnologias:** Uma lista de tecnologias mencionadas.
3.  **Experiência Profissional:** Formate a experiência fornecida em um estilo profissional, usando bullet points para destacar responsabilidades e conquistas.`;
    
    try {
      const endpoint = isOpenAI
        ? 'https://api.openai.com/v1/chat/completions'
        : isDeepSeek
          ? 'https://api.deepseek.com/v1/chat/completions'
          : 'https://api.github.com/copilot/v1/chat/completions';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': isCopilot ? `token ${apiKey}` : `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: isOpenAI ? 'gpt-3.5-turbo' : isDeepSeek ? 'deepseek-chat' : 'github-copilot-chat',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`Falha na API: ${errorData.error.message}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      
      const curriculoCompleto = {
        ...formData,
        generatedContent: generatedContent
      };

      localStorage.setItem('curriculoData', JSON.stringify(curriculoCompleto));
      
      toast({
        title: "Sucesso!",
        description: "Seu currículo foi gerado com sucesso!"
      });
      
      navigate('/curriculo-gerado');
    } catch (error) {
      console.error(error);
      const creditError = /quota|credit|crédit|cred[ií]tos|billing|payment/i.test(
        error.message
      );
      toast({
        title: "Erro",
        description: creditError
          ? "O sistema não está respondendo. Tente novamente mais tarde."
          : `Ocorreu um erro ao gerar o currículo: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTecnologiasChange = (tecnologias) => {
    setFormData(prev => ({ ...prev, tecnologias }));
  };

  return (
    <>
      <Helmet>
        <title>Gerador de Currículos com IA - Crie seu CV Profissional</title>
        <meta name="description" content="Gere currículos profissionais para área de tecnologia usando inteligência artificial. Rápido, fácil e moderno." />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <AdBanner
              id="top-banner"
              className="h-16"
              content="🚀 Espaço para Banner AdSense - Topo da Página"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <FileText className="relative w-16 h-16 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Gerador de Currículos</span>
              <br />
              <span className="text-white">com IA</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Crie currículos profissionais para área de tecnologia usando inteligência artificial. 
              Rápido, moderno e otimizado para recrutadores tech.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>IA Avançada</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Geração Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                <span>Foco em Tech</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-white font-medium">
                    Nome Completo *
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nomeCompleto}
                    onChange={(e) => setFormData(prev => ({ ...prev, nomeCompleto: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-white/60"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-white font-medium">
                    Cargo Desejado *
                  </Label>
                  <Input
                    id="cargo"
                    type="text"
                    placeholder="Ex: Desenvolvedor Full Stack"
                    value={formData.cargoDesejado}
                    onChange={(e) => setFormData(prev => ({ ...prev, cargoDesejado: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-white/60"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-white/60"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white font-medium">
                    Telefone de Contato *
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder-white/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Tecnologias que Domina *
                </Label>
                <TagInput
                  value={formData.tecnologias}
                  onChange={handleTecnologiasChange}
                  placeholder="Digite uma tecnologia e pressione Enter"
                />
                <p className="text-sm text-gray-400">
                  Ex: React, Node.js, Python, Docker, AWS, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiencias" className="text-white font-medium">
                  Últimas Experiências Profissionais
                </Label>
                <Textarea
                  id="experiencias"
                  placeholder="Descreva suas últimas experiências profissionais, projetos relevantes, conquistas..."
                  value={formData.experiencias}
                  onChange={(e) => setFormData(prev => ({ ...prev, experiencias: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder-white/60 min-h-32"
                  rows={6}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <AdBanner 
                  id="middle-banner"
                  className="h-20 my-6"
                  content="💼 Espaço para Banner AdSense - Entre Formulário e Botão"
                />
              </motion.div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading || remainingAttempts <= 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 pulse-glow"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Gerando Currículo...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Gerar Currículo com IA
                    </div>
                  )}
                </Button>
                <p className="text-gray-400 text-sm mt-2">
                  Você ainda pode gerar {remainingAttempts} currículo{remainingAttempts !== 1 ? 's' : ''} hoje.
                </p>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 text-center"
          >
            <div className="glass-effect rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">IA Avançada</h3>
              <p className="text-gray-400 text-sm">
                Utilizamos GPT-4 para criar currículos únicos e profissionais
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Geração Rápida</h3>
              <p className="text-gray-400 text-sm">
                Seu currículo fica pronto em segundos, formatado e otimizado
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Foco em Tech</h3>
              <p className="text-gray-400 text-sm">
                Especializado em profissionais de tecnologia e desenvolvimento
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
