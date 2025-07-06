import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { ResumePreview } from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';

function HistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [curriculos, setCurriculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurriculos = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('curriculos')
        .select('id, data, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar currículos:', error);
      } else {
        setCurriculos(data);
      }
      setLoading(false);
    };
    fetchCurriculos();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Helmet>
          <title>Histórico de Currículos</title>
        </Helmet>
        <p className="text-gray-300">É necessário estar logado para visualizar o histórico.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Histórico de Currículos</title>
      </Helmet>
      <div className="min-h-screen p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Histórico de Currículos</h1>
        {loading ? (
          <p className="text-gray-300">Carregando...</p>
        ) : curriculos.length === 0 ? (
          <p className="text-gray-300">Nenhum currículo encontrado.</p>
        ) : (
          <div className="space-y-6">
            {curriculos.map((item) => {
              const resumeData =
                typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
              return (
                <div key={item.id} className="glass-effect p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                  <ResumePreview data={resumeData} />
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/')}>Criar Novo Currículo</Button>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
