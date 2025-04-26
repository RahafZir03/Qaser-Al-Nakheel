/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

const getMainImage = (images) =>
  images?.find((img) => img.main)?.image_name_url || "";

const RestaurantCard = ({ restaurant }) => {
  const { name, description, capacity, Opening_hours, Cuisine_type, images } =
    restaurant;
  const mainImage = getMainImage(images);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-md border border-white/20 text-white"
    >
      <img src={mainImage} alt={name.en} className="w-full h-56 object-cover" />
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold">{name.en}</h2>
        <p className="text-sm text-sec-color-100 italic">{Cuisine_type.en}</p>
        <p className="text-sm">{description.en}</p>
        <div className="flex justify-between text-xs mt-3 text-sec-color-100">
          <div className="flex items-center gap-1">
            <Clock size={16} /> <span>{Opening_hours}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} /> <span>{capacity} guests</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RestaurantsList = ({ data }) => {
  return (
    <section className="bg-my-color py-16 px-4 text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Explore Our Restaurants</h2>
        <p className="text-sec-color-100 italic">
          Discover delicious experiences
        </p>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${data} gap-8 max-w-7xl mx-auto`}>
        {data.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantsList;
