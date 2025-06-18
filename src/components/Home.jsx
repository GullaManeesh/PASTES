import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updatePaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();
  const pasteId = params.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  console.log("pastes:", pastes);
  console.log("id:", pasteId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((paste) => paste._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.value);
      } else {
        console.warn("Paste not found for id:", pasteId);
      }
    }
  }, [pasteId]);

  function handleClick() {
    const paste = {
      _id: pasteId || Date.now().toString(36),
      title,
      value,
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updatePaste(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setParams("");
  }

  return (
    <div className="absolute w-full h-full p-5 ">
      <div className="absolute left-1/2  transform -translate-x-1/2 p-2   w-[700px] h-[85%]">
        <div className="flex gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="flex-3 w-full p-2 rounded-xl outline-gray-500 outline-2"
            placeholder="Enter Title"
          />
          <button
            className="flex-1 font-medium bg-white text-black hover:cursor-pointer rounded-xl "
            onClick={handleClick}>
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
        <div className="h-[100%] w-full mt-4  px-1 pb-1 bg-neutral-800 rounded-tr-xl rounded-tl-xl">
          <div className="flex p-3">
            <FontAwesomeIcon
              icon={faClone}
              className="ml-auto hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("copied successfully");
              }}
            />
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name=""
            id=""
            className="w-full resize-none outline-none p-5 bg-black h-[93.5%]  rounded-tr-xl rounded-tl-xl"></textarea>
        </div>
      </div>
    </div>
  );
}

export default Home;
