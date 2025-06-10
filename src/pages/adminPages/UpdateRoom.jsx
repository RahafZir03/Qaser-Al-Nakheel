/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoomById, getRoomById, getRoomPrice, updateRoomPricing, roomTypeData, serviceData, /*getAllSpecialPrice, updateSpecialPrice, addSpecialPrice*/ } from "../../api/endpoints/room";

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import UpdateMainImage from "../../components/molecule/UpdateMainImage";

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const UpdateRoom = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation("singleUpdateroom");
    const [roomType, setRoomType] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainImageState, setMainImageState] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [secondaryImages2, setImagesecondry] = useState([]);
    const [services, setServices] = useState([]);

   useEffect(() => {
    const fetchServices = async () => {
        try {
            const filters = {
                search: '',
                page: 1,
                limit: 100, // أو أي رقم يغطي كل الخدمات المتاحة
            };

            const response = await serviceData(filters);
            console.log("Services fetched:", response.data.rows);
            setServices(response.data.rows);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    fetchServices();
}, []);

    const formik = useFormik({
        initialValues: {
            room_no: '',
            type: '',
            capacity: '',
            room_length: '',
            num_of_baths: '',
            adult_guests: '',
            child_guests: '',
            category_ar: '',
            category_en: '',
            bed_type_ar: '',
            bed_type_en: '',
            pricing: weekDays.map(day => ({ day, price: 0, id: null })),
            services: []

        },

        enableReinitialize: true,
        onSubmit: async (values) => {
            const pricingPayload = {
                pricing: values.pricing.map(item => ({ day: item.day, price: Number(item.price) }))
            };
            const formData = new FormData();
            await Promise.all([
                updateRoomById(id, values),
                updateRoomPricing(id, pricingPayload)
            ]);
            // إضافة الخدمات إلى formData
            values.services.forEach((serviceId, index) => {
                formData.append(`services[${index}]`, serviceId);
            });

            // يمكنك الآن إرسال formData إذا لزم الأمر (مثال: عبر Axios)
            // await axiosInstance.post('/path/to/api', formData);

            toast.success('Room data updated successfully!');


        },

    });



    useEffect(() => {
        async function fetchData() {
            try {
                const [roomTypeRes, roomRes, pricingRes] = await Promise.all([
                    roomTypeData(),
                    getRoomById(id),
                    getRoomPrice(id)
                ]);

                setRoomType(roomTypeRes.data);
                const room = roomRes?.data?.room;
                const pricingData = pricingRes.data;

                const mainImage = room.RoomImages.find(image => image.main);
                const secondaryImages = room.RoomImages.filter(image => !image.main);

                setMainImageState(mainImage?.id);
                setImageUrl(mainImage);
                setImagesecondry(secondaryImages);

                const serviceIds = room.Services.map(service => service.id);

                const formattedPricing = weekDays.map(day => {
                    const matched = pricingData.find(p => p.day_of_week.toLowerCase() === day);
                    return { day, price: matched ? Number(matched.price) : 0, id: matched?.id || null };
                });

                formik.setValues({
                    ...room,
                    category_ar: room.category?.ar || '',
                    category_en: room.category?.en || '',
                    bed_type_ar: room.bed_type?.ar || '',
                    bed_type_en: room.bed_type?.en || '',
                    pricing: formattedPricing,
                    services: serviceIds
                });
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                toast.error("Room not found");
            }
        }
        fetchData();
    }, [id]);


    const handlePriceChange = (index, value) => {
        const newPricing = [...formik.values.pricing];
        newPricing[index].price = value === '' ? '' : Number(value);
        formik.setFieldValue('pricing', newPricing);
    };
    

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-admin-color shadow rounded-lg border border-sec-color-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">{t("singleUpdateroom.update_room.title")}</h2>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="col-span-full mt-6 text-center">
                    <button type="button" onClick={() => setIsModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                        {t('createroom.updateMainImage') || 'Update Main Image'}
                    </button>
                </div>

                <div>
                    <label className="block mb-1 text-white capitalize">{t('createroom.fields.room_type')}</label>
                    <select name="type" className="p-2 rounded bg-gray-700 w-full text-white border border-sec-color-100" onChange={formik.handleChange} value={formik.values.type}>
                        <option value="">{t('createroom.select_default')}</option>
                        {roomType.length > 0 && roomType.map((type) => (

                            <option key={type.id} value={type.id}>{type.name[i18n.language] || type.name.en}</option>
                        ))}
                    </select>
                </div>
                {Object.keys(formik.values).filter((key) => key !== 'isActive' && key !== 'id' && key !== "bed_type" && key !== 'type' && key !== 'averageRating' && key !== 'ratingCount' && key !== 'RoomPricings' && key !== 'RoomImages' && key !== 'SpecialPricings' && key !== 'isBooked' && key !== 'pricing' && key !== 'RoomType' && key !== 'services' && key != 'Services' && key !== 'category').map((key) => (
                    <Input key={key} name={key} value={formik.values[key]} onChange={formik.handleChange}  />
                ))}
                <div className="col-span-full my-4">
                    <h3 className="text-xl font-semibold text-white my-4">{t('singleUpdateroom.update_room.price')}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                        {formik.values.pricing && formik.values.pricing.map((dayData, index) => (
                            <div key={dayData.day} className="bg-gray-700 p-4 rounded-lg shadow-sm border border-sec-color-100">
                                <label className="block text-sm font-semibold  text-white mb-2 capitalize ">{t(`createroom.days.${dayData.day}`)}</label>
                                <input type="number" value={dayData.price} onChange={(e) => handlePriceChange(index, e.target.value)} className="w-full p-2 border border-sec-color-100 rounded bg-gray-700 text-white" min="1" />
                            </div>
                        ))}
                    </div>

                </div>
                {/* Amenities Section */}
                <div className="p-4 rounded-lg text-white my-4 col-span-full">
                    <h3 className="text-lg font-semibold mb-4">{t('createroom.sections.amenities')}</h3>
                    <div className="grid md:grid-cols-2 gap-4 w-full">
                        {services.map((service) => {
                            const isChecked = formik.values.services.includes(service.id);
                            return (
                                <div key={service.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`service-${service.id}`}
                                        name="services"
                                        className="mr-2 h-5 w-5"
                                        checked={isChecked}
                                        onChange={(e) => {
                                            const updatedServices = e.target.checked
                                                ? [...formik.values.services, service.id]
                                                : formik.values.services.filter((id) => id !== service.id);
                                            formik.setFieldValue("services", updatedServices);
                                        }}
                                    />
                                    <label htmlFor={`service-${service.id}`} className="cursor-pointer">
                                        {service.name[i18n.language] || service.name.en}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-span-full flex gap-4">

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">{t('singleUpdateroom.update_room.update') || 'Update'}</button>

                </div>

            </form>

            <UpdateMainImage isOpen={isModalOpen} secondaryImages={secondaryImages2} onClose={() => setIsModalOpen(false)} imageUrl={imageUrl} roomId={id} mainImageData={mainImageState} />

        </div>
    );
};


const Input = ({ name, value, onChange }) => {
    const { t, i18n } = useTranslation("singleUpdateroom");
    const lang = i18n.language || "ar"; // اللغة الحالية من i18next

    const [myValue, setMyValue] = useState("");
    console.log(t(`createroom.fields.${name}`))
    useEffect(() => {
        if (typeof value === "object" && value !== null) {
            setMyValue(value[lang] || "");
        } else {
            setMyValue(value);
        }
    }, [value, lang]);

    const handleChange = (e) => {
        const newVal = e.target.value;
        setMyValue(newVal);

        if (typeof value === "object" && value !== null) {
            const updatedValue = { ...value, [lang]: newVal };
            onChange && onChange({ target: { name, value: updatedValue } });
        } else {
            onChange && onChange({ target: { name, value: newVal } });
        }
    };

    return (
        <div>
            <label className="block mb-1 text-white capitalize">{t(`createroom.fields.${name}`)}</label>
            <input
                type="text"
                name={name}
                value={myValue}
                onChange={handleChange}
                className="w-full p-2  rounded bg-gray-700  text-white border border-sec-color-100"
            />

        </div>
    );
};

export default UpdateRoom;
