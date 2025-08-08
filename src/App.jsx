import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { useAdsterra } from '@/hooks/useAdsterra';
import Header from '@/components/Header';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import PageLoadingFallback from '@/components/PageLoadingFallback';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load all pages for code splitting
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const ResultPage = React.lazy(() => import('@/pages/ResultPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));
const PricingPage = React.lazy(() => import('@/pages/PricingPage'));
const PrivacyPolicy = React.lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('@/pages/TermsOfService'));
const HistoryPage = React.lazy(() => import('@/pages/HistoryPage'));
const AccountPage = React.lazy(() => import('@/pages/AccountPage'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage'));

function App() {
  // Inicializar Adsterra
  useAdsterra();
  
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen">
            <Header />
            <main>
              <Suspense fallback={<PageLoadingFallback />}>
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
                </Routes>
              </Suspense>
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