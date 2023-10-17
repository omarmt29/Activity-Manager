import { useLayoutEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from "react-router-dom";
import { useDataStore, checkUserPermissions } from '../store/services';
import { useEffect } from 'react';


const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, fetchData } = useDataStore();

  const [executed, setExecuted] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!executed) {
      const fetchDataAsync = async () => {
        await fetchData(); // Llama a la función fetchData cuando el componente se monta
        console.log(data);
        const check = async () => {
          const result = await checkUserPermissions(data.session.user.id)

          if (result == 'user') {
            navigate('/user/lobby')
          }
          if (result == 'Usuario desactivado') {
            navigate('/auth/signin')
          }
        }
        check()
      };

      fetchDataAsync();
    }
  }, [executed, navigate]);

  return (
    <div className="dark:bg-gray-900 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default AdminLayout;
