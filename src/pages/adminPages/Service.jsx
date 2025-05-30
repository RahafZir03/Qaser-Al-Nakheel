import { useEffect, useState } from 'react';
import { deleteService, serviceData } from '../../api/endpoints/room';
import { toast } from 'react-toastify';
import AddServiceModal from '../../components/molecule/AddService';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PaginationRounded from "../../components/molecule/PaginationRounded";

export default function Service() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const lang = useSelector((state) => state.language.lang);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const openModal = (id) => {
    setSelectedService(id || null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchServiceData();
  }, [search, page]);

  const fetchServiceData = async () => {
    try {
      const response = await serviceData({ search, page, limit: 10 });
      if (response.data?.rows && Array.isArray(response.data.rows)) {
        setServices(response.data.rows);
        setTotalPages(Math.ceil(response.data.count / 10));
      } else {
        setServices([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
      setTotalPages(1);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await deleteService(id);
      setServices((prevServices) => prevServices.filter(service => service.id !== id));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  const handleServiceAddedOrUpdated = (newService) => {
    setIsModalOpen(false);
    setServices((prevServices) => {
      const exists = prevServices.find((s) => s.id === newService.id);
      if (exists) {
        return prevServices.map((s) => (s.id === newService.id ? newService : s));
      } else {
        return [newService, ...prevServices];  
      }
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setSearch("");
      setPage(1);
      setIsSearchActive(false);
      return;
    }
    setSearch(inputValue.trim());
    setPage(1);
    setIsSearchActive(true);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setSearch("");
    setPage(1);
    setIsSearchActive(false);
  };

  return (
    <div className="p-6 bg-admin-color text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">{t("headerAllService")}</h2>
      <div className="bg-admin-color p-4 rounded-lg ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <button onClick={() => openModal(null)} className="bg-green-500 text-white px-4 py-2 rounded">
            {t("headerServices")}
          </button>

          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">{t('serviceTable.search')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("serviceTable.search_placeholder")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </button>
            {isSearchActive && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="p-2.5 ms-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                {t('all_rooms.clear_search')}
              </button>
            )}
          </form>
        </div>

        <div className="overflow-x-auto bg-white/5 rounded-xl shadow">
          <table className="w-full text-left text-sm text-gray-400 ">
            <thead className="bg-admin-color  text-white">
              <tr className={`text-sm bg-white/10 ${isArabic ? "text-right" : "text-left"}`}>
                <th className='p-3'></th>
                <th className="p-3">{t("serviceTable.title")}</th>
                <th className="p-3">{t("serviceTable.description")}</th> 
                <th className="p-3">{t("serviceTable.action")}</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((s, index) => (
                  <tr key={index} className="border-b border-gray-600  ">
                    <td className='p-2'>
                      <div className="bg-white rounded-md flex w-fit p-2">
                        <img src={s.image} className='size-8 ' alt="service" />
                      </div>
                    </td>
                    <td className="p-3 text-white">{lang === "ar" ? s.name.ar : s.name.en}</td>
                    <td className="p-3  text-white">{lang === "ar" ? s.description.ar : s.description.en}</td>
                    <td className="p-3 flex gap-2">
                      <button className="text-red-500 text-xl" onClick={() => openModal(s.id)}>✏️</button>
                      <button className="text-red-500 text-xl" onClick={() => handleDeleteService(s.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-400">
                    {isSearchActive ? `${t('all_rooms.no_results_for')} "${search}"` : "No services available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          {totalPages > 1 && (
                   <PaginationRounded
                     count={totalPages}
                     page={page}
                     onChange={(e, value) => {
                       setPage(value);
                     }}
                     theme="dark"
                   />
                 )}
        </div>
      </div>
      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceId={selectedService}
        onServiceAdded={handleServiceAddedOrUpdated}
      />
    </div>
  );
}
