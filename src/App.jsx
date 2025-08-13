import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { useOptimizedResources } from '@/hooks/useOptimizedResources';
import Header from '@/components/Header';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

// Import all pages directly (no lazy loading)
import HomePage from '@/pages/HomePage';
import ResultPage from '@/pages/ResultPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PricingPage from '@/pages/PricingPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import HistoryPage from '@/pages/HistoryPage';
import AccountPage from '@/pages/AccountPage';
import BlogPage from '@/pages/BlogPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  // Otimizar recursos para melhor performance
  useOptimizedResources();
  
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/curriculo-gerado" element={<ResultPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/historico" element={<HistoryPage />} />
                <Route path="/conta" element={<AccountPage />} />
                <Route path="/planos" element={<PricingPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/dicas" element={<BlogPage />} />
                <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
                <Route path="/termos-de-uso" element={<TermsOfService />} />
                {/* Rota catch-all para 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <CookieBanner />
            <Toaster />
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;