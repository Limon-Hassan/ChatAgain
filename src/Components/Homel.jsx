import React, { useEffect, useState } from "react";
import GroupList from "./Grouplist";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginuserid } from "../slices/userSlice";

const Homel = () => {
  let dispatch = useDispatch();
  const auth = getAuth();
  let [verify, setVerifie] = useState(false);
  let nevigate = useNavigate();
  let data = useSelector((state) => state.userinfo.value);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(loginuserid(user));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      nevigate("/login");
      setVerifie(false);
    }
  });

  useEffect(() => {
    if (!data) {
      nevigate("/login");
    } else if (!data.emailVerified) {
      setVerifie(false);
    } else {
      setVerifie(true);
    }
  }, []);

  return (
    <>
      {verify ? (
        <div className="pt-[35px]">
          <GroupList></GroupList>
        </div>
      ) : (
        <div className="w-full h-screen bg-teal-400/70 flex justify-center items-center absolute top-0 left-0 ">
          <h1 className="text-[35px] font-Harbal font-bold text-[#FFF]">
            {" "}
            Please verified Your Email !
          </h1>
        </div>
      )}
    </>
  );
};

export default Homel;
