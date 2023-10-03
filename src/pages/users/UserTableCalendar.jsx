import Breadcrumb from './Breadcrumb';
import UserActivityList from './UserActivityList';
import UserLayout from '../../layout/UserLayout';
import UserCalendar from './UserCalendar.jsx';




const UserTableCalendar = () => {

  
  return (
    <UserLayout>
      <Breadcrumb pageName="Calendario de actividades reservadas" >
        <div className="flex flex-col gap-10">
          {/* <TableOne /> */}
          {/* <TableTwo /> */}  
        </div>
      </Breadcrumb>
      <p className='mb-4 text-lg text-white'>Selecciona una actividad para eliminar reservacion</p>
      <UserCalendar />
      
    </UserLayout>
  );
};

export default UserTableCalendar;
