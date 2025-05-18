/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateHallImage, addHallImage, deleteHallImage } from "../../api/endpoints/halls";
import { useTranslation } from 'react-i18next';
import { FaTrash } from "react-icons/fa";

import noImage from "../../assets/images/No_Image_Available.jpg"
const HallImage = ({ isOpen, onClose, mainImageData, hallId, imageUrl, secondaryImages }) => {
  const [selectedMainFile, setSelectedMainFile] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [mainLoading, setMainLoading] = useState(false);
  const [selectedSecondaryFile, setSelectedSecondaryFile] = useState(null);
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const { t } = useTranslation("updatemainimage");

  useEffect(() => {
    if (imageUrl) {
      setMainPreview(imageUrl.image_name_url || imageUrl); // تأكد من الشكل

    }
  }, [imageUrl]);

  useEffect(() => {
    if (selectedMainFile instanceof File) {

      const objectUrl = URL.createObjectURL(selectedMainFile);
      setMainPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedMainFile]);

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("الرجاء اختيار صورة بصيغة JPG أو PNG فقط.");
      return;
    }

    setSelectedMainFile(file);

    const previewUrl = URL.createObjectURL(file);
    setMainPreview(previewUrl);

  };

  const handleSecondaryFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("الرجاء اختيار صورة بصيغة JPG أو PNG فقط.");
      return;
    }

    setSelectedSecondaryFile(file);
  };

  const handleMainImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMainFile) return;

    const formData = new FormData();
    formData.append("image", selectedMainFile);

    setMainLoading(true);
    try {
      const response = await updateHallImage(mainImageData, formData);

      toast.success(response.data.message || "تم تحديث الصورة بنجاح.");
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("فشل تحديث الصورة:", error);
      toast.error(error?.response?.data?.message || "فشل في تحديث الصورة.");
    } finally {
      setMainLoading(false);
    }
  };

  const handleAddSecondaryImage = async (e) => {
    e.preventDefault();
    if (!selectedSecondaryFile) return;

    const formData = new FormData();
    formData.append("image", selectedSecondaryFile);

    setSecondaryLoading(true);
    try {
      const response = await addHallImage(hallId, formData);
      toast.success(response.data.message || "تم إضافة الصورة بنجاح.");
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("حدث خطأ:", error);
      toast.error(error?.response?.data?.message || "فشل في إضافة الصور.");
    } finally {
      setSecondaryLoading(false);
    }
  };

  const handleDeleteSecondaryImage = async (image) => {
    try {
      await deleteHallImage(image);

      toast.success("تم حذف الصورة بنجاح.");
    } catch (error) {
      console.error("خطأ في حذف الصورة:", error);
      toast.error(error?.response?.data?.message || "فشل في حذف الصورة.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-admin-color bg-opacity-50 z-50 text-black ">
      <div className="modal-content bg-admin-color p-6 rounded shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto ">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-bold text-white">{t("updateMainImage")}</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-xl">X</button>

        </div>

        {/* تحديث الصورة الرئيسية */}
        <form onSubmit={handleMainImageSubmit}>

          <div className="mb-4">
            <label className="block font-medium text-white">{t("choosefile")}</label>

            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleMainFileChange}
              className="w-full border p-2 rounded bg-white"
              required
            />
          </div>
          {mainPreview && (
            <div className="mb-4">
              <p className="text-white mb-2">{t("preview")}:</p>
              <img src={mainPreview} alt="Preview" className="max-h-48 rounded" />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={mainLoading}
          >
            {mainLoading ? t("updating") : t("update")}
          </button>
        </form>

        {/* الصور الثانوية */}
        <div className="mt-6 border-t p-4">
          <h3 className="text-white mb-4 text-xl font-semibold">{t("secondaryImages")}</h3>

          <div className="flex flex-wrap gap-4">
            {secondaryImages && secondaryImages.length > 0 ? (
              secondaryImages.map((image, index) => (
                <div key={index} className="relative">

                  <img src={image.image_name_url} alt="Secondary" className="w-24 h-24 object-cover rounded" />
                  <button
                    onClick={() => handleDeleteSecondaryImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500/60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"

                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))
            ) : (
              <img src={noImage} alt="noImage" className="rounded-md w-24 h-24" />

            )}
          </div>

          {/* إضافة صورة ثانوية */}
          <div className="mt-4">
            <h3 className="text-white">{t("addSecondaryImage")}</h3>
            <form onSubmit={handleAddSecondaryImage}>
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleSecondaryFileChange}
                className="w-full border p-2 rounded bg-white"
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                disabled={secondaryLoading || !selectedSecondaryFile}
              >
                {secondaryLoading ? t("addingImage") : t("addImage")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallImage;
