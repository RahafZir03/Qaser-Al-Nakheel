/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { createPoolReservation } from "../../api/endpoints/pool";
import { toast } from "react-toastify";
import { MdBookmarkAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function PoolBookingForm({ pool }) {
  const { t } = useTranslation("restaurant");
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    pool_id: pool,
    start_time: "",
    end_time: "",
    num_guests: 1,
    notes: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    values.pool_id = pool;
    const response = await createPoolReservation(values);
    toast.success(response.data.message);
    resetForm();
    setIsOpen(false);
  };

  return (
    <div className="">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center group mx-4 font-semibold bg-sec-color-100 py-3 text-white mb-4 px-4 rounded hover:bg-sec-color-200 transition-all"
      >
        {isOpen
          ? t("pool.poolsSection.isOpenRes.close")
          : t("pool.poolsSection.isOpenRes.open")}
        <MdBookmarkAdd className="text-2xl group-hover:text-green-600 transition-all" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="form-slide"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden px-6 absolute top-14 right-0 w-full max-w-[540px] z-20"
          >
            <div className="bg-zinc-800 p-6 rounded-xl relative">
              <h4 className="text-xl font-semibold mb-4 text-white">
                نموذج حجز مسبح
              </h4>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {() => (
                  <Form className="grid gap-4 text-sm">
                    <div className="flex flex-wrap gap-4">
                      <div className="w-full sm:w-[48%]">
                        <label className="text-white/80 block mb-1">
                          وقت البدء
                        </label>
                        <Field
                          name="start_time"
                          type="datetime-local"
                          className="w-full p-2 rounded bg-white/20 text-white"
                        />
                      </div>

                      <div className="w-full sm:w-[48%]">
                        <label className="text-white/80 block mb-1">
                          وقت الانتهاء
                        </label>
                        <Field
                          name="end_time"
                          type="datetime-local"
                          className="w-full p-2 rounded bg-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white/80 block mb-1">
                        عدد الضيوف
                      </label>
                      <Field
                        name="num_guests"
                        type="number"
                        min="1"
                        className="w-full p-2 rounded bg-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 block mb-1">
                        ملاحظات
                      </label>
                      <Field
                        name="notes"
                        as="textarea"
                        rows="3"
                        className="w-full p-2 rounded bg-white/20 text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-sec-color-100 text-white py-2 rounded hover:bg-sec-color-100/80 transition"
                    >
                      إرسال الحجز
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
