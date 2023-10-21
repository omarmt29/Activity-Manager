import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup.tsx';
import { FaHouse, FaList, FaCalendarCheck, FaDoorOpen } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../servidor/Client.js'
import { useDataStore, ListOfActivities } from '../../store/services.js';
import logo_dark from '../../../public/logo-black.svg';
import logo from '../../../public/logo.svg';

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [news, setnews] = useState([])
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const { data, fetchData } = useDataStore();

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });


  const handlerNews = async (id) => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id_company', id)
      .order('id', {ascending: false})
    console.log(error)
    console.log(data)
    setnews(data)
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        const companyId = data.session.user.user_metadata.id_company;
        handlerNews(companyId)

      }
    };

    fetchData()
  }, []);



  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const logout = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      navigate('/auth/signin')
    }
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-500 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/user/lobby">
          <img className='h-16 w-16 ' src={logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4  text-sm font-semibold text-white">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">




              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/user/lobby"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary dark:hover:bg-meta-4 ${pathname.includes('/user/lobby') && 'bg-primary dark:bg-primary'
                    }`}
                >
                  <FaHouse className='text-2xl' />
                  Inicio
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/user/activities"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary dark:hover:bg-meta-4 ${pathname.includes('/user/activities') && 'bg-primary dark:bg-primary'
                    }`}
                >
                  <FaList className='text-2xl' />

                  Actividades
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              <li>
                <NavLink
                  to="/user/calendar"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary dark:hover:bg-meta-4 ${pathname.includes('/user/calendar') && 'bg-primary dark:bg-primary'
                    }`}
                >
                  <FaCalendarCheck className='text-2xl' />

                  Reservadas
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
              <li >
                <NavLink
                  onClick={e => logout(e)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary dark:hover:bg-meta-4 ${pathname.includes('settings') && 'bg-primary dark:bg-primary'
                    }`}
                >
                  <FaDoorOpen className='text-2xl' />
                  Cerrar sesión
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

        </nav>
        {/* <!-- Sidebar Menu --> */}

      </div>
      <h3 className="mb-4 pl-5 text-sm font-semibold text-white">
        ANUNCIOS
      </h3>

      {news.length > 0 ? <div className='rounded-md overflow-hidden px-5'> <img className='w-full  h-115 object-cover  rounded-xl' src={news[0].image_url} alt="" /></div> : null}

    </aside>
  );
};

export default UserSidebar;
