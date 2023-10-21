import Breadcrumb from './Breadcrumb';
import UserActivityList from './UserActivityList';
import UserLayout from '../../layout/UserLayout.jsx';
import { useNavigate } from "react-router-dom";
import { useDataStore } from '../../store/services';
import { supabase } from '../../servidor/Client'
import { useState, useEffect } from 'react'


const TablesActivity = () => {

  const { data, fetchData } = useDataStore();
  const navigate = useNavigate();

  // const [activity, setactivity] = useState({ name: '', subtitle: '', description: '', image_url: '', location: '', date: '', id: 0 });
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
      } else {
        navigate("/auth/signin");
      }
    };

    fetchData();
  }, []);
  return (
    <UserLayout>
      <Breadcrumb pageName="Agendar Actividades" >
        <div className="flex flex-col gap-10">
          {/* <TableOne /> */}
          {/* <TableTwo /> */}  
        </div>
      </Breadcrumb>
      <p className='mb-4 text-lg text-primary dark:text-white'>Selecciona una actividad para agendarla</p>
      <UserActivityList />
      
    </UserLayout>
  );
};

export default TablesActivity;
