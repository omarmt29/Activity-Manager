import UserAnuncio from './UserAnuncio';
import UserCardOne from './UserCardOne.jsx';
import UserTopActivities from './UserTopActivities';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../servidor/Client.js'

import { useEffect, useState } from 'react';
import UserLayout from '../../layout/UserLayout.jsx';
import {  ListOfActivities } from '../../store/services.js';

const Lobby = () => {
  const [session, setSession] = useState({})
  const navigate = useNavigate();
  const { searchSupabase, searchResults } = ListOfActivities();
  const [idCompany, setIdCompany] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data)

      if (data?.session) {
        setSession(data.session);
        const companyId = data.session.user.user_metadata.id_company;
        setIdCompany(companyId);
      } else {
        navigate("/auth/signin");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (idCompany) {
      searchSupabase(idCompany).then((results) => {
        setUsers(results);
      });

      const handlerClients = async () => {
        const { data: newData, error } = await supabase
          .from('activity')
          .select('*')
          .eq('id_company', idCompany)
          .order('created_at', { ascending: false });

        if (newData) {
          setUsers(newData.length);
          console.log(users)
        } else {
          console.error(error);
        }
      };

      handlerClients();
    }
  }, [idCompany, searchSupabase]);
 
  return (
    <UserLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        {/* <UserCardOne activities={users} className='w-full'/> */}
        {/* <CardTwo /> */}
        {/* <CardThree /> */}
        {/* <UserAnuncio /> */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-12">
          {/* <UserTopActivities /> */}
          <div className='bg-white/5 h-full '>
              <h2 className='text-primary font-extrabold text-6xl dark:text-white'>BIENVENIDO</h2>
          </div>
        </div>
        {/* <ChatCard /> */}
      </div>
    </UserLayout>
  );
};

export default Lobby;
