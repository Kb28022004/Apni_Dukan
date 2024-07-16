import React from "react";
import HeroSecction from "./components/HeroSecction";
import { useProductContext } from "./context/productContaxt";

const About = () => {
  const myName = useProductContext();
  const data = {
    name: "Apna Bazaar Eccomerse",
  };
  return (
    <>
      {/* {myName} */}
      <HeroSecction myData={data} />
    </>
  );
};

export default About;
