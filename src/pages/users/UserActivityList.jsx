
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
  const [Activity, setActivity] = useState([])
  const [openModal, setOpenModal] = useState('');
  const [message, setmessage] = useState({ status: false, id: '', fail: false });
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
    return data[0].limit
    console.log(limit)
  }

  const handlerRegistrationsList = async (e, id) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('activity_registrations')
      .select()
      .eq('id_activity', id)
    return data.length
  }



  const handlerRegistrations = async (e, id) => {

    e.preventDefault();

    const limits = await handlerSelectLimit(e, id);
    const registrations = await handlerRegistrationsList(e, id);

    // Ejecutar las dos funciones de forma secuencial usando async/await

    try {

      console.log(limits)
      console.log(registrations)

      // Verifica cuantas inscripciones tiene el cliente de esa actividad

      const { data } = await supabase
        .from('activity_registrations')
        .select('id')
        .eq('id_user', userid)
        .eq('id_activity', id);

      // Verifica cuantas inscripciones tiene el cliente de esa actividad


      if (registrations < limits && data.length < 1) {
        const { error } = await supabase
          .from('activity_registrations')
          .insert({ id_activity: id, id_user: userid, id_company: idCompany });

        const { data } = await supabase
          .from("activity")
          .update({ registrations: registrations + 1 })
          .eq("id", id)
          .single();


        setmessage({ ...message, status: true, id: id, fail: null })
      } else {
        setmessage({ ...message, status: false, id: id, fail: true })
        setInterval(() => {
          setmessage({ ...message, status: null, id: id, fail: null })

        }, 4000)

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

              <div key={e.index} className="h-full flex flex-col items-start relative bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 hover:cursor-pointer transition-all ease-in dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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
                    <div className='flex items-end justify-between'>
                    <button className='bg-primary/60 transition-all ease-in hover:bg-primary active:bg-primary w-1/4  text-white py-2 px-6 rounded-2xl' id={e.id} onClick={e => handlerRegistrations(e, e.target.getAttribute('id'))}>Registrarme</button>
                      {e.registrations === e.limit ?  <p className='m-0 p-0 text-meta-7 text-lg font-semibold'>Cupos: {e.registrations} / {e.limit}</p> :  <p className='m-0 p-0 text-green-300 text-lg font-semibold'>Cupos: {e.registrations} / {e.limit}</p>} 
                     
                    </div>

                  </div>

                </div>
                {message.status == true && message.id == e.id ? <div className='absolute transition-all ease-in z-0 bottom-2/4 flex items-center justify-center w-full fade-in'>
                  <p className='text-8xl'>✅</p>
                </div> : null}

                {message.fail == true && message.id == e.id && message.status == false ? <div className='absolute transition-all ease-in z-0 bottom-2/4 flex items-center justify-center w-full fade-in'>
                  <p className='text-8xl'>❌</p>
                </div> : null}
              </div>

            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default UserTableActivity;
