import Breadcrumb from '../components/Breadcrumb.tsx';
import TableActivityAdmin from '../components/TableActivityAdmin.jsx';
import DefaultLayout from '../layout/AdminLayout.tsx';




const TablesActivity = () => {

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Actividades" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        {/* <TableTwo /> */}  
        <TableActivityAdmin />
      </div>
    </DefaultLayout>
  );
};

export default TablesActivity;
