import { getDatabase, ref, onValue, set, push } from "firebase/database";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Userlists = () => {
  let data = useSelector((state) => state.userinfo.value);

  let [userlist, setUserlist] = useState([]);
  let [frendreqlist, setFrendReqlist] = useState([]);
  let [friendback, setFriendback] = useState("");
  let [inputshow, setinputShow] = useState(false);
  let [search, setSearch] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const userlistinfo = ref(db, "users/");
    onValue(userlistinfo, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setUserlist(array);
    });
  }, []);
  useEffect(() => {
    const firendreqref = ref(db, "friendrequest/");
    onValue(firendreqref, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().receiverid);
      });
      setFrendReqlist(array);
    });
  }, []);

  useEffect(() => {
    const firendreqref = ref(db, "firends/");
    onValue(firendreqref, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().receiverid);
      });
      setFriendback(array);
    });
  }, []);

  let handleFrind = (item) => {
    console.log(item);
    set(push(ref(db, "friendrequest/")), {
      senderid: data.uid,
      sendername: data.displayName,
      senderemail: data.email,
      senderimage: data.photoURL,
      receiverid: item.uid,
      receivername: item.name,
      receiveremail: item.email,
      receiverimage: item.images,
    }).then(() => {
      toast.success("Successfull 🖤", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    });
  };

  let handlechil = () => {
    setinputShow(true);
  };

  let handlesearch = (e) => {
    let search = userlist.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearch(search);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className=" w-[427px] h-[375px] bg-[#FFFFFF] rounded-[20px] overflow-y-scroll shadow-lg mt-[30px] ">
        <div className="flex justify-between items-center">
          <h3 className="text-[20px] font-Harbal font-semibold text-[#000000] ml-[20px] mt-[13px] ">
            User List
          </h3>
          <div className="mr-[22px] flex gap-2 items-center">
            {inputshow == true ? (
              <div className="relative">
                <input
                  onChange={handlesearch}
                  onBlur={() => {
                    setinputShow({ setinputShow: false });
                  }}
                  className="transition-all  w-[230px]  h-[30px] pr-[35px] pl-[15px] outline-none rounded-[30px] border border-[rgb(131,122,122)]"
                  placeholder="search"
                  type="text"
                />
                {/* <div
                  className="absolute w-[35px] h-[30px] top-[0px] right-[0px] rounded-r-[30px] text-[#FFF] bg-[rgb(131,122,122)] "
                >
                  <i class="fa-duotone fa-solid fa-user-magnifying-glass mt-[6px] ml-[6px] cursor-pointer"></i>
                </div> */}
              </div>
            ) : (
              <input
                onClick={handlechil}
                className="w-[150px]  h-[30px] px-3 rounded-[30px] border border-[rgb(131,122,122)]"
                placeholder="search"
                type="text"
              />
            )}

            <i class="fa-solid fa-ellipsis-vertical text-[19px] text-[#5F35F5] "></i>
          </div>
        </div>
        {search.length > 0
          ? search.map((item) => (
              <div className="flex items-center mb-[22px] mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px] mr-[22px]">
                <img
                  className="w-[70px] h-[70px] rounded-full"
                  src={item ? item.images : "/defult.jpg"}
                  alt="image"
                />
                <div className="ml-[12px] w-[127px]">
                  <a
                    className="text-[18px] font-Harbal font-semibold text-[#000000]"
                    href="#"
                  >
                    {item.name}
                  </a>
                  <p className="text-[16px] font-Harbal font-normal text-[rgb(77,77,77,7.5)] ">
                    {moment().calendar()}
                  </p>
                </div>
                {friendback.includes(data.uid + item.uid) ||
                friendback.includes(item.uid + data.uid) ? (
                  <h1 className="text-[14px] font-Harbal font-semibold ml-20">
                    Friend
                  </h1>
                ) : frendreqlist.includes(data.uid + item.uid) ||
                  frendreqlist.includes(item.uid + data.uid) ? (
                  <button className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-[#5F35F5] px-[22px] rounded-[5px] ml-[71px] py-2">
                    <i class="fa-regular fa-hourglass-half"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => handleFrind(item)}
                    className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-[#5F35F5] px-[22px] rounded-[5px] ml-[71px]"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                )}
              </div>
            ))
          : userlist.map((item) => (
              <div className="flex items-center mb-[22px] mt-[20px] border-b-2  border-[rgb(0,0,0,.2)] pb-[12px] ml-[22px] mr-[22px]">
                <img
                  className="w-[70px] h-[70px] rounded-full"
                  src={item ? item.images : "/defult.jpg"}
                  alt="image"
                />
                <div className="ml-[12px] w-[127px]">
                  <a
                    className="text-[18px] font-Harbal font-semibold text-[#000000]"
                    href="#"
                  >
                    {item.name}
                  </a>
                  <p className="text-[16px] font-Harbal font-normal text-[rgb(77,77,77,7.5)] ">
                    {moment().calendar()}
                  </p>
                </div>
                {friendback.includes(data.uid + item.uid) ||
                friendback.includes(item.uid + data.uid) ? (
                  <h1 className="text-[14px] font-Harbal font-semibold ml-20">
                    Friend
                  </h1>
                ) : frendreqlist.includes(data.uid + item.uid) ||
                  frendreqlist.includes(item.uid + data.uid) ? (
                  <button className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-[#5F35F5] px-[22px] rounded-[5px] ml-[71px] py-2">
                    <i class="fa-regular fa-hourglass-half"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => handleFrind(item)}
                    className="text-[20px] font-Harbal font-semibold text-[#FFFFFF] bg-[#5F35F5] px-[22px] rounded-[5px] ml-[71px]"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                )}
              </div>
            ))}
      </div>
    </>
  );
};

export default Userlists;
