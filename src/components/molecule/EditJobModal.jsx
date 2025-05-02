/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { changeEmployeeJob, getAllworkPlaces } from "../../api/endpoints/employee";

const ROLES = ["admin", "employee", "reception"];

export default function EditJobModal({ isOpen, onClose, employee, onSave }) {
  const { t } = useTranslation("EditJobModal");

  const [jopDescription, setJopDescription] = useState("");
  const [role, setRole] = useState("employee");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (employee) {
      setRole(employee.role);
      setJopDescription(employee.jop_description || "");
      setSelectedPlace(null);
    }
  }, [employee]);

  useEffect(() => {
    if (isOpen) {
      getAllworkPlaces()
        .then((res) => {
          const { halls, pools, restaurants } = res.data.data;
          const combined = [
            ...halls.map((h) => ({ ...h, type: "hall" })),
            ...restaurants.map((r) => ({ ...r, type: "rest" })),
            ...pools.map((p) => ({ ...p, type: "pool" })),
          ];
          setPlaces(combined);
        })
        .catch((err) => {
          console.error(err);
          toast.error(t("workplaceLoadError"));
        });
    }
  }, [isOpen, t]);

  const handleSubmit = async () => {
    const payload = {
      role,
      jop_description: role !== "admin" ? jopDescription : "",
      hall_id: null,
      rest_id: null,
      pool_id: null,
    };

    if (role !== "admin") {
      if (!jopDescription) return alert(t("enterJobTitle"));
      if (!selectedPlace) return alert(t("selectWorkplace"));

      payload[`${selectedPlace.type}_id`] = selectedPlace.id;
    }

    try {
      const res = await changeEmployeeJob(employee.id, payload);
      toast.success(res.data.message);
      onSave(res.data.employee);
      onClose();
    } catch (err) {
      console.error(err);
      alert(t("updateError"));
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-admin-color rounded-xl shadow-lg p-6 w-full max-w-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t("editJobTitle")}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-lg">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">{t("roleLabel")}</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{t(`roles.${r}`)}</option>
              ))}
            </select>
          </div>

          {role !== "admin" && (
            <>
              <div>
                <label className="block mb-1 font-medium">{t("jobTitleLabel")}</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={jopDescription}
                  onChange={(e) => setJopDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">{t("workplaceLabel")}</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedPlace?.id || ""}
                  onChange={(e) => {
                    const place = places.find(p => p.id === e.target.value);
                    setSelectedPlace(place);
                  }}
                >
                  <option value="">{t("choosePlace")}</option>
                  {places.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name.ar} ({t(`types.${place.type}`)})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">{t("cancel")}</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {t("saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}
