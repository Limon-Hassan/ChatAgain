import React, { useState, createRef } from "react";
import { NavLink } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { updateProfile, getAuth } from "firebase/auth";
import { loginuserid } from "../slices/userSlice";
import { update, ref as dref, getDatabase } from "firebase/database";

const Sideber = () => {
  const auth = getAuth();
  let db = getDatabase();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.userinfo.value);
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const storageRef = ref(storage, `userimage/${Date.now()}`);
  let [success, setSuccess] = useState(false);

  let [imgaeshow, setImgaeShow] = useState(false);

  let [active, setActive] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });
  let handleShow = (event, type) => {
    setActive((prevActive) => {
      const updatedState = Object.keys(prevActive).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      updatedState[type] = true;

      return updatedState;
    });
  };
  let handleclick = () => {
    setImgaeShow(true);
  };
  //this is from nmp cropperr
  let handleChange = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  let handleSety = () => {
    setSuccess(true);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(loginuserid(auth.currentUser));
            update(dref(db, "users/" + data.uid), {
              images: downloadURL,
            });
            setImgaeShow(false);
            setImage("");
            setSuccess(false);
          });
        });
      });
    }
  };

  return (
    <>
      <div className="bg-white h-screen">
        <div className=" h-screen py-[35px] pl-[32px]  box-border">
          <div className="w-[186px] h-full rounded-[20px] bg-[#5F35F5] text-center ">
            <div className=" mx-auto pt-9">
              <div className="w-[100px] h-[100px] mx-auto group relative">
                <img
                  className="w-full h-full rounded-full"
                  src={data && data.photoURL}
                  alt=""
                />
                <div
                  onClick={handleclick}
                  className="w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 ease-in-out duration-300 cursor-pointer rounded-full absolute top-0 left-0 flex justify-center items-center"
                >
                  <i class="fa-solid fa-cloud-arrow-up text-white/70 "></i>
                </div>
              </div>
              <div className="mt-[10px]">
                <h1 className="text-[20px] font-Harbal font-semibold text-[#FFF]">
                  {data && data.displayName}
                </h1>
              </div>
              <div className="block">
                <NavLink
                  to="/"
                  onClick={(e) => {
                    handleShow(e, "a");
                  }}
                  className={`text-[45px] block mx-auto mb-[40px] mt-[40px] transition-all w-[160px] h-[89px] text-[#FFF] rounded-l-[15px] ${
                    active.a ? "active" : ""
                  }`}
                >
                  <i class="fa-regular fa-house "></i>
                </NavLink>
                <NavLink
                  to="/massage"
                  onClick={(e) => {
                    handleShow(e, "b");
                  }}
                  className={`text-[45px] block mx-auto mb-[40px] mt-[50px] transition-all w-[160px] h-[89px] text-[#FFF] rounded-l-[15px] ${
                    active.b ? "active" : ""
                  }`}
                >
                  <i class="fa-solid fa-comment-dots "></i>
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    handleShow(e, "c");
                  }}
                  to="/service"
                  className={`text-[45px] block mx-auto mb-[40px] mt-[50px] transition-all w-[160px] h-[89px] text-[#FFF] rounded-l-[15px] ${
                    active.c ? "active" : ""
                  }`}
                >
                  <i class="fa-solid fa-bell "></i>
                </NavLink>
                <NavLink
                  onClick={(e) => {
                    handleShow(e, "d");
                  }}
                  to="/page"
                  className={`text-[45px] block mx-auto mb-[40px] mt-[50px] transition-all w-[160px] h-[89px] text-[#FFF] rounded-l-[15px] ${
                    active.d ? "active" : ""
                  }`}
                >
                  <i class="fa-solid fa-gear "></i>
                </NavLink>
                <button className="text-[46px] text-[#FFFF] block mx-auto">
                  <i class="fa-sharp fa-light fa-arrow-right-to-bracket "></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {imgaeshow === true ? (
          <div className="w-full h-screen bg-black/70 absolute top-0 left-0 z-20 flex justify-center items-center">
            <div className="w-[400px]  bg-white hover:bg-yellow-200 ease-in-out duration-300 p-[30px] rounded-md">
              <h1 className="text-[25px] font-Harbal font-semibold text-teal-500 mb-[15px] ">
                Upload your profile photo
              </h1>
              <input
                onChange={handleChange}
                className="text-[20px] text-teal-500 cursor-pointer"
                type="file"
              />
              {image && (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 300, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              )}
              {success ? (
                <div className="flex justify-center mt-[22px]">
                  <Circles
                    height="80"
                    width="80"
                    color="#f03c3c"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <button
                  onClick={handleSety}
                  className="text-[20px] mobile:text-[14px] tablet:text-[15px] laptop:text-[20px] desktop:text-[20px] font-Harbal font-normal text-[#FFFFFF] mb-[20px] bg-[#5F35F5] py-[20px] mobile:px-[100px] tablet:px-[100px] laptop:pl-[132px] laptop:pr-[158px] desktop:pl-[132px] desktop:pr-[158px] mobile:mx-auto tablet:mx-auto laptop:mx-0 desktop:mx-0 pl-[132px] pr-[158px] rounded-[86px] block mt-[85px] "
                >
                  Upload
                </button>
              )}
            </div>
            <i
              onClick={() => setImgaeShow(false)}
              class="fa-solid fa-xmark text-[#FFF] mt-[-385px] text-[30px] w-0 h-0 rounded-full  py-[25px] px-[25px] flex justify-center items-center hover:bg-red-500 "
            ></i>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Sideber;
