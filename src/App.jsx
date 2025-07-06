import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ResultPage from '@/pages/ResultPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PricingPage from '@/pages/PricingPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import HistoryPage from '@/pages/HistoryPage';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Header';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';

function App() {
  return (
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
              <Route path="/planos" element={<PricingPage />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/termos-de-uso" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;