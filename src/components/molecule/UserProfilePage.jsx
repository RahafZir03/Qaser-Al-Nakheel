/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaBirthdayCake, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getCustomerById } from "../../api/endpoints/customers";
import { Link } from "react-router-dom";
import profileImage from "../../assets/images/profile.jpg"
export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCustomerById(id);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);


  if (!user)
    return <div className="text-white p-10">Loading data  ...</div>;

  const Section = ({ title, children }) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-sec-color-100 mb-4 border-b border-sec-color-100 pb-1">
        {title}
      </h2>
      {children}
    </div>
  );

  const Table = ({ data, columns }) => (
    <div className="overflow-x-auto rounded-lg border border-sec-color-100">
      <table className="w-full text-left text-white">
        <thead className="bg-sec-color-100 text-black">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-3 capitalize">
                {col.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3">
                لا توجد بيانات
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="border-t border-sec-color-100">
                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-3">
                    {typeof item[col] === "string" && item[col].includes("T")
                      ? new Date(item[col]).toLocaleString()
                      : item[col]?.toString() ||
                      (col === "type" && !item.type
                        ? item.pool_id
                          ? "pool"
                          : item.hall_id
                            ? "hall"
                            : item.rest_id
                              ? "rest"
                              : "room"
                        : "hello") ||
                      "-"}
                    { }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-admin-color p-6 text-white">
      {/* بيانات المستخدم */}

      <div className="flex justify-between items-center bg-sec-color-100 p-6 rounded-xl shadow mb-10">
        <div className="flex items-center">
          <img
            src={user.profile_picture ? user.profile_picture : profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
          <div className="ml-6 space-y-1 text-white">
            <h1 className="text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="flex items-center gap-2">
              <MdAlternateEmail /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> {user.CustomerMobiles[0]?.mobile_no || "غير متوفر"}
            </p>
            <p className="flex items-center gap-2">
              <FaLocationDot />
              {user.city || "غير محددة"}
            </p>
            <p className="flex items-center gap-2">
              <FaBirthdayCake />
              {new Date(user.birthdate).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* زر عرض الفواتير */}
        <Link
          to={`/admin/payment/${id}`} // تأكد من أن هذا المسار يتماشى مع إعدادات Route لديك
          className="bg-white  text-sec-color-100 border border-sec-color-100 px-6 py-4 rounded-md shadow hover:bg-admin-color hover:text-sec-color-100 transition-all duration-300">
           View Details
        </Link>


      </div>

      {/* الجداول */}
      <Section title=" Communication messages">
        <Table
          data={user.Contacts}
          columns={["subject", "message", "status", "date"]}
        />
      </Section>

      <Section title="User reviews ">
        <Table
          data={user.Ratings}
          columns={["rating", "comment", "createdAt", "type"]}
        />
      </Section>

      <Section title=" Room Bookings">
        <Table
          data={user.Bookings}
          columns={[
            "check_in_date",
            "check_out_date",
            "total_price",
            "status",
            "payed",
          ]}
        />
      </Section>

      <Section title=" Pool Bookings">
        <Table
          data={user.CustomerPools}
          columns={["start_time", "end_time", "num_guests", "status", "payed"]}
        />
      </Section>

      <Section title="Halls Bookings">
        <Table
          data={user.HallReservations}
          columns={[
            "start_time",
            "end_time",
            "details",
            "total_price",
            "status",
            "payed",
          ]}
        />
      </Section>

      <Section title="Restaurant Bookings ">
        <Table
          data={user.CustomerRestaurants}
          columns={["reservation_date", "number_of_guests", "status", "payed"]}
        />
      </Section>
    </div>
  );
}
