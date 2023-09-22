import create from 'zustand';
import { supabase } from '../servidor/Client';
import { persist } from 'zustand/middleware';


export const useDataStore = create(persist((set) => ({
  data: [{}],
  fetchData: async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        throw error;
      }
      set({ data });
    } catch (error) {
      set({ error });
      console.error('Error al recuperar datos de Supabase:', error);
    }
  },
  resetData: () => {
    set({ data: [{}] });
    localStorage.removeItem('usersession');
  },
}), {
  name: 'usersession'
}));


export const useSupabaseSearch = create((set) => ({
  searchResults: [],
  searchSupabase: async (idCompany) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id_company', idCompany)
        .eq('permissions', false)
        .order('created_at', { ascending: false });
      if (error) {
        throw error;
      }

      set({ searchResults: data });
    } catch (error) {
      console.error('Error al buscar en Supabase:', error);
    }
  },
}));