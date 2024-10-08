import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BlockList = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.userinfo.value);
  let [blocklist, setBlocklist] = useState([]);
  useEffect(() => {
    const blockref = ref(db, "blocklist/");
    onValue(blockref, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().blockbyid ||
          data.uid == item.val().blockuserid
        ) {
          array.push({ ...item.val() });
        }
      });
      setBlocklist(array);
    });
  }, []);

  let handleunBlock = async (item) => {
    if (data.uid == item.blockbyid) {
      set(push(ref(db, "firends/")), {
        senderid: item.blockbyid,
        sendername: item.blockby,
        senderimage: item.blockbyimage,
        receiverid: item.blockuserid,
        receivername: item.blockuser,
        receiverimage:item.blockerimage
      }).then(() => {
        remove(ref(db, "blocklist/"));
      });
    }
  };

  return (
    <>
      <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[43px] ">
        <div className="flex justify-between items-center">
          <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
            Blocked Users
          </h3>
          <div className="mr-[22px]">
            <i class="fa-solid fa-ellipsis-vertical text-[19px] text-[#5F35F5] "></i>
          </div>
        </div>
        {blocklist.map((item) => (
          <div className="flex items-center justify-between mb-[22px] mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px] mr-[22px]">
            <div className="flex items-center">
              {data.uid == item.blockbyid ? (
                <img
                  className="w-[70px] h-[70px] rounded-full"
                  src={item.blockerimage}
                  alt=""
                />
              ) : (
                <img
                  className="w-[70px] h-[70px] rounded-full"
                  src={item.blockbyimage}
                  alt=""
                />
              )}
              <div className="ml-[12px] w-[127px]">
                {data.uid == item.blockbyid ? (
                  <a
                    className="text-[16px] font-Harbal font-semibold text-[#000000]"
                    href="#"
                  >
                    {item.blockuser}
                  </a>
                ) : (
                  <a
                    className="text-[16px] font-Harbal font-semibold text-[#000000]"
                    href="#"
                  >
                    {item.blockby}
                  </a>
                )}
                <p className="text-[12px] font-Harbal font-semibold text-black/50 mr-[21px]">
                  {moment().calendar()}
                </p>
              </div>
            </div>
            <div className="flex items-center relative">
              {data.uid == item.blockbyid && (
                <button
                  onClick={() => handleunBlock(item)}
                  className="bg-[#5F35F5] text-[#FFF] py-3 px-4 rounded-lg"
                >
                  Unblock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlockList;
