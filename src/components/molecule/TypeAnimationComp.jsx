import { TypeAnimation } from "react-type-animation";

const TypeAnimationComp = () => {
  return (
    <TypeAnimation
      sequence={["Lamar", 1000, "Roaa", 1000, "Rahaf",1000]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-3xl xl:text-5xl inline-block font-bold"
    />
  );
};

export default TypeAnimationComp;
