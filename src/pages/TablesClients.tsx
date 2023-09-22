import Breadcrumb from '../components/Breadcrumb';
// import TableOne from '../components/TableOne';
import TableClientsAdmin from '../components/TableThree';
// import TableTwo from '../components/TableTwo';
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
