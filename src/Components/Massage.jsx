import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, set, push } from "firebase/database";

import Delete from "./Delete";
const Massage = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.userinfo.value);
  let chatdata = useSelector((state) => state.chatuserinfo.value);
  let [frendlist, setFrendlist] = useState([]);
  let [messagelist, setMessagelist] = useState([]);
  useEffect(() => {
    const firendref = ref(db, "firends/");
    if (data !== "null") {
      onValue(firendref, (snapshot) => {
        let array = [];
        snapshot.forEach((item) => {
          if (
            data.uid == item.val().senderid ||
            data.uid == item.val().receiverid
          ) {
            array.push({ ...item.val(), key: item.key });
          }
        });
        setFrendlist(array);
      });
    }
  }, []);
  useEffect(() => {
    const messageref = ref(db, "messagelist/");
    if (chatdata !== "null") {
      onValue(messageref, (snapshot) => {
        let array = [];
        snapshot.forEach((item) => {
          array.push({ ...item.val(), key: item.key });
        });
        setMessagelist(array);
      });
    }
  }, []);

  let [showing, setShowing] = useState(false);
  let [tension, setTension] = useState(false);
  let [error, setError] = useState("");
  let [inputvalue, setnputValue] = useState("");
  let [buttonvalue, setButtonvalue] = useState("");
  let [showevelu, setshowEValue] = useState([]);

  let handleEror = () => {
    setButtonvalue(inputvalue);
    if (!inputvalue) {
      setError("please enter name");
    }
    if (inputvalue) {
      set(push(ref(db, "grouplist/")), {
        name: inputvalue,
        admin: data.displayName,
        adminid: data.uid,
      }).then(() => {
        setTension(false);
      });
    }
  };

  useEffect(() => {
    const grouplist = ref(db, "grouplist/");
    onValue(grouplist, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), uid: item.key });
      });
      setshowEValue(array);
    });
  }, []);

  return (
    <>
      <div className="flex items-center gap-14">
        <div>
          <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ml-[50px]">
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
                Friends
              </h3>
              <div className="mr-[22px]">
                <i class="fa-solid fa-ellipsis-vertical text-[19px] text-[#5F35F5] "></i>
              </div>
            </div>
            {frendlist.map((item, index) => (
              <Delete item={item} data={data} key={index} />
            ))}
          </div>
          {tension == true ? (
            <div className="w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ml-[50px]">
              <div className="flex justify-between items-center  ">
                <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
                  Create group
                </h3>

                <div className="mr-[22px] relative ">
                  <button
                    onClick={() => setTension(false)}
                    className="text-[20px] font-Harbal font-medium text-[#000] bg-red-500 py-2 px-5 rounded-full "
                  >
                    Cansel
                  </button>
                </div>
              </div>
              <div className="flex items-center mb-[22px] mt-[20px] pb-[12px] ml-[22px] relative">
                <input
                  onChange={(e) => {
                    setnputValue(e.target.value);
                    setError("");
                  }}
                  className={`w-[250px]  h-[40px] rounded-3xl  border-2  px-3 text-[18px] placeholder:text-[18px] placeholder:font-Harbal placeholder:font-medium  outline-none
                ${error ? "border-red-500" : "border-green-600"}`}
                  placeholder="type group name..."
                  type="text"
                  value={inputvalue}
                />
                {error && (
                  <p className="absolute bottom-[-15px] left-[15px] text-[20px] font-Harbal font-medium text-red-500 ">
                    {error}
                  </p>
                )}
                <button
                  onClick={handleEror}
                  className="text-[20px] font-Harbal font-medium text-[#11175D] ml-3 bg-teal-400 px-6 py-2 rounded-full"
                >
                  Submit
                </button>
              </div>
              <div className="mb-[22px] mt-[20px] pb-[12px] ml-[22px]">
                <h3 className="text-[20px] font-Harbal font-medium text-[#11175D] mb-3">
                  Select your group photo
                </h3>
                <input
                  // onChange={handleChange}
                  className="text-[20px] text-teal-500 cursor-pointer"
                  type="file"
                />
              </div>
            </div>
          ) : (
            <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ml-[50px]">
              <div className="flex justify-between items-center  ">
                <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
                  Groups List
                </h3>

                <div className="mr-[22px] relative ">
                  <button
                    onClick={() => setShowing((showing) => !showing)}
                    className="hover:bg-[#b3a7df]  text-[#5F35F5]  hover:text-[#FFF]  hover:rounded-full w-[32px] h-[32px] ease-in-out duration-300"
                  >
                    <i class="fa-solid fa-ellipsis-vertical text-[19px]  cursor-pointer "></i>
                  </button>
                  {showing == true ? (
                    <div className="w-[175px]  bg-white p-2 absolute top-[40px] right-[0px] rounded-lg shadow-[0px_0px_4px_3px_rgba(0,0,0,0.1)] ">
                      <div
                        onClick={() => {
                          setTension((tension) => !tension);
                          setShowing("");
                        }}
                        className="mb-2 w-full h-full  hover:bg-cyan-400"
                      >
                        <span className="ml-2">Create group</span>
                      </div>
                      <div className="mb-2 w-full h-full  hover:bg-cyan-400">
                        <span className="ml-2">#something</span>
                      </div>
                      <div className="mb-2 w-full h-full  hover:bg-cyan-400">
                        <span className="ml-2">#Something</span>
                      </div>
                      <div className=" w-full h-full  hover:bg-cyan-400">
                        <span className="ml-2">#Something</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {showevelu.map((item) => (
                <div className="flex items-center mb-[22px] mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px] ">
                  <img
                    className="w-[70px] h-[70px] rounded-full"
                    src="img here.jpg"
                    alt=""
                  />
                  <div className="ml-[12px] w-[127px]">
                    <a
                      className="text-[18px] font-Harbal font-semibold text-[#000000]"
                      href="#"
                    >
                      {item.name}
                    </a>
                  </div>
                  <button className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-[#5F35F5] px-[22px] rounded-[5px] ml-[71px]">
                    Join
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <header className="w-[1110px] h-screen py-[35px]">
          <div className="w-full h-full shadow-2xl rounded-[40px]">
            <div className="container w-[1000px] h-[75%] mx-auto py-6">
              <div className="flex items-center justify-between border-b border-[rgb(0,0,0,.1)] pb-2 ">
                <div className="flex items-center gap-4">
                  <img
                    className="w-[75px] h-[75px] rounded-full "
                    src="defult.jpg"
                    alt="dfl"
                  />
                  <div>
                    <h3>{chatdata?.username}</h3>
                    <p>online</p>
                  </div>
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <div className="w-full h-full bg-white mt-5 overflow-y-scroll p-[30px] ">
                <div class="box sb2 w-[300px] bg-[#F1F1F1] p-[20px] mb-6 text-center text-[#707070] relative">
                  I'm speech bubble
                </div>
                <div class="box sb2 w-[300px] bg-[#F1F1F1] p-[20px] text-center text-[#707070] relative">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit, fuga ab reprehenderit nostrum consectetur similique,
                  eos libero qui placeat asperiores quas, laboriosam doloremque
                  eligendi incidunt itaque vitae velit ea. Vitae excepturi
                  ratione sapiente culpa facere. Eum autem voluptatum omnis
                  asperiores quidem doloremque soluta quam temporibus
                  voluptatibus debitis. Provident, ea molestias.
                </div>

                <div className=" mili mt-[40px] ">
                  <div class="box sb1 w-[300px] bg-[#00bfb6] mb-6 text-center  text-[#FFF] relative ">
                    <p className="w-[300px] p-[25px]"> I'm speech bubble</p>
                  </div>
                  <div class="box sb1 w-[300px] bg-[#00bfb6] mb-6 text-center  text-[#FFF] relative ">
                    <p className="w-[300px] p-[25px]"> I'm speech bubble</p>
                  </div>
                  <div class="box sb1 w-[300px] bg-[#00bfb6] text-center text-[#FFF] relative ">
                    <p className="w-[300px] p-[25px]">
                      {" "}
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Necessitatibus facere dignissimos iure eius cupiditate
                      ipsa assumenda, voluptates corporis id explicabo illo ad
                      vel pariatur et saepe, quas inventore unde quos.
                      Doloribus, veniam possimus laboriosam facere cum
                      blanditiis numquam, exercitationem nulla pariatur eum
                      earum corporis dolor labore consectetur. Ipsa, magnam est!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer w-[1000px]  mx-auto mt-[100px] ">
              <div className="flex justify-between gap-[20px] items-center border-t border-[rgb(0,0,0,.1)] pt-[35px]">
                <div className="w-[940px] h-[50px] relative">
                  <input
                    className="w-full h-full  rounded-[10px] bg-[#F1F1F1] outline-none pl-7 pr-[100px]"
                    type="text"
                  />
                  <div className="absolute top-[50%] translate-y-[-50%] right-[20px]  gap-[18px] flex">
                    <i class="fa-solid fa-face-smile cursor-pointer text-[18px] text-[#707070]"></i>
                    <i class="fa-solid fa-camera-retro text-[18px] cursor-pointer  text-[#707070]"></i>
                  </div>
                </div>
                <button className="text-[18px] text-white bg-[#5F35F5] px-[16px] py-[12px] rounded-[10px]">
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Massage;
