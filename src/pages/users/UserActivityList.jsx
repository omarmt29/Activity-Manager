
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
  const [activityData, setactivityData] = useState({email: '', name: '', time: '', url_image: '' })
  // const [activity, setactivity] = useState({ name: '', subtitle: '', description: '', image_url: '', location: '', date: '', id: 0 });

  useEffect(() => {
    fetchData().then(() => {
      const companyId = data.session.user.user_metadata.id_company;
      const iduser = data.session.user.id;
      const email = data.session.user.email;
      const name = data.session.user.user_metadata.name;
      setactivityData({...activityData, email: email, name: name});
      console.log(activityData);
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



  const handlerRegistrations = async (e, id, image) => {

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
          .insert({ id_activity: id, id_user: userid, id_company: idCompany, email: activityData.email, name: activityData.name, url_image: image});

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
      <div className="rounded-xl md:border border-stroke md:bg-white md:px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto rounded-x4=l">
          <button className='my-3' onClick={e => handlerclients(e)}>Recargar</button>
          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-5 pb-6 rounded-3xl">

            {Activity == false || null ? <div className='h-full w-full flex justify-center items-center'> <svg class="animate-spin  -ml-1  h-25 w-2h-25 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> </div> : null}
            {Activity.map(e =>

              <div key={e.index} className="h-full overflow-hidden  flex flex-col items-start relative bg-white border-2 border-primary rounded-3xl  shadow md:flex-row md:max-w-full hover:bg-gray-100 hover:cursor-pointer transition-all ease-in dark:border-gray-800 dark:hover:border-primary dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className='w-full'>
                  <img className="object-cover  w-full  rounded-t-lg h-95  md:rounded-none md:rounded-l-lg " src={e.image_url ? e.image_url : 'https://placehold.co/600x400'} alt="" />
                </div>
                <div className="flex flex-col justify-between left-0 bottom-0 bg-gradient-to-t h-full bg-black/20 from-black/80 to-transparenth-full absolute p-4 leading-normal w-full">

                  <div className='flex flex-col-reverse md:flex-row items-start h-full justify-between '>
                    <div>
                      <h5 className=" text-2xl font-extrabold mb-0 tracking-tight [text-shadow:_4px_4px_4px_rgb(0_0_0_/_30%)] text-white  dark:text-white">{e.name}</h5>
                      <p className='text-white text-lg float-left dark:text-white/90  font-semibold'>{e.subtitle}</p>
                    </div>
                    <p className='dark:bg-black/50 text-white float-right md:px-5 rounded-2xl py-1 font-medium mb-4 sm:mb-4 md:mb-0'>{e.date} / {e.time}</p>
                  </div>

                  <div className='w-full'>
                    <p className=" mt-4 font-normal text-white dark:text-white overflow-auto h-25 mb-2">{e.description}</p>
                    <div className='flex flex-col-reverse items-end md:flex-row md:items-end w-full md:justify-between'>
                      <button data-image={e.image_url} className='bg-primary/60 w-full transition-all mt-4 md:mt-0 ease-in hover:bg-primary active:bg-primary md:w-1/4  text-white py-2 px-6 rounded-2xl' id={e.id} onClick={(e) => {handlerRegistrations(e, e.target.getAttribute('id'), e.target.getAttribute('data-image'))} }>Registrarme</button>
                      {e.registrations === e.limit ? <p className='m-0 p-0 text-meta-7 text-lg font-semibold'>Sin cupos: {e.registrations} / {e.limit}</p> : <p className='m-0 p-0 text-green-300 text-lg font-semibold'>Cupos: {e.registrations} / {e.limit}</p>}

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
