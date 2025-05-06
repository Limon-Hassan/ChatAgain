import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { BallTriangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginuserid } from "../slices/userSlice";
import { getDatabase, ref, set } from "firebase/database";

const Login = () => {
  let dispatch = useDispatch();
  const db = getDatabase();
  const auth = getAuth();
  let nevigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let [emailerror, setEmailerror] = useState("");
  let [passworderror, setPassworderror] = useState("");
  let [passwordshow, setPasswordShow] = useState("");
  let [success, setSuccess] = useState(false);

  let [value, setValue] = useState({
    email: "",
    password: "",
  });
  let [use, setUse] = useState({
    email: false,
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
    if (!value.password) {
      setPassworderror("Password is requered !");
    }
    if (value.email && value.password) {
      setSuccess(true);
      signInWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(loginuserid(user));
          localStorage.setItem("user", JSON.stringify(user));
          nevigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error code:", errorCode);
          console.error("Error message:", errorMessage);
          setEmailerror("Invalid email or password");
        });
    }
  };

  function changeHandle(e, t) {
    if (e == "") {
      switch (t) {
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

  let HandleWithGoggle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        set(ref(db, "users/" + result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          images: result.user.photoURL,
        }).then(() => {
          setTimeout(() => {
            setSuccess(false);
            nevigate("/");
          }, 1000);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  return (
    <>
      <section className="bg-white mobile:w-full tablet:w-full laptop:w-full desktop:w-full">
        <div className="main w-full h-screen mobile:block tablet:block laptop:flex desktop:flex laptop:justify-between laptop:items-center desktop:justify-between desktop:items-center flex justify-between items-center">
          <div className="div_1 mobile:ml-0 tablet:ml-0 laptop:ml-[300px] desktop:ml-[300px] ml-[300px]">
            <h1 className="text-[34px] laptop:text-[34px] desktop:text-[34px] mobile:text-[24px] mobile:text-center mobile:mt-14 mobile:mr-0 tablet:text-[26px] tablet:mt-10 tablet:mr-0 tablet:text-center laptop:mr-[70px] desktop:mr-[70px] font-bold font-Harbal text-[#11175D] mb-[13px] mr-[70px]">
              Login to your account!
            </h1>
            <button
              onClick={HandleWithGoggle}
              className="text-[15px] items-center font-Harbal font-semibold text-[#03014C] bg-white mobile:py-[18px] tablet:py-[18px] laptop:py-[23px] desktop:py-[23px] mobile:px-[36px] tablet:px-[36px] laptop:px-[59px] desktop:px-[59px] px-[59px] py-[23px] flex gap-3 mobile:mx-auto tablet:mx-auto laptop:mx-0 desktop:mx-0 mt-[53px] mb-[54px] rounded-[8px] border border-opacity-50 border-[#03014C]"
            >
              <img src="Group 1.png" alt="Group" /> Login with Google
            </button>
            <div className=" w-[368px] laptop:w-[368px] desktop:w-[368px] mobile:w-[295px] mobile:h-[70px] mobile:mx-auto mobile:mb-[40px] tablet:w-[396px] tablet:h-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:mb-[40px] desktop:mb-[40px] tablet:mb-[40px] h-[80px] laptop:h-[80px] desktop:h-[80px] mb-[40px] relative  ">
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
                className={`w-full h-full text-[18px] laptop:text-[18px] desktop:text-[18px] mobile:text-[16px] mobile:p-[15px] tablet:text-[18px] tablet:p-[20px] p-[20px] laptop:p-[20px] desktop:p-[20px] border-b outline-none font-Harbal font-normal text-[#11175D] ${
                  emailerror ? "border-red-500" : "border-[#11175D]"
                } `}
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
            <div className=" w-[368px] laptop:w-[368px] desktop:w-[368px] mobile:w-[295px] mobile:h-[70px] mobile:mx-auto mobile:mb-[40px] tablet:w-[396px] tablet:h-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:mb-[40px] desktop:mb-[40px] tablet:mb-[40px] h-[80px] laptop:h-[80px] desktop:h-[80px] mb-[40px] relative">
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
                className={`w-full h-full text-[18px] laptop:text-[18px] desktop:text-[18px] mobile:text-[16px] mobile:p-[15px] tablet:text-[18px] tablet:p-[20px] p-[20px] laptop:p-[20px] desktop:p-[20px] border-b outline-none font-Harbal font-normal text-[#11175D] ${
                  passworderror ? "border-red-500" : "border-[#11175D]"
                }`}
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
              <div className=" w-[368px] ml-[100px] ">
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
                className="text-[20px] mobile:text-[14px] tablet:text-[15px] laptop:text-[20px] desktop:text-[20px] font-Harbal font-normal text-[#FFFFFF] mb-[40px] bg-[#5F35F5] py-[26px] mobile:px-[100px] tablet:px-[100px] laptop:px-[122px] desktop:px-[122px] mobile:mx-auto tablet:mx-auto laptop:mx-0 desktop:mx-0 px-[122px] rounded-[8px] block mt-[50px]"
              >
                Login to Continue
              </button>
            )}
            <h5 className="text-[13px] mobile:mx-auto mobile:ml-[80px] tablet:ml-[80px] tablet:mx-auto laptop:mx-0 desktop:mx-0 laptop:ml-[100px] desktop:ml-[100px] font-Harbal font-normal text-[#03014C] mt-5 ml-[100px] mobile:pb-[50px] tablet:pb-[50px] laptop:pb-0 desktop:pb-0">
              Don’t have an account ?{" "}
              <span className="text-[#EA6C00]">
                <Link to="/register"> Sign In</Link>
              </span>
            </h5>
          </div>

          <div className="mobile:hidden tablet:hidden laptop:block desktop:block p2 w-2/4 h-full">
            <img
              className="w-full object-cover overflow-hidden h-full"
              src="img here.jpg"
              alt="Banner"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
