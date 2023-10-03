import DarkModeSwitcher from './DarkModeSwitcher';


const LoginHeader = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex py-4 px-4 shadow-2 w-full">
      
        <div className="flex justify-end  w-full">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

         
          </ul>

        
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
