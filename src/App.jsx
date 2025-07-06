import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ResultPage from '@/pages/ResultPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PricingPage from '@/pages/PricingPage';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Header';
import CookieBanner from '@/components/CookieBanner';

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
              <Route path="/planos" element={<PricingPage />} />
            </Routes>
          </main>
          <CookieBanner />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;