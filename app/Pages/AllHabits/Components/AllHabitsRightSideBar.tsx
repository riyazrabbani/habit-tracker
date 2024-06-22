import React from "react"

import { defaultColor } from "@/colors";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import UserProfile from "./RightSideBar/UserProfile"
import MainStatistics from "./RightSideBar/MainStatistics"
import Calendar from "./RightSideBar/Calendar"

function AllHabitsRightSideBar() {
    return <div className = " w-[30%] flex flex-col items-center bg-white m-5 rounded-lg p-2 ">
        <UserProfile />
        <MainStatistics />
        <Calendar />
    </div>
}

export default AllHabitsRightSideBar;