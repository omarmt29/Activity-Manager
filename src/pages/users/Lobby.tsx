import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../servidor/Client.js'

import { useEffect, useState } from 'react';
import UserLayout from '../../layout/UserLayout.tsx';

const Lobby = () => {
  const [session, setSession] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const handlerSession = async () => {

      const { data, error } = await supabase.auth.getSession()

      if (data.session) {
       
        console.log(data)
        setSession(data.session)
        data.session.user.user_metadata.permissions ? navigate("/") : navigate('/lobby') 
      }else{
        console.log(error)
        navigate("/auth/signin");
      }
     
    }
    handlerSession()
  }, [])

 
  return (
    <UserLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </UserLayout>
  );
};

export default Lobby;
