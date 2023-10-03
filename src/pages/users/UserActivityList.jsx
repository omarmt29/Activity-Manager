
import { useDataStore, UserListOfActivities } from '../../store/services';
import { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '../../servidor/Client'
import { format } from 'date-fns';
import { FaRegEyeSlash, FaRegSun } from "react-icons/fa";
import { Button, Modal } from 'flowbite-react';

const UserTableActivity = () => {
  const { data, fetchData } = useDataStore();
  const { searchSupabase, searchResults } = UserListOfActivities();
  const [idCompany, setIdCompany] = useState('')
  const [userid, setUserId] = useState('')
  const [limit, setLimit] = useState(0)
  const [record_activities, setrecordActivities] = useState(0)
  const [Activity, setActivity] = useState([])
  const [openModal, setOpenModal] = useState('');
  const [message, setmessage] = useState('');
  const [buttondisable, setbuttondisable] = useState(false);
  // const [activity, setactivity] = useState({ name: '', subtitle: '', description: '', image_url: '', location: '', date: '', id: 0 });

  useEffect(() => {
    fetchData().then(() => {
      const companyId = data.session.user.user_metadata.id_company;
      const iduser = data.session.user.id;
      setIdCompany(companyId);
      setUserId(iduser);
      console.log(userid)
    });
  }, []);

  useEffect(() => {
    if (idCompany) {
      searchSupabase(idCompany).then(() => {
        setActivity(searchResults);
      });
    }
  }, [idCompany, searchSupabase, searchResults]);

  const handlerclients = async (e) => {
    e.preventDefault();
    const { data: newData } = await supabase
      .from('activity')
      .select('*')
      .eq('id_company', idCompany)
      .eq('status', true)
      .order('created_at', { ascending: false });
    setActivity(newData);
  };


  const handlerSelectLimit = async (e, id) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('activity')
      .select('limit')
      .eq('id_company', idCompany)
      .eq('id', id)
      .eq('status', true)
    setLimit(data[0].limit)
    console.log(limit)
  }

  const handlerRegistrationsList = async (e, id) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('activity_registrations')
      .select()
      .eq('id_activity', id)
    setrecordActivities(data.length)
    console.log(record_activities)
  }



  const handlerRegistrations = async (e, id) => {
    e.preventDefault();

    // Ejecutar las dos funciones de forma secuencial usando async/await
    try {
      const limitResponse = await handlerSelectLimit(e, id);
      const registrationsListResponse = await handlerRegistrationsList(e, id);

      const { data } = await supabase
        .from('activity_registrations')
        .select('id')
        .eq('id_user', userid)
        .eq('id_activity', id);

      console.log(data.length)
      // Verificar las respuestas de las funciones
      if (limitResponse) {
        console.log(limitResponse);
      }

      if (registrationsListResponse) {
        console.log(registrationsListResponse);
      }

      if (record_activities <= limit && data.length < 1) {
        const { error } = await supabase
          .from('activity_registrations')
          .insert({ id_activity: id, id_user: userid, id_company: idCompany });

      } else {
        alert('No es posible registrarse')
      }

    } catch (error) {

      console.error(error);

    }
  };


  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <button className='my-3' onClick={e => handlerclients(e)}>Recargar</button>
          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-5">
            {Activity.map(e =>

              <div key={e.index} className=" flex flex-col items-start relative bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 hover:cursor-pointer transition-all ease-in dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className='w-full'>
                  <img className="object-cover rounded-lg w-full  rounded-t-lg h-95  md:rounded-none md:rounded-l-lg " src={e.image_url ? e.image_url : 'https://placehold.co/600x400'} alt="" />
                </div>
                <div className="flex flex-col justify-between left-0 bottom-0 bg-gradient-to-t h-full bg-black/20 from-black/80 to-transparenth-full absolute p-4 leading-normal w-full">

                  <div className='flex flex-col-reverse md:flex-row items-start h-full justify-between '>
                    <div>
                      <h5 className=" text-2xl font-extrabold mb-0 tracking-tight [text-shadow:_4px_4px_4px_rgb(0_0_0_/_30%)] text-white  dark:text-white">{e.name}</h5>
                      <p className='text-black text-lg float-left dark:text-white/90  font-semibold'>{e.subtitle}</p>
                    </div>
                    <p className='dark:bg-black/50 text-white float-right px-5 rounded-2xl py-1 font-medium mb-4 sm:mb-4 md:mb-0'>{e.date} / {e.time}</p>
                  </div>

                  <div>
                    <p className=" mt-4 font-normal text-white dark:text-white overflow-auto h-25 mb-2">{e.description}</p>
                    <button className='bg-primary/10 transition-all ease-in hover:bg-primary active:bg-primary w-full text-white py-2 px-6 rounded-2xl' id={e.id} onClick={e => handlerRegistrations(e, e.target.getAttribute('id'))}>Registrarme</button>

                  </div>

                </div>
              </div>

            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default UserTableActivity;