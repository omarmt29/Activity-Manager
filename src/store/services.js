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

export const managercompany = create((set) => ({
  companyresults: [],
  handlercompany: async (idCompany) => {
    try {
      const { data, error } = await supabase
        .from('company')
        .select('*')
        .eq('id_company', idCompany)
      if (error) {
        throw error;
      }

      set({ companyresults: data });
    } catch (error) {
      console.error('Error al buscar en Supabase:', error);
    }
  },
}));



export const ListOfActivities = create((set) => ({
  searchResults: [],
  searchSupabase: async (idCompany) => {
    try {
      const { data, error } = await supabase
        .from('activity')
        .select('*')
        .eq('id_company', idCompany)
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

export const UserListOfActivities = create((set) => ({
  searchResults: [],
  searchSupabase: async (idCompany) => {
    try {
      const { data, error } = await supabase
        .from('activity')
        .select('*')
        .eq('id_company', idCompany)
        .eq('status', true)
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

export const ActivityRegistrationByUser = create((set) => ({
  ActivityResult: [],
  handlerActivity: async (company, user) => {
    try {
      const { data, error } = await supabase
        .from('activity_registrations')
        .select('*')
        .eq('id_company', company)
        .eq('id_user', user)
      if (error) {
        throw error;
      }

      set({ ActivityResult: data });
    } catch (error) {
      console.error('Error al buscar en Supabase:', error);
    }
  },
}));


export const checkUserPermissions = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('status, permissions')
    .eq('id', id);

  if (error) return console.log(error);

  if (!data) return 'User does not exist';

  if (data[0].status) {
    return data[0].permissions ? 'admin' : 'user';
  } else {
    return 'Usuario desactivado';
  }

};
