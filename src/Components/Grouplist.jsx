import React, { useState } from "react";
import GroupList from "../pages/GroupList";
import Friendlist from "../pages/Friendlist";
import Userlists from "../pages/Userlists";
import FriendRequest from "../pages/FriendRequest";
import Mygroups from "../pages/Mygroups";
import BlockList from "../pages/BlockList";

const Grouplist = () => {
  let [show, setShow] = useState(false);

  let handledesk = () => {
    setShow(!show);
  };
  return (
    <>
      <div>
        <div className="ml-28">
          <div className="bg-white w-[427px] h-[59px] relative z-10">
            <input
              className="w-full h-full rounded-[20px] shadow-lg text-[18px] font-Harbal font-medium text-[rgb(61,61,61,3.5)] py-[17px] px-[58px] placeholder:text-[16px] placeholder:font-normal placeholder:text-[rgb(61,61,61,3.5)] transition-all "
              placeholder="Search"
              type="search"
            />
            <i class="fa-solid fa-magnifying-glass absolute top-[20px] left-[23px] text-[19px] text-[#5F35F5] "></i>
            <i
              onClick={handledesk}
              class="fa-solid fa-ellipsis-vertical absolute top-[50%] translate-y-[-50%] right-[35px] text-[19px] text-[#5F35F5] cursor-pointer "
            ></i>
            {show === true ? (
              <div className="w-[200px] h-[200px] bg-black ml-auto">
                <ul>
                  <li className="tetx-[18px] font-Harbal font-medium text-[#FFF] block ml-[15px] mb-6 pt-[15px]">
                    <a href="#">Home</a>
                  </li>
                  <li className="tetx-[18px] font-Harbal font-medium text-[#FFF] block ml-[15px] mb-6">
                    <a href="#">Home</a>
                  </li>
                  <li className="tetx-[18px] font-Harbal font-medium text-[#FFF] block ml-[15px] mb-6">
                    <a href="#">Home</a>
                  </li>
                  <li className="tetx-[18px] font-Harbal font-medium text-[#FFF] block ml-[15px] mb-6">
                    <a href="#">Home</a>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between items-center gap-12 ">
            <GroupList></GroupList>
            <Friendlist></Friendlist>
            <Userlists></Userlists>
          </div>
          <div className="flex justify-between items-center gap-12 ">
            <FriendRequest></FriendRequest>
            <Mygroups></Mygroups>
            <BlockList></BlockList>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grouplist;


//  {
//    moment(new Date(data.date), "YYYYMMDD").fromNow();
//  }