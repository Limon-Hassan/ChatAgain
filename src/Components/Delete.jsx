import moment from "moment";
import { ref, remove, set, push, getDatabase } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { chatiinginfo } from "../slices/Chatslice";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Delete = ({ item, data }) => {
  let [will, setWill] = useState(false);
  const db = getDatabase();
  let menuref = useRef();
  let chatData = useSelector((state) => state.chatuserinfo);
  let disparch = useDispatch(chatData);
  useEffect(() => {
    let handler = (event) => {
      if (!menuref.current.contains(event.target)) {
        setWill(false);
      } 
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [1000]);

  let handledelete = (item) => {
    remove(ref(db, "firends/" + item.key));
  };

  let handleblock = (item) => {
    if (data.uid == item.senderid) {
      set(push(ref(db, "blocklist/")), {
        blockbyid: data.uid,
        blockby: data.displayName,
        blockbyimage: data.photoURL,
        blockuser: item.receivername,
        blockuserid: item.receiverid,
        blockerimage: item.receiverimage,
      }).then(() => {
        remove(ref(db, "firends/" + item.key));
      });
    } else {
      set(push(ref(db, "blocklist/")), {
        blockbyid: data.uid,
        blockby: data.displayName,
        blockbyimage: data.photoURL,
        blockuser: item.sendername,
        blockuserid: item.senderid,
        blockerimage: item.senderimage,
      }).then(() => {
        remove(ref(db, "firends/" + item.key));
      });
    }
  };

  let handleonclick = (item) => {
    if (data.uid == item.senderid) {
      disparch(
        chatiinginfo({
          username: item.receivername,
          id: item.receiverid,
          Image: item.receiverimage,
        })
      );
    } else {
      disparch(
        chatiinginfo({
          username: item.sendername,
          id: item.senderid,
          Image: item.senderimage,
        })
      );
    }
  };
  return (
    <>
      <div
        onClick={() => handleonclick(item)}
        className="flex items-center justify-between mb-[22px] mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px] mr-[22px]"
      >
        <div className="flex items-center">
          {data.uid == item.senderid ? (
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={item.receiverimage}
              alt=""
            />
          ) : (
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={item.senderimage}
              alt=""
            />
          )}
          <div className="ml-[12px] w-[127px]">
            {data.uid == item.senderid ? (
              <a
                className="text-[16px] font-Harbal font-semibold text-[#000000]"
                href="#"
              >
                {item.receivername}
              </a>
            ) : (
              <a
                className="text-[16px] font-Harbal font-semibold text-[#000000]"
                href="#"
              >
                {item.sendername}
              </a>
            )}
            <p className="text-[12px] font-Harbal font-normal text-[rgb(77,77,77,7.5)] ">
              Dinner? 
            </p>
          </div>
        </div>
        <div ref={menuref} className="flex items-center relative">
          <p className="text-[12px] font-Harbal font-medium text-black/50 mr-[21px]">
            {moment().calendar()}
          </p>

          <button
            onClick={() => setWill((will) => !will)}
            className="hover:bg-[rgb(34,31,31,.3)]  hover:rounded-full w-[32px] h-[32px] ease-in-out duration-300"
          >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          {will == true ? (
            <div className="w-[175px]  bg-white p-2 absolute top-[40px] left-[-10px] rounded-lg shadow-[0px_0px_4px_3px_rgba(0,0,0,0.1)] z-20">
              <div
                onClick={() => handledelete(item)}
                className="mb-2 w-full h-full  hover:bg-cyan-400"
              >
                <span className="ml-2">Unfriend</span>
              </div>
              <div
                onClick={() => handleblock(item)}
                className="mb-2 w-full h-full  hover:bg-cyan-400"
              >
                <span className="ml-2">Block</span>
              </div>
              <div className="mb-2 w-full h-full  hover:bg-cyan-400">
                <Link to="/massage" className="ml-2">
                  Message
                </Link>
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
    </>
  );
};

export default Delete;
