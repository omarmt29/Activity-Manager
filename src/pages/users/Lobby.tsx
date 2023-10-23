import UserAnuncio from './UserAnuncio';
import UserCardOne from './UserCardOne.jsx';
import UserTopActivities from './UserTopActivities';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../servidor/Client.js'
import welcome2 from '../../../public/welcome2.svg'
import password from '../../../public/password.svg'
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

            <div className='flex items-center justify-between flex-col md:flex-row  w-full'>
              <img className='w-125 sm:mt-12 h-auto md:pr-30' src={welcome2} alt="" />
              <div  className='flex flex-col gap-5 w-full'>
                <h2 className='text-3xl text-center mt-12 md:text-start  md:text-8xl dark:text-white  font-extrabold'>BIENVENIDOS</h2>
                <p className='text-start md:text-xl'>¡Bienvenido a nuestra emocionante aplicación web de gestión de actividades turísticas! <br></br><br></br>

                  Estamos encantados de que hayas decidido unirte a nuestra comunidad de amantes de los viajes y las aventuras. Con esta aplicación, tendrás acceso a una amplia gama de actividades turísticas emocionantes y únicas, diseñadas para que tu experiencia de viaje sea inolvidable.</p>

              </div>
            </div>

            <div className='mt-25 flex-col md:flex-row gap-12 md:gap-0 flex w-full items-center justify-between'>
              <div className='max-w-203'>
                <h2 className='mb-5 dark:text-white text-2xl md:text-5xl font-extrabold'>¿Cómo se agenda una actividad?</h2>
                <p className='md:text-xl'>Para agendar una actividad, primero dirígete al menú de la izquierda de nuestra plataforma. Luego, encuentra la sección etiquetada como 'Actividades'. Aquí encontrarás una lista de todas las actividades disponibles para reservar. Examina la lista y selecciona la que más te interese o se ajuste a tus planes.
                  <br /><br />
                  Una vez que hayas elegido una actividad, simplemente haz clic en el botón correspondiente a esa actividad para completar el proceso de reserva. Esto te llevará a una página donde podrás revisar los detalles de la actividad, como la fecha, hora y ubicación. Asegúrate de verificar que todo sea correcto antes de confirmar tu reserva.</p>
                <button className='bg-primary text-white dark:text-white px-4 py-2 mt-8'>Registrarme</button>
              </div>
              <img className='w-125 sm:mt-12 h-auto' src={password} alt="" />
            </div>

            <div className='h-[1px] mt-30 bg-gray-700 w-full hidden md:block'></div>

            <div className='mt-25 flex-col-reverse md:flex-row gap-12 md:gap-0 flex w-full items-center justify-between'>
              <img className='w-125 sm:mt-12 h-auto' src={delete_image} alt="" />

              <div className='max-w-180'>
                <h2 className='mb-5 dark:text-white text-2xl md:text-5xl font-extrabold'>¿Deseas cancelar una reservación?</h2>
                <p className='md:text-xl '>Dirígete al menú de usuario, en la sección 'Reservas'. Aquí encontrarás una lista completa de todas las actividades que has reservado previamente con tu cuenta. Esta función te proporciona un registro detallado de tus actividades programadas, lo que facilita la gestión y el seguimiento de tus compromisos.
                  <br /> <br />
                  Si en algún momento necesitas cancelar una reserva, el proceso es rápido y sencillo. Para cancelar una reserva, simplemente localiza la actividad que deseas cancelar en la lista de reservas. Luego, haz clic en el botón 'Cancelar' que corresponde a esa actividad en particular. Una vez que hayas confirmado la cancelación, recibirás una notificación para informarte que la reserva se ha cancelado con éxito.
                  <br /><br />
                  Recuerda que, si tienes alguna pregunta o necesitas asistencia adicional en relación con las cancelaciones, nuestro equipo de soporte siempre está disponible para ayudarte. Estamos aquí para que tu experiencia con nosotros sea lo más conveniente y personalizada posible.</p>
                <button className='bg-red-500 text-white px-4 py-2 mt-8'>Cancelar Reservacion</button>
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
