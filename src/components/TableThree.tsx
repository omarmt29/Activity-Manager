






const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[70px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">
                Imagen
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">
                Nombre
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Fecha
              </th>
              <th className="min-w-[120px] py-4 px-4 font-semibold text-black dark:text-white">
                Estado
              </th>
              <th className="py-4 px-4 font-semibold text-black dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <img className="w-12 h-12 object-cover rounded" src="data:image/jpeg;base64,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" alt="" />
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-sm text-black dark:text-white">
                  Natacion
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black text-sm dark:text-white">Jan 13,2023</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="inline-flex text-sm rounded-full bg-success bg-opacity-10 py-1 px-3 font-medium text-success">
                  Activa
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                        fill=""
                      />
                      <path
                        d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
           
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <img className="w-12 h-12 object-cover rounded" src="data:image/jpeg;base64,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" alt="" />
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black text-sm dark:text-white">
                  Business Package
                </h5>
               
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black text-sm dark:text-white">Jan 13,2023</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="inline-flex rounded-full  bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                  Desactivada
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                        fill=""
                      />
                      <path
                        d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
