import UserAnuncio from './UserAnuncio';
import UserCardOne from './UserCardOne.jsx';
import UserTopActivities from './UserTopActivities';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../servidor/Client.js'
import welcome from '../../../public/welcome.svg'
import faq from '../../../public/faq.svg'
import delete_image from '../../../public/delete_image.svg'
import { useEffect, useState } from 'react';
import UserLayout from '../../layout/UserLayout.jsx';
import { ListOfActivities } from '../../store/services.js';

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
          <div className='h-full w-full pb-25 '>

            <div className='flex justify-center'>
              <img className='w-132 sm:mt-12 h-auto' src={welcome} alt="" />

            </div>

            <div className='mt-25 flex-col md:flex-row gap-12 md:gap-0 flex w-full items-center justify-between'>
              <div className='max-w-203'>
                <h2 className='mb-5 dark:text-white text-2xl md:text-5xl font-extrabold'>¿Cómo se agenda una actividad?</h2>
                <p className='md:text-xl'>Para agendar una actividad, dirígete al menú de la izquierda y ve a la sección "Actividades", <br></br>Allí podrás reservar la que más te interese. Si necesitas reservar una, simplemente haz clic en el botón:</p>
                <button className='bg-primary text-white dark:text-white px-4 py-2 mt-4'>Registrarme</button>
              </div>
              <img className='w-125 sm:mt-12 h-auto' src={faq} alt="" />
            </div>

            <div className='h-[1px] mt-30 bg-gray-700 w-full hidden md:block'></div>

            <div className='mt-25 flex-col-reverse md:flex-row gap-12 md:gap-0 flex w-full items-center justify-between'>
              <img className='w-125 sm:mt-12 h-auto' src={delete_image} alt=""  />

              <div className='max-w-180'>
                <h2 className='mb-5 dark:text-white text-2xl md:text-5xl font-extrabold'>¿Deseas cancelar una reservación?</h2>
                <p className='md:text-xl '>Dirígete al menú, en la sección 'Reservas', podrás visualizar todas las actividades ya reservadas con tu cuenta. Si necesitas cancelar alguna, simplemente haz clic en el botón:</p>
                <button className='bg-red-500 text-white px-4 py-2 mt-4'>Cancelar Reservacion</button>
              </div>
            </div>

          </div>
        </div>
        {/* <ChatCard /> */}
      </div>
    </UserLayout>
  );
};

export default Lobby;
