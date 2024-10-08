import { push, ref, set, getDatabase, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GroupList = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.userinfo.value);
  let [showing, setShowing] = useState(false);
  let [tension, setTension] = useState(false);
  let [error, setError] = useState("");
  let [inputvalue, setnputValue] = useState("");
  let [buttonvalue, setButtonvalue] = useState("");
  let [showevelu, setshowEValue] = useState([]);

  let handleEror = (item) => {
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
        })
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
      {tension == true ? (
        <div className="w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ">
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
        <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ">
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
    </>
  );
};

export default GroupList;
