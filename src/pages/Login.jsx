import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  let [emailerror, setEmailerror] = useState("");
  let [nameerror, setNameerror] = useState("");
  let [passworderror, setPassworderror] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);

  let [value, setValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  let [use, setUse] = useState({
    email: false,
    name: false,
    password: false,
  });

  let handleclick = () => {
    if (!value.email) {
      setEmailerror("Email is requered !");
    }
    if (!value.name) {
      setNameerror("Name is requered !");
    }
    if (!value.password) {
      setPassworderror("Password is requered !");
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="main w-full h-screen flex justify-between items-center">
          <div className="div_1 ml-auto">
            <h1 className="text-[34px] font-bold font-Harbal text-[#11175D] mb-[13px] mr-[70px]">
              Get started with easily register
            </h1>
            <p className="text-[20px] font-normal font-Harbal text-[#000000] opacity-50 mb-[40px]">
              Free register and you can enjoy it
            </p>
            <div className=" w-[368px] h-[80px] mb-[40px] relative ">
              <input
                onClick={() => {
                  setUse({ ...use, email: true });
                }}
                onBlur={() => {
                  setUse({ ...use, email: false });
                }}
                onChange={(e) => {
                  setValue({ ...value, email: e.target.value });
                  setEmailerror("");
                }}
                value={value.email}
                className={`w-full h-full text-[18px]  p-[20px] border font-Harbal font-normal text-[#11175D] ${
                  emailerror ? "border-red-500" : "border-[#11175D]"
                } rounded-[8px] `}
                type="text"
              />
              {emailerror && (
                <p className="text-[18px] font-Harbal font-normal text-red-500">
                  {emailerror}
                </p>
              )}
              <p
                className={`text-[18px] font-Harbal font-normal absolute bg-white px-2 transition-all  ${
                  emailerror ? "text-red-500" : "text-[#11175D]"
                } left-[20px] ${
                  use.email || value.email ? "top-[-14px]" : "top-[25px]"
                }`}
              >
                Email Address
              </p>
            </div>
            <div className=" w-[368px] h-[80px] mb-[40px] relative ">
              <input
                onClick={() => {
                  setUse({ ...use, name: true });
                }}
                onBlur={() => {
                  setUse({ ...use, name: false });
                }}
                onChange={(e) => {
                  setValue({ ...value, name: e.target.value });
                  setNameerror("");
                }}
                className={`w-full h-full text-[18px] p-[20px] border font-Harbal font-normal text-[#11175D] ${
                  nameerror ? "border-red-500" : "border-[#11175D]"
                } rounded-[8px]`}
                type="text"
                value={value.name}
              />
              {nameerror && (
                <p className="text-[18px] font-Harbal font-normal text-red-500">
                  {nameerror}
                </p>
              )}
              <p
                className={`text-[18px] font-Harbal font-normal bg-white px-2 absolute ${
                  nameerror ? "text-red-500" : "text-[#11175D]"
                } transition-all left-[20px] ${
                  use.name || value.name ? "top-[-14px]" : "top-[25px]"
                }`}
              >
                Full Name
              </p>
            </div>
            <div className=" w-[368px] h-[80px] relative ">
              <input
                onClick={() => {
                  setUse({ ...use, password: true });
                }}
                onBlur={() => {
                  setUse({ ...use, password: false });
                }}
                onChange={(e) => {
                  setValue({ ...value, password: e.target.value });
                  setPassworderror("");
                }}
                className={`w-full h-full text-[18px] p-[20px] border font-Harbal font-normal text-[#11175D] ${
                  passworderror ? "border-red-500" : "border-[#11175D]"
                } rounded-[8px]`}
                type={passwordshow ? "text" : "password"}
              />
              {passwordshow ? (
                <FaEye
                  onClick={() => setPasswordShow(false)}
                  className="text-[20px] absolute top-[50%] translate-y-[-50%] right-[20px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setPasswordShow(true)}
                  className="text-[20px] absolute top-[50%] translate-y-[-50%] right-[20px] cursor-pointer"
                />
              )}
              {passworderror && (
                <p className="text-[18px] font-Harbal font-normal text-red-500">
                  {passworderror}
                </p>
              )}
              <p
                className={`text-[18px] font-Harbal font-normal absolute bg-white px-2 transition-all left-[20px] ${
                  passworderror ? "text-red-500" : "text-[#11175D]"
                } ${use.password ? "top-[-14px]" : "top-[25px]"} `}
              >
                Password
              </p>
            </div>
            <button
              onClick={handleclick}
              className="text-[20px] font-Harbal font-normal text-[#FFFFFF] mb-[35px] bg-[#5F35F5] py-[20px] pl-[132px] pr-[158px] rounded-[86px] block mt-[50px] "
            >
              Sign up
            </button>
            <h5 className="text-[13px] font-Harbal font-normal text-[#03014C] ml-[100px]">
              Already have an account ?{" "}
              <span className="text-[#EA6C00]">
                <a href="#">Sign In</a>
              </span>
            </h5>
          </div>

          <div className="p2 w-2/4 h-full">
            <img
              className="w-full object-cover overflow-hidden h-full"
              src="Benner.png"
              alt="Banner"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
