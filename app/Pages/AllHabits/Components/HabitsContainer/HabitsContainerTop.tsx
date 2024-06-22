import React from "react";
import { faCode, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material"
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
export default function HabitsContainerTop() {
    return (
        <div className="p-3 flex justify-between items-center ">
            <div className="flex gap-4 items-center">
                <div>
                    <h2 className="font-bold text-lg">Saturday</h2>
                    <span className="font-light text-[12px]">22 June 2024</span>
                </div>

                <div className="flex gap-1 ml-4">
                    <div className="text-customBlue cursor-pointer">
                        <ArrowCircleLeftOutlinedIcon />
                    </div>
                    <div className="text-customBlue cursor-pointer">
                        <ArrowCircleRightOutlinedIcon />
                    </div>
                </div>

            </div>
            <button
                className="flex gap-2 items-center bg-customBlue p-3 text-white rounded-md text-sm"
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>New Habit</span>
            </button>
        </div>
    );
}