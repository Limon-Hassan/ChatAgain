import {
  onValue,
  ref,
  getDatabase,
  push,
  set,
  remove,
} from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  let data = useSelector((state) => state.userinfo.value);
  let [frendreqlist, setFrendReqlist] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const firendreqref = ref(db, "friendrequest/");
    onValue(firendreqref, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverid) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setFrendReqlist(array);
    });
  }, []);

  let handleAccepts = (item) => {
    set(push(ref(db, "firends/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.key));
    })
  };
  let handleremove = (item) => {
    remove(ref(db, "friendrequest/" + item.key));
  }
  return (
    <>
      <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[43px] ">
        <div className="flex justify-between items-center">
          <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
            Friend Request
          </h3>
          <div className="mr-[22px]">
            <i class="fa-solid fa-ellipsis-vertical text-[19px] text-[#5F35F5] "></i>
          </div>
        </div>
        {frendreqlist.map((item) => (
          <div className="flex items-center  mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px] mr-[22px]">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={item.senderimage}
              alt=""
            />
            <div className="ml-[12px] w-[127px]">
              <a
                className="text-[16px] font-Harbal font-semibold text-[#000000]"
                href="#"
              >
                {item.sendername}
              </a>
              <p className="text-[12px] font-Harbal font-normal text-[rgb(77,77,77,7.5)] ">
                {moment().startOf("hour").fromNow()}
              </p>
            </div>
            <button
              onClick={() => handleAccepts(item)}
              className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-green-400 px-[22px] rounded-[5px] ml-[30px]"
            >
              <i class="fa-solid fa-check"></i>
            </button>
            <button
              onClick={() => handleremove(item)}
              className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-red-400 px-[22px] rounded-[5px] ml-[22px]"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FriendRequest;
