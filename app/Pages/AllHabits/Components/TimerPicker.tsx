import { useGlobalContextProvider } from "@/app/contextApi";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeColor, defaultColor } from "@/colors";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function TimerPicker() {
    const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;

    const [timeValues, setTimeValues] = useState([
        { text: "11", isSelected: true },
        { text: "12", isSelected: false },
    ]);
    const [meridiem, setMeridiem] = useState([
        { text: "AM", isSelected: true },
        { text: "PM", isSelected: false },
    ]);

    function updateMeridiemFx(clickedIndex: number) {
        const updateMeridiem = meridiem.map((singleMeridiem, index) => {
            if (index === clickedIndex) {
                return { ...singleMeridiem, isSelected: true };
            }
            return { ...singleMeridiem, isSelected: false };
        });

        setMeridiem(updateMeridiem);
    }

    function updateTimeValues(clickedIndex: number) {
        const updateTimeValues = timeValues.map((singleTimeValue, index) => {
            if (index === clickedIndex) {
                return { ...singleTimeValue, isSelected: true };
            }
            return { ...singleTimeValue, isSelected: false };
        });
        setTimeValues(updateTimeValues);
    }

    return (
        <div
            className={`bg-white w-[413px] top-[89px] left-1/2
                transform -translate-x-1/2 z-50 p-7 rounded-md shadow-md ${openTimePickerWindow ? "absolute" : "hidden"
                }`}
        >
            <span
                className="font-bold flex justify-between items-center"
            >
                <span>
                    Select Time
                </span>
                <FontAwesomeIcon
                    height={20}
                    width={20}
                    className={`top-8 right-4 text-gray-300 cursor-pointer`}
                    onClick={() => setOpenTimePickerWindow(false)}
                    icon={faClose}
                />
            </span>
            <div className=" flex gap-8 mt-9">
                <div className="flex gap-2 justify-center items-center">
                    <input
                        value={timeValues[0].text}
                        onClick={() => {
                            updateTimeValues(0);
                        }}
                        style={{
                            backgroundColor: timeValues[0].isSelected ?
                                defaultColor[100]
                                : defaultColor.backgroundSlate,
                            color: timeValues[0].isSelected
                                ? defaultColor.default
                                : defaultColor.textColorGray,
                        }}
                        className=" w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
                    />
                    <span className="text-2x font-bold">:</span>
                    <input
                    value = {timeValues[1].text}
                    onClick = {() => {
                        updateTimeValues[1];
                    }}
                        style={{
                            backgroundColor: timeValues[1].isSelected
                            ? defaultColor[100]
                            : defaultColor.backgroundSlate,
                            color: defaultColor.textColorGray,
                        }}
                        className=" w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {meridiem.map((singleMeridiem, index) => (
                        <span
                            key={index}
                            onClick={() => updateMeridiemFx(index)}
                            style={{
                                backgroundColor: singleMeridiem.isSelected
                                    ? defaultColor[100]
                                    : defaultColor.backgroundSlate,
                                color: singleMeridiem.isSelected
                                    ? defaultColor.default
                                    : defaultColor.textColorGray,
                            }}
                            className=" text-xl flex justify-center items-center w-[104px] h-[45px] rounded-md cursor-pointer select-none"
                        >
                            {singleMeridiem.text}
                        </span>
                    ))}
                </div>
            </div>
            <button className="bg-customBlue p-3 text-white w-full rounded-md mt-10 mb-1">
                Save
            </button>
        </div>
    )
}

export default TimerPicker;