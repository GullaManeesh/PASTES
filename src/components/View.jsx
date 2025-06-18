import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function View() {
  const { id } = useParams();

  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.filter((paste) => paste._id === id)[0];

  return (
    <div className="absolute w-full h-full p-5 ">
      <button
        onClick={() => (window.location.href = `/pastes`)}
        className="absolute top-0 right-0 mr-10">
        <FontAwesomeIcon
          className="text-2xl p-4 bg-neutral-800 hover: cursor-pointer"
          icon={faRightFromBracket}
        />
      </button>
      <div className="absolute left-1/2  transform -translate-x-1/2 p-2   w-[700px] h-[85%]">
        <div className="flex gap-4">
          <input
            value={paste.title}
            disabled
            type="text"
            className="flex-3 w-full p-2 rounded-xl outline-gray-500 outline-2"
            placeholder="Enter Title"
          />
        </div>
        <div className="h-[100%] w-full mt-4  px-1 pb-1 bg-neutral-800 rounded-tr-xl rounded-tl-xl">
          <div className="flex p-3">
            <FontAwesomeIcon
              icon={faClone}
              className="ml-auto hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(paste.value);
                toast.success("copied successfully");
              }}
            />
          </div>
          <textarea
            value={paste.value}
            disabled
            name=""
            id=""
            className="w-full resize-none outline-none p-5 bg-black h-[93.5%]  rounded-tr-xl rounded-tl-xl"></textarea>
        </div>
      </div>
    </div>
  );
}

export default View;
