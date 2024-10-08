import React from "react";
import { Outlet } from "react-router-dom";
import Sideber from "../Components/Sideber";

const RootLear = () => {
  return (
    <>
      <div className="flex">
        <Sideber></Sideber>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default RootLear;
