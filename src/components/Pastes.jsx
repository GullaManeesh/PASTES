import React, { useState } from "react";
import {
  updatePaste,
  removeFromPastes,
  resetAllPastes,
} from "../redux/pasteSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faShareNodes,
  faEye,
  faClone,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Pastes() {
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) =>
      paste.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.value?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (pasteId) => {
    const shareLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Shareable link copied to clipboard!");
  };

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };
  return (
    <div className="absolute w-full  h-full p-5 ">
      <div className="absolute left-1/2  transform -translate-x-1/2 p-2 w-[80%] h-[80%]  mt-5 outline-neutral-400">
        <input
          type="text"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" w-full p-2 rounded-xl outline-gray-500 outline-2"
        />
        <div className="outline-1 outline-gray-300 rounded-tl-xl rounded-tr-xl w-full min-h-full mt-5">
          <div className="p-10 flex items-center outline-gray-300 rounded-tl-xl rounded-tr-xl  w-full h-[30px] outline-1">
            <h1 className="text-4xl font-medium">All Pastes</h1>
          </div>
          <div className="p-2 ">
            {/* card */}
            {filteredData.length > 0 &&
              filteredData.map((paste) => (
                <div
                  key={paste?._id}
                  className=" flex border-1 rounded-xl   border-gray-500 m-7.5 w-[95%] h-[160px] overflow-hidden">
                  {/* left */}
                  <div className="flex-2  p-5 pt-3 overflow-scroll ">
                    <h1 className="text-3xl font-medium uppercase">
                      {paste.title}
                    </h1>
                    <div className="mt-3">
                      <p className="">{paste.value}</p>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex-1  flex flex-col ">
                    <div className=" flex-1 mt-1 justify-end  flex items-end pr-4 gap-2">
                      <button
                        onClick={() =>
                          (window.location.href = `/?pasteId=${paste._id}`)
                        }
                        className="border hover:cursor-pointer border-neutral-400 bg-transparent px-2 py-2 hover:shadow-lg">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDelete(paste._id)}
                        className=" hover:cursor-pointer border-1 border-neutral-400 bg-transparent px-2 py-3 hover:shadow-lg"
                      />
                      <FontAwesomeIcon
                        icon={faShareNodes}
                        onClick={() => handleShare(paste._id)}
                        className=" hover:cursor-pointer border-1 border-neutral-400 bg-transparent px-2 py-3 hover:shadow-lg"
                      />
                      <button
                        onClick={() => navigate(`/pastes/${paste._id}`)}
                        className="border hover:cursor-pointer border-neutral-400 bg-transparent px-2 py-2 hover:shadow-lg">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <FontAwesomeIcon
                        icon={faClone}
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.value);
                          toast.success("copied successfully");
                        }}
                        className=" hover:cursor-pointer border-1 border-neutral-400 bg-transparent px-2 py-3 hover:shadow-lg"
                      />
                    </div>
                    <div className="flex-1 h-[20px]  flex items-baseline mt-1 justify-end">
                      <p className="mr-4">
                        {" "}
                        {new Date(paste.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className=" flex-1"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pastes;
