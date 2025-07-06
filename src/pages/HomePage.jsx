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
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { FileText, Sparkles, Zap, Target } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cargoDesejado: '',
    email: '',
    telefone: '',
    tecnologias: [],
    experiencias: '',
    formacao: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_subscriber, generation_count, last_generation_date')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // Ignore 'no rows found' error
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const canGenerate = async () => {
    const today = new Date().toDateString();

    if (user) {
      let currentProfile = profile;
      if (!currentProfile) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        currentProfile = data;
        setProfile(data);
      }

      const isSubscriber = currentProfile?.is_subscriber || false;
      let count = currentProfile?.generation_count || 0;
      const lastDate = currentProfile?.last_generation_date ? new Date(currentProfile.last_generation_date).toDateString() : null;

      if (lastDate !== today) {
        count = 0;
      }

      const limit = isSubscriber ? 20 : 5;

      if (count < limit) {
        const newCount = count + 1;
        const { error } = await supabase
          .from('profiles')
          .update({ generation_count: newCount, last_generation_date: new Date().toISOString() })
          .eq('id', user.id);
        if (error) console.error("Error updating count:", error);
        else setProfile(p => ({...p, generation_count: newCount, last_generation_date: new Date().toISOString() }));
        return true;
      } else {
        toast({ title: "Limite atingido", description: `Você pode gerar ${limit} currículos por dia.`, variant: "destructive" });
        return false;
      }
    } else {
      // Guest user logic
      const now = new Date().getTime();
      const usage = JSON.parse(localStorage.getItem('usage_guest')) || [];
      const recentUsage = usage.filter(timestamp => now - timestamp < 48 * 60 * 60 * 1000);
      
      if (recentUsage.length < 2) {
        recentUsage.push(now);
        localStorage.setItem('usage_guest', JSON.stringify(recentUsage));
        return true;
      } else {
        toast({ title: "Limite atingido", description: "Cadastre-se para gerar mais currículos.", variant: "destructive" });
        return false;
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!(await canGenerate())) {
      return;
    }

    if (!formData.nomeCompleto.trim() || !formData.cargoDesejado.trim() || !formData.email.trim() || !formData.telefone.trim() || formData.tecnologias.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome completo, o cargo desejado, email, telefone e adicione ao menos uma tecnologia.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    const prompt = `Crie um currículo para um profissional de tecnologia com base nas seguintes informações. Formate a saída em Markdown, utilizando títulos (###) para as seções e listas com marcadores (*) para itens.

**Nome:** ${formData.nomeCompleto}
**Cargo Desejado:** ${formData.cargoDesejado}
**Email:** ${formData.email}
**Telefone:** ${formData.telefone}
**Tecnologias:** ${formData.tecnologias.join(', ')}
**Experiência:** ${formData.experiencias}
**Formação:** ${formData.formacao}

O currículo deve incluir as seguintes seções:
1.  **Resumo Profissional:** Um parágrafo conciso e impactante.
2.  **Tecnologias:** Uma lista de tecnologias mencionadas.
3.  **Experiência Profissional:** Formate a experiência fornecida em um estilo profissional, usando bullet points para destacar responsabilidades e conquistas.
4.  **Formação Acadêmica:** Liste o curso mencionado.`;
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.7
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`Falha na API da OpenAI: ${errorData.error.message}`);
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
      toast({
        title: "Erro",
        description: `Ocorreu um erro ao gerar o currículo: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTecnologiasChange = tecnologias => {
    setFormData(prev => ({
      ...prev,
      tecnologias
    }));
  };

  const isSubscriber = profile?.is_subscriber || false;

  return <>
      <Helmet>
        <title>Gerador de Currículos com IA - Crie seu CV Profissional</title>
        <meta name="description" content="Gere currículos profissionais para área de tecnologia usando inteligência artificial. Rápido, fácil e moderno." />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
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

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="glass-effect rounded-2xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-white font-medium">
                    Nome Completo *
                  </Label>
                  <Input id="nome" type="text" placeholder="Seu nome completo" value={formData.nomeCompleto} onChange={e => setFormData(prev => ({ ...prev, nomeCompleto: e.target.value }))} className="bg-white/5 border-white/20 text-white placeholder-white/60" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-white font-medium">
                    Cargo Desejado *
                  </Label>
                  <Input id="cargo" type="text" placeholder="Ex: Desenvolvedor Full Stack" value={formData.cargoDesejado} onChange={e => setFormData(prev => ({ ...prev, cargoDesejado: e.target.value }))} className="bg-white/5 border-white/20 text-white placeholder-white/60" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email *
                  </Label>
                  <Input id="email" type="email" placeholder="Seu email" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} className="bg-white/5 border-white/20 text-white placeholder-white/60" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white font-medium">
                    Telefone de Contato *
                  </Label>
                  <Input id="telefone" type="tel" placeholder="(11) 99999-9999" value={formData.telefone} onChange={e => setFormData(prev => ({ ...prev, telefone: e.target.value }))} className="bg-white/5 border-white/20 text-white placeholder-white/60" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Tecnologias que Domina *
                </Label>
                <TagInput value={formData.tecnologias} onChange={handleTecnologiasChange} placeholder="Digite uma tecnologia e pressione Enter" />
                <p className="text-sm text-gray-400">
                  Ex: React, Node.js, Python, Docker, AWS, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiencias" className="text-white font-medium">
                  Últimas Experiências Profissionais
                </Label>
                <Textarea id="experiencias" placeholder="Descreva suas últimas experiências profissionais, projetos relevantes, conquistas..." value={formData.experiencias} onChange={e => setFormData(prev => ({ ...prev, experiencias: e.target.value }))} className="bg-white/5 border-white/20 text-white placeholder-white/60 min-h-32" rows={6} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formacao" className="text-white font-medium">
                  Formação
                </Label>
                <Textarea id="formacao" placeholder="inclua sua formação, Curso superior em tecnologia, na universidade XXX concluído no 2ºsemestre de 2024" value={formData.formacao} onChange={e => setFormData(prev => ({ ...prev, formacao: e.target.value }))} className="bg-white/5 border-white/20 text-white placeholder-white/60 min-h-32" rows={4} />
              </div>

              

              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 pulse-glow">
                  {isLoading ? <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Gerando Currículo...
                    </div> : <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Gerar Currículo com IA
                    </div>}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid md:grid-cols-3 gap-6 text-center">
            <div className="glass-effect rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">IA Avançada</h3>
              <p className="text-gray-400 text-sm">Utilizamos GPT para criar currículos únicos e profissionais</p>
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
    </>;
}

export default HomePage;
