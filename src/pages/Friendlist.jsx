import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  onValue,
  ref,
} from "firebase/database";
import Delete from "../Components/Delete";

const Friendlist = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.userinfo.value);
  let [frendlist, setFrendlist] = useState([]);

  useEffect(() => {
    const firendref = ref(db, "firends/");
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
  }, []);
  // let handleohh = () => {
  //   setWill(true)
  // }

  
  // let handleblock = (item) => {
  //   if (data.uid == item.senderid) {
  //     set(ref(db, "blocklist/" + item.receiverid), {
  //       blockbyid: data.uid,
  //       blockby: data.displayName,
  //       blockbyimage: data.photoURL,
  //       blockbyemail: data.email,
  //       blockuser: item.receivername,
  //       blockuserid: item.receiverid,
  //       blockerimage: item.receiverimage,
  //       blockeremail: item.receiveremail,
  //     }).then(() => {
  //       remove(ref(db, "firends/" + item.key));
  //     });
  //   } else {
  //     set(ref(db, "blocklist/" + item.receiverid), {
  //       blockbyid: data.uid,
  //       blockby: data.displayName,
  //       blockbyimage: data.photoURL,
  //       blockbyemail: data.email,
  //       blockuser: item.sendername,
  //       blockuserid: item.senderid,
  //       blockerimage: item.senderimage,
  //       blockeremail: item.senderemail,
  //     }).then(() => {
  //       remove(ref(db, "firends/" + item.key));
  //     });
  //   }
  // };
  return (
    <>
      <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ">
        <div className="flex justify-between items-center">
          <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
            Friends
          </h3>
          <div className="mr-[22px]">
            <i class="fa-solid fa-ellipsis-vertical text-[19px] text-[#5F35F5] "></i>
          </div>
        </div>
        {frendlist.map((item,index) => (
          <Delete item={item} data={data} key={index} />
        ))}
      </div>
    </>
  );
};

export default Friendlist;
