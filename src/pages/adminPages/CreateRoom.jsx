/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addRoom, roomTypeData, serviceData } from "../../api/endpoints/room";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const AddRoom = () => {
  const { t, i18n } = useTranslation();
  const { roomId } = useParams();
  const [roomType, setRoomType] = useState([]);
  const [services, setServices] = useState([]);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);

  useEffect(() => {
    async function getRoomTypeData() {
      try {
        const response = await roomTypeData();
        setRoomType(response.data);
      } catch (error) {
        console.error(t('add_room.errors.load_types'), error);
      }
    }

    getRoomTypeData();
  }, [t]);

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    const response = await serviceData({ search: "", page: 1, limit: 100 });
    if (response.data.rows) {
      setServices(response.data.rows);
    } else {
      setServices([]);
    }
  };

  const initialValues = {
    mainImage: null,
    additionalImages: [],
    room_no: "",
    type: "",
    //capacity: '',
    room_length: '',
    num_of_baths: '',
    adult_guests: '',
    child_guests: '',
    category_ar: '',
    category_en: '',
    bed_type_ar: '',
    bed_type_en: '',
    pricing: [
      { day: "saturday", price: "" },
      { day: "sunday", price: "" },
      { day: "monday", price: "" },
      { day: "tuesday", price: "" },
      { day: "wednesday", price: "" },
      { day: "thursday", price: "" },
      { day: "friday", price: "" },

    ],
    services: []
  };

  const validationSchema = Yup.object({
    room_no: Yup.string().required(t('createroom.validation.required')),
    type: Yup.string().required(t('createroom.validation.required')),
    // capacity: Yup.number()
    //   .required(t('createroom.validation.required'))
    //   .positive(t('createroom.validation.positive')),
    room_length: Yup.number()
      .required(t('createroom.validation.required'))
      .positive(t('createroom.validation.positive')),
    num_of_baths: Yup.number()
      .required(t('createroom.validation.required'))
      .positive(t('createroom.validation.positive')),
    mainImage: Yup.mixed().required(t('createroom.validation.required')),
    pricing: Yup.array().of(
      Yup.object({
        day: Yup.string().required(),
        price: Yup.number().required().positive()
      })
    )
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const capacity = parseInt(values.adult_guests) + parseInt(values.child_guests);
      const formData = new FormData();
      formData.append('room_no', values.room_no);
      formData.append('type', values.type);
      formData.append('capacity', capacity);
      formData.append('room_length', values.room_length);
      formData.append('num_of_baths', values.num_of_baths);
      formData.append('adult_guests', values.adult_guests);
      formData.append('child_guests', values.child_guests);
      formData.append('category_ar', values.category_ar);
      formData.append('category_en', values.category_en);
      formData.append('bed_type_ar', values.bed_type_ar);
      formData.append('bed_type_en', values.bed_type_en);

      values.pricing.forEach((item, index) => {
        formData.append(`pricing[${index}]`, JSON.stringify(item));
      });

      values.services.forEach((serviceId, index) => {
        formData.append(`services[${index}]`, serviceId);
      });

      formData.append('mainImage', values.mainImage);
      values.additionalImages.forEach((img) => formData.append('additionalImages', img));

      try {
        const res = await addRoom(formData);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(t('createroom.errors.create_failed'));
      }
    }
  });

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('mainImage', file);
      const reader = new FileReader();
      reader.onload = (event) => setFeaturedImagePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const currentFiles = formik.values.additionalImages || [];

    if (currentFiles.length + newFiles.length > 10) {
      toast.warning("يمكن رفع 10 صور كحد أقصى");
      return;
    }

    formik.setFieldValue("additionalImages", [...currentFiles, ...newFiles]);
  };

  const handlePriceChange = (index, value) => {
    const updatedPricing = [...formik.values.pricing];
    updatedPricing[index].price = value;
    formik.setFieldValue('pricing', updatedPricing);
  };

  return (
    <div className="bg-admin-color p-4 sm:p-6 text-white max-w-7xl mx-auto rounded-lg border border-sec-color-100">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        {roomId ? t('createroom.edit_title') : t('createroom.title')}
      </h2>

      {/* Language Selector */}

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Column - Form Fields */}
          <div className="flex-1 space-y-6">

            {/* Basic Information Section */}
            <div className="bg-admin-color p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('createroom.sections.basic_info')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Room Number */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.room_number')}
                  </label>
                  <input
                    type="text"
                    name="room_no"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.room_no}
                  />
                  {formik.touched.room_no && formik.errors.room_no && (
                    <div className="text-red-400 text-sm">{formik.errors.room_no}</div>
                  )}
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.room_type')}
                  </label>
                  <select
                    name="type"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  >
                    <option value="">{t('createroom.select_default')}</option>
                    {roomType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name[i18n.language] || type.name.en}
                      </option>
                    ))}
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <div className="text-red-400 text-sm">{formik.errors.type}</div>
                  )}
                </div>

                {/* Capacity
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.capacity')}
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    className="p-2 rounded bg-gray-700 w-full"
                    onChange={formik.handleChange}
                    value={formik.values.capacity}
                  />
                  {formik.touched.capacity && formik.errors.capacity && (
                    <div className="text-red-400 text-sm">{formik.errors.capacity}</div>
                  )}
                </div> */}

                {/* Room Length */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.room_length')}
                  </label>
                  <input
                    type="number"
                    name="room_length"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.room_length}
                  />
                  {formik.touched.room_length && formik.errors.room_length && (
                    <div className="text-red-400 text-sm">{formik.errors.room_length}</div>
                  )}
                </div>

                {/* Number of Baths */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.num_baths')}
                  </label>
                  <input
                    type="number"
                    name="num_of_baths"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.num_of_baths}
                  />
                  {formik.touched.num_of_baths && formik.errors.num_of_baths && (
                    <div className="text-red-400 text-sm">{formik.errors.num_of_baths}</div>
                  )}
                </div>

                {/* Adult Guests */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.adult_guests')}
                  </label>
                  <input
                    type="text"
                    name="adult_guests"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.adult_guests}
                  />
                </div>

                {/* Child Guests */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.child_guests')}
                  </label>
                  <input
                    type="text"
                    name="child_guests"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.child_guests}
                  />
                </div>
              </div>
            </div>

            {/* Category Information Section */}
            <div className="bg-admin-color p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('createroom.sections.category_info')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category (Arabic) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.category_ar')}
                  </label>
                  <input
                    type="text"
                    name="category_ar"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.category_ar}
                  />
                </div>

                {/* Category (English) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.category_en')}
                  </label>
                  <input
                    type="text"
                    name="category_en"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.category_en}
                  />
                </div>

                {/* Bed Type (Arabic) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.bed_type_ar')}
                  </label>
                  <input
                    type="text"
                    name="bed_type_ar"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.bed_type_ar}
                  />
                </div>

                {/* Bed Type (English) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('createroom.fields.bed_type_en')}
                  </label>
                  <input
                    type="text"
                    name="bed_type_en"
                    className="p-2 rounded bg-gray-700 w-full border border-sec-color-100"
                    onChange={formik.handleChange}
                    value={formik.values.bed_type_en}
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Pricing Section */}
            <div className="bg-admin-color p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('createroom.sections.pricing')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formik.values.pricing.map((item, index) => (
                  <div key={item.day} className="flex items-center justify-between bg-gray-700 p-3 rounded border border-sec-color-100">
                    <span className="font-medium">
                      {t(`createroom.days.${item.day}`)}:
                    </span>
                    <div className="flex items-center">
                      <span className="mr-2">ILS</span>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handlePriceChange(index, e.target.value)}
                        className="p-1 rounded bg-gray-600 w-20 text-right border border-sec-color-100"
                        min="1"
                        step="1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-admin-color p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {t('createroom.sections.amenities')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => {
                  const isChecked = formik.values.services.includes(service.id);
                  return (
                    <div key={service.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`service-${service.id}`}
                        name="services"
                        className="h-5 w-5"
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


          </div>

          {/* Right Column - Images */}
          <div className="w-full lg:w-96 space-y-6">
            {/* Featured Image Upload */}
            <div className="bg-admin-color p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('createroom.sections.featured_image')}</h3>
              <div className="border-2 border-dashed border-sec-color-100 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-700 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden "
                  id="featuredImage"
                  onChange={handleMainImageChange}
                />
                <label htmlFor="featuredImage" className="cursor-pointer block">
                  {featuredImagePreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={featuredImagePreview}
                        alt="Featured preview"
                        className="max-h-48 mb-2 rounded object-cover"
                      />
                      <p className="text-sm text-gray-300">
                        {formik.values.mainImage?.name || t('createroom.sections.featured_image')}
                      </p>
                      <p className="text-xs text-blue-400 mt-1">
                        {t('createroom.actions.change_image')}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-300">{t('createroom.actions.upload_featured')}</p>
                      <p className="text-xs text-gray-400 mt-1">{t('createroom.labels.recommended_size')}</p>
                    </div>
                  )}
                </label>
              </div>
              {formik.touched.mainImage && formik.errors.mainImage && (
                <div className="text-red-400 text-sm mt-2">{formik.errors.mainImage}</div>
              )}
            </div>

            {/* Additional Images Upload */}
            <div className="bg-admin-color p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('createroom.sections.additional_images')}</h3>
              <div className="border-2 border-dashed border-sec-color-100 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-700 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="sliderImages"
                  onChange={handleAdditionalImagesChange}
                />
                <label htmlFor="sliderImages" className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-300">{t('createroom.actions.upload_additional')}</p>
                    {formik.values.additionalImages.length > 0 ? (
                      <p className="text-sm text-green-400 mt-2">
                        {formik.values.additionalImages.length} {t('createroom.labels.images_selected')}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">{t('createroom.labels.max_images')}</p>
                    )}
                  </div>
                </label>
                {formik.values.additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {formik.values.additionalImages.map((file, index) => {
                      const imageUrl = URL.createObjectURL(file);
                      return (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`preview-${index}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('createroom.actions.processing')}
                </span>
              ) : (
                t('createroom.actions.publish')
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;