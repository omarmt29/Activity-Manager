import CardFour from '../users/UserAnuncio';
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';
import ChartOne from '../../components/ChartOne';
import ChartThree from '../../components/ChartThree';
import ChartTwo from '../../components/ChartTwo';
import ChatCard from '../../components/ChatCard';
import MapOne from '../../components/MapOne';
import TableOne from '../../components/TableOne';
import AdminLayout from '../../layout/AdminLayout';
import { useNavigate } from "react-router-dom";
import { useDataStore } from '../../store/services';
import { useEffect } from 'react';

const Admin = () => {
  const navigate = useNavigate();
  const { data, fetchData } = useDataStore();
 
  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData(); // Llama a la función fetchData cuando el componente se monta
      console.log(data)
         
      if (data.session) {
        data.session.user.user_metadata.permissions ? navigate("/") : navigate('/user/lobby') 
      }else{
        navigate("/auth/signin");
      }
    };
    fetchDataAsync()

   
  },[])

 
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
   
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
      
        {/* <ChatCard /> */}
      </div>
    </AdminLayout>
  );
};

export default Admin;
