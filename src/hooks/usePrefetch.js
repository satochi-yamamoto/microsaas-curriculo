import { useEffect } from 'react';

const prefetchQueue = new Set();

export const usePrefetch = (importFn, condition = true) => {
  useEffect(() => {
    if (condition && !prefetchQueue.has(importFn)) {
      prefetchQueue.add(importFn);
      
      // Prefetch after a longer delay to ensure main app has loaded
      const timer = setTimeout(() => {
        importFn().catch(() => {
          // Ignore prefetch errors
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [importFn, condition]);
};

// Common page prefetchers
export const prefetchHomePage = () => import('@/pages/HomePage');
export const prefetchLoginPage = () => import('@/pages/LoginPage');
export const prefetchRegisterPage = () => import('@/pages/RegisterPage');
export const prefetchPricingPage = () => import('@/pages/PricingPage');
export const prefetchAccountPage = () => import('@/pages/AccountPage');
export const prefetchHistoryPage = () => import('@/pages/HistoryPage');