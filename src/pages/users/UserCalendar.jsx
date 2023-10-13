import UserLayout from '../../layout/UserLayout';
import { useState, useEffect } from 'react'
import { useDataStore, UserListOfActivities } from '../../store/services';
import { supabase } from '../../servidor/Client'
import { IoTimeSharp, IoCalendarClearSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const UserCalendar = () => {
  const { data, fetchData } = useDataStore();
  const [idCompany, setIdCompany] = useState('')
  const [userid, setUserId] = useState('')
  const [activityId, setactivityId] = useState([])
  const [deletedItemId, setDeletedItemId] = useState(null); // Nuevo estado para rastrear el elemento eliminado
  const navigate = useNavigate();

  // const [activity, setactivity] = useState({ name: '', subtitle: '', description: '', image_url: '', location: '', date: '', id: 0 });
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();

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
    fetchData().then(async () => {
      const companyId = data.session.user.user_metadata.id_company;
      const iduser = data.session.user.id;
      setIdCompany(companyId);
      setUserId(iduser);

      await ListOfRegistration(iduser, companyId);
    });
  }, [deletedItemId]);

  const ListOfRegistration = async (id, idcompany) => {
    try {
      const { data, error } = await supabase
        .from('activity_registrations')
        .select()
        .eq('id_user', id)
        .eq('id_company', idcompany);

      if (error) {
        console.error("Error al consultar la base de datos:", error);
        return;
      }


      // Crear un array de promesas para las consultas a 'activity'
      const activityPromises = data.map(async (registration) => {
        const { data: activityData, error: activityError } = await supabase
          .from('activity')
          .select()
          .eq('id', registration.id_activity)
          .eq('id_company', registration.id_company);

        if (activityError) {
          console.error("Error al consultar la tabla 'activity':", activityError);
        }

        return activityData;
      });

      // Esperar a que todas las promesas se resuelvan
      const activityResults = await Promise.all(activityPromises);

      // activityResults ahora contiene los datos de todas las actividades
      setactivityId(activityResults);
      console.log(activityResults);

    } catch (e) {
      console.error("Error general:", e);
    }
  }

  const registrationsResult = async (id) => {
    const { data, error } = await supabase
      .from('activity_registrations')
      .select('id')
      .eq('id_activity', id);
  
    if (data && data.length > 0) {
      return  data.length;
    } else {
      return 0;
    }
  }
  
  const UpdateRegistrationOfActivity = async (id, currentRegistrations) => {
    console.log(currentRegistrations)
    const updatedRegistrations = currentRegistrations ;

    
    const { error } = await supabase
      .from('activity')
      .update({ registrations: updatedRegistrations})
      .eq('id', id);
  
    if (error) {
      console.error("Error al actualizar registros:", error);
    }
  }
  
  const handlerDeleteRegistration = async (e, id) => {
    e.preventDefault();
  
    const { error } = await supabase
      .from('activity_registrations')
      .delete()
      .eq('id_activity', id)
      .eq('id_user', userid);
  
    if (error) {
      console.error("Error al eliminar:", error);
    } else {
      // Actualiza el estado local para reflejar la eliminación
      setDeletedItemId(id);
    }
    const currentRegistrations = await registrationsResult(id);
    await UpdateRegistrationOfActivity(id, currentRegistrations);

  }
  

  return (

    <div className="w-full max-w-full gap-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-900 grid md:grid-cols-1 lg:grid-cols-[450px] xl:grid-cols-2">

      {activityId.map(a => <div className='hover:scale-110 transition-all ease-in w-full' key={a.index}>

        <div className="w-full flex   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700 ">
          <img className=" rounded-lg w-31 h-31 object-cover" src={a[0].image_url} alt="product image" />
          <div className="px-5 pb-5 w-full flex flex-col justify-between">
            <h5 className="text-2xl mt-3 font-semibold tracking-tight text-gray-900 dark:text-white">{a[0].name}</h5>
            <div className="flex flex-col sm:flex-row sm:w-full sm:items-center  sm:justify-between">
              <div className='flex items-center'>
                <IoCalendarClearSharp className='text-1xl' />
                <span className="text-md font-bold text-gray-900 dark:text-white px-2">{a[0].date}</span>
                <IoTimeSharp className='text-1xl' />
                <span className="text-md font-bold text-gray-900 dark:text-white pl-1">{a[0].time}</span>
              </div>
              <button id={a[0].id} onClick={e => handlerDeleteRegistration(e, e.target.getAttribute('id'))} className="mt-5 sm:mt-0 text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancelar reservacion</button>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default UserCalendar;
