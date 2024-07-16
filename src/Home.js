import React from "react";
import HeroSecction from "./components/HeroSecction";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import FeatureProducts from "./components/FeatureProducts";

const Home = () => {
  const data = {
    name: "Apna Bazaar",
  };
  return (
    <>
      <HeroSecction myData={data} />
      <FeatureProducts />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
