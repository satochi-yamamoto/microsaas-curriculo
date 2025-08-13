import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

function AccountPage() {
  const { user, updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar sua conta."
      });
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }
  }, [user, navigate, toast]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-300">Redirecionando para o login...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'As novas senhas não coincidem',
      });
      return;
    }
    setLoading(true);
    const { error } = await updatePassword(currentPassword, newPassword);
    if (!error) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Gerenciar Conta</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-effect rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Alterar Senha</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current" className="text-white font-medium">Senha Atual</Label>
              <Input
                id="current"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new" className="text-white font-medium">Nova Senha</Label>
              <Input
                id="new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-white font-medium">Confirmar Nova Senha</Label>
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder-white/60"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
            >
              {loading ? 'Salvando...' : 'Alterar Senha'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
