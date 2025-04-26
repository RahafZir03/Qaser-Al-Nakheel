/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import LinkButton from "../atoms/LinkButton";
import QuickBookingForm from "../organism/QuickBookingForm";

export default function UpperTitle({
  title,
  description,
  withDesc,
  imgSrc,
  to,
  bottonLabel,
  short = false,
  showFrom = false,
}) {
  return (
    <div
      className={`relative flex justify-center items-center ${
        short ? "h-[340px]" : "h-[550px]"
      } w-full overflow-hidden`}
    >
      <img
        src={imgSrc}
        alt={title}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col justify-center items-center gap-8 text-white text-center z-20 px-5"
      >
        <h1 className="text-2xl md:text-4xl slg:text-5xl font-bold max-w-4xl">
          {title}
        </h1>
        {withDesc && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-base md:text-xl font-medium text-gray-200 max-w-3xl"
            >
              {description}
            </motion.p>
            {to && bottonLabel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <LinkButton link={`/${to}`} text={bottonLabel} size="large" />:
              </motion.div>
            )}
          </>
        )}

        {showFrom && (
          <div className="mt-14">
            <QuickBookingForm />
          </div>
        )}
      </motion.div>
    </div>
  );
}
