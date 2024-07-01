import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors"
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";

export default function HabitsContainerMiddle() {
    const { allHabitsObject, selectedCurrentDayObject, selectedAreaStringObject } = useGlobalContextProvider();
    const { allHabits } = allHabitsObject;
    const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const { selectedAreaString } = selectedAreaStringObject;

    useEffect(() => {
        const getTwoFirstDayLetter = getCurrentDayName(selectedCurrentDate).slice(
            0,
            2
        );

        let filteredHabitsByArea: HabitType[] = [];
        const filteredHabitsByFrequency = allHabits.filter((singleHabit) => {
            return singleHabit.frequency[0].days.some(
                (day) => day === getTwoFirstDayLetter
            );
        });

        if (selectedAreaString !== "All") {
            filteredHabitsByArea = filteredHabitsByFrequency.filter((habit) =>
                habit.areas.some((area) => area.name === selectedAreaString)
            );
        } else {
            filteredHabitsByArea = filteredHabitsByFrequency;
        }

        setAllFilteredHabits(filteredHabitsByArea);
    }, [selectedCurrentDate, allHabits, selectedAreaString]);

    return (
        <div className=" p-3">
            {allFilteredHabits.map((singleHabit, singleHabitIndex) => (
                <div key={singleHabitIndex}>
                    <HabitCard singleHabit={singleHabit} />
                </div>
            ))}

        </div>
    );


    function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
        const { darkModeObject } = useGlobalContextProvider();
        const { isDarkMode } = darkModeObject;

        return (
            <div className=" flex p-3 items-center justify-between ">
                <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    sx={{
                        color: defaultColor.default,
                        "&.Mui-checked": {
                            color: defaultColor.default,
                        },
                    }}
                />
                <div
                    style={{
                        backgroundColor: isDarkMode
                            ? darkModeColor.backgroundSlate
                            : defaultColor.backgroundSlate,
                    }}
                    className=" flex justify-between gap-2 w-full p-3 py-4 rounded-md "
                >
                    <div className=" w-full ">

                        <div className=" flex gap-2 justify-between ">
                            <div className=" flex gap-2 items-center">
                                <FontAwesomeIcon
                                    className=" p-3 rounded-full w-4 h-4 bg-customBlue text-white"
                                    height={20}
                                    width={20}
                                    icon={singleHabit.icon}
                                />
                                <span className="">{singleHabit.name}</span>
                            </div>
                        </div>

                        <div className=" flex gap-2 mt-3 ">
                            {singleHabit.areas.map((singleArea, index) => (
                                <div
                                    key={index}
                                    style={{
                                        color: isDarkMode
                                            ? darkModeColor.textColor
                                            : defaultColor.default,
                                        backgroundColor: isDarkMode
                                            ? defaultColor[50]
                                            : defaultColor[100],
                                    }}
                                    className=" p-1 text-[12px] rounded-md px-2"
                                >
                                    <span className="">{singleArea.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-10 flex items-center justify-center ">
                        <IconButton>
                            <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
}