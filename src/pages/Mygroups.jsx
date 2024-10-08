import React, { useEffect, useState } from "react";
import moment from "moment";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const Mygroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.userinfo.value);
  let [mygroup, setMygroup] = useState([]);
  useEffect(() => {
    const mygroupref = ref(db, "grouplist/");
    onValue(mygroupref, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminid) array.push({ ...item.val() });
      });
      setMygroup(array);
    });
  }, []);

  return (
    <>
      <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[43px] ">
        <div className="flex justify-between items-center">
          <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
            My Groups
          </h3>
          <div className="mr-[22px]">
            <i class="fa-solid fa-ellipsis-vertical text-[19px] text-[#5F35F5] "></i>
          </div>
        </div>
        {mygroup.map((item,index) => (
          <div key={index} className="flex items-center justify-between mb-[22px] mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px]">
            <div className="flex items-center">
              <img
                className="w-[70px] h-[70px] rounded-full"
                src="img here.jpg"
                alt=""
              />
              <div className="ml-[12px] w-[127px]">
                <a
                  className="text-[16px] font-Harbal font-semibold text-[#000000]"
                  href="#"
                >
                  {item.name}
                </a>
                <p className="text-[12px] font-Harbal font-normal text-[rgb(77,77,77,7.5)] ">
                  Dinner?
                </p>
              </div>
            </div>
            <p className="text-[12px] font-Harbal font-medium text-black/50 mr-[28px]">
              {moment().calendar()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Mygroups;
