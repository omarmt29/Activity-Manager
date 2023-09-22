import create from 'zustand';
import { supabase } from '../servidor/Client';
import {persist} from 'zustand/middleware';


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

