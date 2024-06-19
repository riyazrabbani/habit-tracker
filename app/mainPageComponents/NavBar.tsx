import React from "react";
import AppIcon from "../SVG_Icons/AppIcon"

export default function NavBar() {
    const defaultColor = "blue";
    const backgroundColorObject = { backgroundColor: defaultColor };
    return (
        <header>
            <div className=" p-8 px-20 ">
                <div className="sm:flex sm:items-center sm:justify-between ">
                    <div className="text-center sm:text-left mb-7 sm:mb-0">

                        <div className="flex gap-2 items-center sm:justify-start justify-center">
                            <span className="text-2xl font-light flex items-center gap-2">
                                <div style={backgroundColorObject} className=" p-2 rounded-md">
                                    <AppIcon color="#ffffff" height="34" width="34" />
                                </div>
                                {/*name here */}
                                <span
                                    style={{ color: "blue" }}
                                    className="font-bold text-mainColor"
                                >
                                    Habit
                                </span>
                                <span className="font-light">Tracker</span>
                            </span>
                        </div>
                    </div>
                    {/*Sign In / Sign Up here */}
                    <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                        <button
                            style={backgroundColorObject}
                            className={`block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-white transition focus:outline-none`}
                            type="button"
                        >
                            Sign In
                        </button>
                        <button
                            className={`block sm:w-32 w-full border rounded-lg px-9 py-3 text-sm font-medium transition
                        focus:outline-none hover:bg-customBlue hover:text-white border-customBlue text-customBlue`}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}