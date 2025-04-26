/* eslint-disable react/prop-types */
// src/components/atoms/Card.js

export default function Card({ title, value, Icon, bgColor }) {
  return (
    <div className={`p-4 rounded-lg shadow-md text-white text-center ${bgColor} flex flex-col items-center justify-center`}>
      <Icon className="text-3xl" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );

}

