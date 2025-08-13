/**
 * Middleware de cache otimizado para performance
 * Implementa estratégias de cache inteligente para diferentes tipos de recursos
 */

// Cache para resultados de geração de currículos
const resumeCache = new Map();
const MAX_CACHE_SIZE = 100;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos

export const cacheMiddleware = {
  // Cache para dados de currículo
  getResumeData: (key) => {
    const cached = resumeCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    return null;
  },

  setResumeData: (key, data) => {
    // Limpar cache se estiver muito grande
    if (resumeCache.size >= MAX_CACHE_SIZE) {
      const oldestKey = resumeCache.keys().next().value;
      resumeCache.delete(oldestKey);
    }
    
    resumeCache.set(key, {
      data,
      timestamp: Date.now()
    });
  },

  // Cache para perfis de usuário
  userProfileCache: new Map(),
  
  getUserProfile: (userId) => {
    const cached = cacheMiddleware.userProfileCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    return null;
  },

  setUserProfile: (userId, profile) => {
    cacheMiddleware.userProfileCache.set(userId, {
      data: profile,
      timestamp: Date.now()
    });
  },

  // Limpar cache expirado
  clearExpiredCache: () => {
    const now = Date.now();
    
    // Limpar cache de currículos
    for (const [key, value] of resumeCache.entries()) {
      if (now - value.timestamp >= CACHE_TTL) {
        resumeCache.delete(key);
      }
    }
    
    // Limpar cache de perfis
    for (const [key, value] of cacheMiddleware.userProfileCache.entries()) {
      if (now - value.timestamp >= CACHE_TTL) {
        cacheMiddleware.userProfileCache.delete(key);
      }
    }
  }
};

// Executar limpeza de cache periodicamente
if (typeof window !== 'undefined') {
  setInterval(cacheMiddleware.clearExpiredCache, 5 * 60 * 1000); // A cada 5 minutos
}

export default cacheMiddleware;
