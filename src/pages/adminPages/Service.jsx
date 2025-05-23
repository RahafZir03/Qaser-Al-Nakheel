/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { deleteService, serviceData } from '../../api/endpoints/room';
import { toast } from 'react-toastify';
import AddServiceModal from '../../components/molecule/AddService';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


export default function Service() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const lang = useSelector((state) => state.language.lang);
  const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";


  const openModal = (id) => {
    setSelectedService(id || null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {

    const response = await serviceData();
    if (response.data.rows) {
      setServices(response.data.rows);
    } else {
      setServices([]);
    }

  };

  const handleDeleteService = async (id) => {
    const response = await deleteService(id);
    setServices((prevServices) => prevServices.filter(service => service.id !== id));
    toast.success(response.data.message);
  };

  const handleServiceAddedOrUpdated = (newService) => {
    setIsModalOpen(false);
    setServices((prevServices) => {
      const exists = prevServices.find((s) => s.id === newService.id);
      if (exists) {
        return prevServices.map((s) => (s.id === newService.id ? newService : s));
      } else {
        return [...prevServices, newService];
      }
    });
  };

  return (
    <div className="p-6 bg-admin-color text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">{t("headerAllService")}</h2>
      <div className="bg-admin-color p-4 rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => openModal(null)} className="bg-green-500 text-white px-4 py-2 rounded">
            {t("headerServices")}
          </button>
        </div>
      <div  className="overflow-x-auto bg-white/5 rounded-xl shadow">
        <table className="w-full text-left text-sm text-gray-400 ">
          <thead className="bg-admin-color  text-white">
            <tr className={`text-sm bg-white/10 ${
                isArabic ? "text-right" : "text-left"
              }`}>
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
                    <img src={s.image} className='size-8 ' />
                    </div>
                  </td>
                  <td className="p-3">{lang === "ar" ? s.name.ar : s.name.en}</td>
                  <td className="p-3">{lang === "ar" ? s.description.ar : s.description.en}</td>
                  <td className="p-3 flex gap-2">
                    <button className="text-red-500 text-xl" onClick={() => openModal(s.id)}>✏️</button>
                    <button className="text-red-500 text-xl" onClick={() => handleDeleteService(s.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-400">No services available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
      <AddServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceId={selectedService} onServiceAdded={handleServiceAddedOrUpdated} />
    </div>
  );
}
