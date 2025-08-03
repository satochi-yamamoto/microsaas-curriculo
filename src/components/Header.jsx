import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { LogOut, User, Crown } from 'lucide-react';

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Prefetch likely navigation targets - temporarily disabled for troubleshooting
  // usePrefetch(prefetchLoginPage, !user);
  // usePrefetch(prefetchRegisterPage, !user);
  // usePrefetch(prefetchPricingPage);
  // usePrefetch(prefetchAccountPage, !!user);
  // usePrefetch(prefetchHistoryPage, !!user);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="py-4 px-4 sm:px-6 sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            Currículo IA
          </motion.div>
        </Link>
        <nav>
          <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <li>
                  <span className="text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.email}
                  </span>
                </li>
                <li>
                  <Button onClick={() => navigate('/planos')} variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300">
                    <Crown className="w-4 h-4 mr-2" />
                    Assinatura
                  </Button>
                </li>
                <li>
                  <Link to="/historico">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Histórico
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/conta">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Conta
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/blog">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Dicas
                    </Button>
                  </Link>
                </li>
                <li>
                  <Button onClick={handleLogout} variant="ghost" size="icon">
                    <LogOut className="w-5 h-5 text-red-400" />
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/blog">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Dicas
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Login
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Cadastre-se
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
