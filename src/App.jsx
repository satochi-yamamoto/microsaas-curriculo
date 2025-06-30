
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ResultPage from '@/pages/ResultPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/curriculo-gerado" element={<ResultPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
