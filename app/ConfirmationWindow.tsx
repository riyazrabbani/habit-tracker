import React from "react";
import { useGlobalContextProvider } from "./contextApi";
import { darkModeColor, defaultColor } from "../colors";

export function ConfirmationWindow() {
    const { openConfirmationWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openConfirmationWindow, setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { isDarkMode } = darkModeObject;

    return (
        <div
            style={{
                left: "0",
                right: "0",
                marginLeft: "auto",
                marginRight: "auto",
                top: "30%",
                transform: "translateY(-50%)",
                color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor,
                backgroundColor: isDarkMode
                    ? darkModeColor.background
                    : defaultColor.background,
            }}
            className={`shadow-md rounded-md md:w-[450px] w-[310px] py-8 pt-10 p-4 z-50 flex flex-col gap-2 items-center ${openConfirmationWindow ? "fixed" : "hidden"
                }`}
        >
            <span className="font-bold text-xl">{`Are you sure?`}</span>
            <span className="text-center text-[13px] opacity-75">
                Are you sure you want to delete this item?
                <br />
                This action cannot be undone.
            </span>
            <div className="flex gap-2 mt-5">
                <button
                    onClick={() => setOpenConfirmationWindow(false)}
                    className=" border text-[13px] w-full px-10 p-3 rounded-md "
                >
                    Cancel
                </button>
                <button
                 
                    className={` w-full px-10 text-[13px] p-3 rounded-md bg-customBlue `}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}