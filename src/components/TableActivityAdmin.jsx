
import { useDataStore, ListOfActivities } from '../store/services.js';
import { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '../servidor/Client.js'
import { format } from 'date-fns';
import { FaRegEyeSlash, FaRegSun } from "react-icons/fa";
import { Button, Modal } from 'flowbite-react';
import { DateTime } from 'luxon';

const TableClientsAdmin = () => {
  const { data, fetchData } = useDataStore();
  const { searchSupabase, searchResults } = ListOfActivities();
  const [idCompany, setIdCompany] = useState('')
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState('');
  const [message, setmessage] = useState('');
  const [buttondisable, setbuttondisable] = useState(false);
  const [activity, setactivity] = useState({ name: '', subtitle: '', description: '', image_url: '', location: '', date: '', time: '' });

  useEffect(() => {
    fetchData().then(() => {
      const companyId = data.session.user.user_metadata.id_company;
      setIdCompany(companyId);
    });
  }, []);

  useEffect(() => {
    if (idCompany) {
      searchSupabase(idCompany).then(() => {
        setUsers(searchResults);
      });
    }
  }, [idCompany, searchSupabase, searchResults]);

  const handlerclients = async (e) => {
    e.preventDefault();
    const { data: newData } = await supabase
      .from('activity')
      .select('*')
      .eq('id_company', idCompany)
      .order('created_at', { ascending: false });
    setUsers(newData);
  };

  const handlerDeleteClient = async (id) => {
    const { error } = await supabase
      .from('activity')
      .delete()
      .eq('id', id)
  }

  const handlerStatusClient = async (id, status) => {
    console.log(id)
    console.log(status)
    if (status == 'Habilitado') {
      const { error } = await supabase
        .from('activity')
        .update({ status: false })
        .eq('id', id)
    } else {
      const { error } = await supabase
        .from('activity')
        .update({ status: true })
        .eq('id', id)
    }


  }

  const handlerInsertImage = async (e) => {

    // console.log(e.target.files[0])
    const file = e.target.files[0]
    const randomstring = Math.random().toString(36).slice(-8);

    const { data } = await supabase
      .storage
      .from('image-activity')
      .upload(`public/${randomstring}`, file)
    console.log(data)

    if (data) {

      const InserData = async () => {

        const imageurl = await supabase
          .storage
          .from('image-activity')
          .getPublicUrl('public/' + randomstring)
        setactivity({ ...activity, image_url: imageurl.data.publicUrl })

        if (imageurl) {
          setbuttondisable(false)
        }
      }
      InserData()


    }
  }

  const handlerUpdateActivity = async (e, id) => {
    e.preventDefault();
    try {



      // Al menos un valor es diferente, realiza la actualización
      const { data, error } = await supabase
        .from('activity')
        .update(activity)
        .eq('id', id)
        .select();

      if (error) {
        console.log(error);
      }
      setOpenModal(undefined);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <button className='my-3' onClick={e => handlerclients(e)}>Recargar</button>
        <table className="w-full table-auto">
          <thead>

            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[140px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">
                Imagen
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">
                Nombre
              </th>
             
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Estado
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Fecha
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Hora
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Limite
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Acciones
              </th>

            </tr>
          </thead>

          <tbody>
            {users.map(e => <>
              <tr key={e.index}>

                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <img className="w-12 h-12 object-cover rounded-full" src={e.image_url} alt="" />
                </td>

                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-sm text-black dark:text-white">
                    {e.name}
                  </h5>
                </td>


                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {e.status ? <p className="inline-flex text-sm rounded-full bg-success bg-opacity-10 py-1 px-3 font-medium text-success">Habilitado</p> : <p className="inline-flex text-sm rounded-full bg-danger bg-opacity-10 py-1 px-3 font-medium text-danger">Desactivado</p>}
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black text-sm dark:text-white">{DateTime.fromISO(e.date, { zone: 'utc' }).toFormat('yyyy-MM-dd')}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black text-sm dark:text-white">{e.time}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black text-sm dark:text-white">{e.registrations} / {e.limit}</p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">

                    <button id={e.id} status={e.status ? 'Habilitado' : 'Desabilitado'} onClick={e => handlerStatusClient(e.target.getAttribute('id'), e.target.getAttribute('status'))} className="hover:text-primary  hover:scale-125 transition-all ease-in">

                      {e.status ? <svg id={e.id} status={e.status ? 'Habilitado' : 'Desabilitado'} onClick={e => handlerStatusClient(e.target.getAttribute('id'), e.target.getAttribute('status'))}
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
                      </svg> :
                        <FaRegEyeSlash id={e.id} status={e.status ? 'Habilitado' : 'Desabilitado'} onClick={e => handlerStatusClient(e.target.getAttribute('status'), e.target.getAttribute('status'))} />
                      }


                    </button>
                    <button id={e.id}
                      onClick={element => handlerDeleteClient(element.target.id, element.target.getAttribute('id'))}
                      className="hover:text-primary  p-1 z-3 hover:scale-125 transition-all ease-in"  >
                      <svg id={e.id}
                        onClick={element => handlerDeleteClient(element.target.id, element.target.getAttribute('id'))}
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

                    <button id={e.name} onClick={() => setOpenModal(e.id) + setactivity({ ...activity, date: e.date, name: e.name, subtitle: e.subtitle, description: e.description, image_url: e.image_url, location: e.location, time: e.time })
                    } >
                      <FaRegSun className='hover:text-primary  hover:scale-125 transition-all ease-in' />
                    </button>
                  </div>
                </td>

                <Modal className='mt-40 lg:mt-0 ' show={openModal === e.id} onClose={() => setOpenModal(undefined)}>
                  <Modal.Header >{e.name}</Modal.Header>
                  <Modal.Body className='max-h-125 '>
                    <div className="grid grid-cols-5  gap-8">
                      <div className="col-span-5 ">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                              Imagen
                            </h3>
                          </div>
                          <div className="p-7">

                            <h2></h2>

                            <div
                              id="FileUpload"
                              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                            >
                              <input
                                onChange={e => handlerInsertImage(e)}
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                              />
                              <div className="flex flex-col items-center justify-center space-y-3">
                                <span className="flex items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                  <img src={e.image_url} className='w-50 h-50 object-cover rounded-full' alt="" />
                                </span>
                                <p>
                                  <span className="text-primary">Click to upload</span> or
                                  drag and drop
                                </p>
                                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                <p>(max, 800 X 800px)</p>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                      <div className="col-span-5 ">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">

                          </div>
                          <div className="p-7">

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="name"
                                >
                                  Nombre
                                </label>
                                <div >

                                  <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={e => setactivity({ ...activity, name: e.target.value })}
                                    placeholder="Example activity"
                                    defaultValue={e.name}
                                  />
                                </div>
                              </div>

                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="subtitle"
                                >
                                  Subtitulo
                                </label>
                                <input
                                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="text"
                                  name="subtitle"
                                  id="subtitle"
                                  placeholder="Example subtitulo"
                                  defaultValue={e.subtitle}

                                  onChange={e => setactivity({ ...activity, subtitle: e.target.value })}

                                />
                              </div>
                            </div>
                            <div className="w-full sm:w-2/2 mb-5.5">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="subtitle"
                              >
                                Ubicacion
                              </label>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="subtitle"
                                id="subtitle"
                                defaultValue={e.location}
                                onChange={e => setactivity({ ...activity, location: e.target.value })}

                              />
                            </div>
                            <div className="mb-5.5">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="Username"
                              >
                                Descripcion
                              </label>
                              <div className="relative">

                                <textarea
                                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  name="bio"
                                  id="bio"
                                  rows={6}
                                  defaultValue={e.description}
                                  onChange={e => setactivity({ ...activity, description: e.target.value })}


                                ></textarea>
                              </div>
                            </div>
                            <div className="mb-5.5">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="Username"
                              >
                                Fecha
                              </label>
                              <div className="relative">

                                <input
                                  type="date"
                                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Select date"
                                  onChange={e => setactivity({ ...activity, date: e.target.value })}
                                  defaultValue={e.date}

                                />
                              </div>
                            </div>

                            <div className="mb-5.5">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="Username"
                              >
                                Hora
                              </label>

                              <div className="relative">
                                <input
                                  type="time"
                                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="ejemplo: 4:00 PM"
                                  onChange={e => setactivity({ ...activity, time: e.target.value })}
                                  defaultValue={e.time}


                                />

                              </div>
                            </div>
                            <div className="mb-5.5">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="Username"
                              >
                                Limite de participantes
                              </label>

                              <div className="relative">
                                <input
                                  type="number"
                                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="ejemplo: 5"
                                  onChange={e => setactivity({ ...activity, limit: e.target.value })}
                                  defaultValue={e.limit}


                                />

                              </div>
                            </div>



                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className='d-flex justify-center'>
                    <span id={e.id} onClick={e => handlerUpdateActivity(e, e.target.id, e.target.getAttribute('id'))} className='bg-transparent hover:bg-primary dark:hover:bg-primary hover:cursor-pointer p-3 text-black hover:text-white rounded-xl dark:text-white border border-primary transition-all ease-in'>Editar</span>
                  </Modal.Footer>
                </Modal>

              </tr>

            </>
            )}
          </tbody>

        </table>
      </div>
    </div>

  );
};

export default TableClientsAdmin;
