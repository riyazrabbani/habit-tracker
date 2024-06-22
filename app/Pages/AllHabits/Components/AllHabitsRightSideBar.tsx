import React from "react"

import { defaultColor } from "@/colors";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import UserProfile from "./RightSideBar/UserProfile"
import MainStatistics from "./RightSideBar/MainStatistics"

function AllHabitsRightSideBar() {
    return <div className = " w-[30%] flex flex-col items-center bg-white ">
        <UserProfile />
        <MainStatistics />
    </div>
}

export default AllHabitsRightSideBar;