import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
export default function OptionOnContainer() {


    return (
        <div className="flex flex-row gap-3">
            <div className="flex justify-center text-[#b2b9b9] cursor-pointer px-2 items-center text-xl">
                <FaPhone/>
            </div>
            <button  className="flex justify-center text-[#b2b9b9] cursor-pointer pr-4 items-center text-xl">
                <BsThreeDotsVertical/>
            </button>

        </div>
    )
};

