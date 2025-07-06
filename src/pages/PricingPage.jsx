import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Gratuito',
    price: 'R$0',
    description: 'Para começar a explorar e criar seus primeiros currículos.',
    features: [
      '2 currículos a cada 48 horas (não logado)',
      '5 currículos por dia (logado)',
      'Acesso ao gerador com IA',
      'Layouts modernos',
      'Exibição de anúncios',
    ],
    cta: 'Comece Agora',
    link: '/register',
    isFeatured: false,
  },
  {
    name: 'Premium',
    price: 'Em Breve',
    description: 'A experiência completa para impulsionar sua carreira.',
    features: [
      '20 currículos por dia',
      'Experiência sem anúncios',
      'Layouts premium exclusivos',
      'Suporte prioritário',
      'Mais recursos em breve!',
    ],
    cta: 'Seja Notificado',
    link: '#',
    isFeatured: true,
  },
];

function PricingPage() {
  const { toast } = useToast();

  const handleNotifyClick = (e) => {
    e.preventDefault();
    toast({
      title: "Fique por dentro!",
      description: "Você será notificado assim que o plano Premium for lançado! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Planos e Preços - Gerador de Currículos com IA</title>
        <meta name="description" content="Escolha o plano que melhor se adapta às suas necessidades e comece a criar currículos incríveis." />
      </Helmet>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full blur-xl opacity-30"></div>
                <Star className="relative w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nossos Planos</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Escolha o plano ideal para você e comece a criar currículos profissionais com o poder da IA.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`glass-effect rounded-2xl p-8 border-2 ${plan.isFeatured ? 'border-purple-500 shadow-2xl shadow-purple-500/20' : 'border-white/10'}`}
              >
                {plan.isFeatured && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Mais Popular</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-gray-400 mb-6 h-12">{plan.description}</p>
                <p className="text-4xl font-bold text-white mb-6">{plan.price}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.link} onClick={plan.name === 'Premium' ? handleNotifyClick : undefined}>
                  <Button
                    className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${plan.isFeatured ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingPage;