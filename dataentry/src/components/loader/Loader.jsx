import React from "react";
import { Rings } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <Rings color="#00BFFF" height={120} width={120} />
      </div>
    </>
  );
};

export default Loader;
