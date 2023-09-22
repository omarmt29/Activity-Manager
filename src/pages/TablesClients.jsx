import Breadcrumb from '../components/Breadcrumb';
import TableClientsAdmin from '../components/TableClientsAdmin.jsx';
import DefaultLayout from '../layout/AdminLayout';




const TablesClients = () => {

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Actividades" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        {/* <TableTwo /> */}  
        <TableClientsAdmin />
      </div>
    </DefaultLayout>
  );
};

export default TablesClients;
