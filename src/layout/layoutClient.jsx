import React from "react";
import Navbar from "../components/Navbar";

const LayoutClient = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default LayoutClient;
