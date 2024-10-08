import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { BallTriangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const auth = getAuth();
  const db = getDatabase();
  let nevigate = useNavigate();
  let [emailerror, setEmailerror] = useState("");
  let [nameerror, setNameerror] = useState("");
  let [passworderror, setPassworderror] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);
  let [success, setSuccess] = useState(false);

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
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailerror)
    ) {
      setEmailerror("Invaild Email");
    }
    if (!value.name) {
      setNameerror("Name is requered !");
    }
    if (!value.password) {
      setPassworderror("Password is requered !");
    }
    if (value.email && value.name && value.password) {
      setSuccess(true);
      createUserWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: value.name,
              photoURL: "/defult.jpg",
            })
              .then(() => {
                set(ref(db, "users/" + userCredential.user.uid), {
                  name: userCredential.user.displayName,
                  email: userCredential.user.email,
                  images: "/defult.jpg",
                }).then(() => {
                  setTimeout(() => {
                    setSuccess(false);
                    nevigate("/login");
                  }, 1000);
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          setTimeout(() => {
            setSuccess(false);
            setEmailerror("Email already existed");
            const errorCode = error.code;
            const errorMessage = error.message;
          }, 1000);
        });
    }
  };

  function changeHandle(e, t) {
    if (e == "") {
      switch (t) {
        case "name":
          setUse({
            ...use,
            name: false,
          });
          break;
        case "password":
          setUse({
            ...use,
            password: false,
          });
          break;
        default:
          setUse({
            ...use,
            email: false,
          });
      }
    }
  }

  return (
    <>
      <section className="bg-white mobile:w-full tablet:w-full laptop:w-full desktop:w-full">
        <div className="main w-full h-screen mobile:block tablet:block laptop:flex desktop:flex laptop:justify-between laptop:items-center desktop:justify-between desktop:items-center flex justify-between items-center">
          <div className="div_1 ml-auto mobile:ml-0 tablet:ml-0 laptop:ml-auto desktop:ml-auto">
            <h1 className="text-[34px] laptop:text-[34px] desktop:text-[34px] mobile:text-[24px] mobile:text-center mobile:mt-14 mobile:mr-0 tablet:text-[26px] tablet:mt-10 tablet:mr-0 tablet:text-center laptop:mr-[70px] desktop:mr-[70px] font-bold font-Harbal text-[#11175D] mb-[13px] mr-[70px]">
              Get started with easily register
            </h1>
            <p className="text-[20px] laptop:text-[20px] desktop:text-[20px] mobile:text-[15px] mobile:text-center tablet:text-[18px] tablet:text-center laptop:text-left desktop:text-left  font-normal font-Harbal text-[#000000] opacity-50 mb-[40px]">
              Free register and you can enjoy it
            </p>
            <div className=" w-[368px] laptop:w-[368px] desktop:w-[368px] mobile:w-[295px] mobile:h-[70px] mobile:mx-auto mobile:mb-[40px] tablet:w-[396px] tablet:h-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:mb-[40px] desktop:mb-[40px] tablet:mb-[40px] h-[80px] laptop:h-[80px] desktop:h-[80px] mb-[40px] relative ">
              <input
                onClick={() => {
                  setUse({ ...use, email: true });
                }}
                onBlur={() => {
                  setUse({ ...use, email: false });
                }}
                onChange={(e) => {
                  setValue({ ...value, email: e.target.value });
                  changeHandle(e.target.value);
                  setEmailerror("");
                }}
                value={value.email}
                className={`w-full h-full text-[18px] laptop:text-[18px] desktop:text-[18px] mobile:text-[16px] mobile:p-[15px] tablet:text-[18px] tablet:p-[20px] p-[20px] laptop:p-[20px] desktop:p-[20px] border font-Harbal font-normal text-[#11175D] ${
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
            <div className="w-[368px] laptop:w-[368px] desktop:w-[368px] mobile:w-[295px] mobile:h-[70px] mobile:mx-auto mobile:mb-[40px] tablet:w-[396px] tablet:h-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:mb-[40px] desktop:mb-[40px] tablet:mb-[40px] h-[80px] laptop:h-[80px] desktop:h-[80px] mb-[40px] relative ">
              <input
                onClick={() => {
                  setUse({ ...use, name: true });
                }}
                onBlur={() => {
                  setUse({ ...use, name: false });
                }}
                onChange={(e) => {
                  setValue({ ...value, name: e.target.value });
                  changeHandle(e.target.value, "name");
                  setNameerror("");
                }}
                className={`w-full h-full text-[18px] laptop:text-[18px] desktop:text-[18px] mobile:text-[16px] mobile:p-[15px] tablet:text-[18px] tablet:p-[20px] p-[20px] laptop:p-[20px] desktop:p-[20px] border font-Harbal font-normal text-[#11175D] ${
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
            <div className=" w-[368px] laptop:w-[368px] desktop:w-[368px] mobile:w-[295px] mobile:h-[70px] mobile:mx-auto mobile:mb-[40px] tablet:w-[396px] tablet:h-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:mb-[40px] desktop:mb-[40px] tablet:mb-[40px] h-[80px] laptop:h-[80px] desktop:h-[80px] mb-[40px] relative  ">
              <input
                onClick={() => {
                  setUse({ ...use, password: true });
                }}
                onBlur={() => {
                  setUse({ ...use, password: false });
                }}
                onChange={(e) => {
                  setValue({ ...value, password: e.target.value });
                  changeHandle(e.target.value, "password");
                  setPassworderror("");
                }}
                className={`w-full h-full text-[18px] laptop:text-[18px] desktop:text-[18px] mobile:text-[16px] mobile:p-[15px] tablet:text-[18px] tablet:p-[20px] p-[20px] laptop:p-[20px] desktop:p-[20px] border font-Harbal font-normal text-[#11175D] ${
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
                } ${
                  use.password || value.password ? "top-[-14px]" : "top-[25px]"
                } `}
              >
                Password
              </p>
            </div>

            {success ? (
              <div className=" w-[368px] mx-auto mt-[20px]">
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#4fa94d"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                onClick={handleclick}
                className="text-[20px] mobile:text-[14px] tablet:text-[15px] laptop:text-[20px] desktop:text-[20px] font-Harbal font-normal text-[#FFFFFF] mb-[40px] bg-[#5F35F5] py-[20px] mobile:px-[100px] tablet:px-[100px] laptop:pl-[132px] laptop:pr-[158px] desktop:pl-[132px] desktop:pr-[158px] mobile:mx-auto tablet:mx-auto laptop:mx-0 desktop:mx-0 pl-[132px] pr-[158px] rounded-[86px] block mt-[50px] "
              >
                Sign up
              </button>
            )}
            <h5 className="text-[13px] mobile:mx-auto mobile:ml-[80px] tablet:ml-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:ml-[100px] desktop:ml-[100px] font-Harbal font-normal text-[#03014C] mt-5 ml-[100px] mobile:pb-[50px] tablet:pb-[50px] laptop:pb-0 desktop:pb-0">
              Already have an account ?{" "}
              <span className="text-[#EA6C00]">
                <Link to="/login"> Sign In</Link>
              </span>
            </h5>
          </div>

          <div className=" mobile:hidden tablet:hidden laptop:block desktop:block p2 w-2/4 h-full">
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

export default Register;
