import { createClient } from '@supabase/supabase-js';
import { cacheMiddleware } from './cacheMiddleware';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cliente Supabase otimizado com cache
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Wrapper otimizado para operações de perfil com cache
export const optimizedSupabase = {
  // Buscar perfil com cache
  async getProfile(userId) {
    const cached = cacheMiddleware.getUserProfile(userId);
    if (cached) {
      return { data: cached, error: null };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data && !error) {
      cacheMiddleware.setUserProfile(userId, data);
    }

    return { data, error };
  },

  // Atualizar perfil e invalidar cache
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (data && !error) {
      cacheMiddleware.setUserProfile(userId, data);
    }

    return { data, error };
  },

  // Buscar histórico com paginação otimizada
  async getHistory(userId, page = 0, limit = 10) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);

    return { data, error };
  }
};

export default supabase;


