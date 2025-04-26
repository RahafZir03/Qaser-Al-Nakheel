/* eslint-disable react/prop-types */
import LinkButton from "../atoms/LinkButton";
//import BouncingImage from "../atoms/BouncingImage";

export default function DescriptionWithImage({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="grid grid-cols-1 2md:grid-cols-2 max-w-[1300px] mx-auto gap-12 items-center p-8 mt-20 mb-8 border-b pb-20">
      <div className="ml-4 justify-self-center">
        <div className="border-8 rounded-2xl shadow-lg shadow-gray-500">
          <div className="shadow-inner-shadow shadow-white/20 p-5">
            <img src={image} alt="Bouncing Image" className="rounded-xl" />
          </div>
        </div>
      </div>
      <div className=" justify-self-center">
        <div className=" justify-self-center">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <div className="mt-2 mb-5 h-2 rounded-full w-1/5 bg-gradient-to-r from-white from-0%  to-sec-color-100 to-60%"></div>
          <p className="text-gray-200 text-xl mb-12 mt-10">{description}</p>
          
          <LinkButton link={buttonLink} text={buttonText} />
        </div>
      </div>
    </div>
  );
}
