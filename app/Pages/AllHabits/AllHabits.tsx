import React from "react"
import AllHabitsTopbar from "./Components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./Components/AllHabitsRightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";
import HabitWindow from "./Components/HabitWindow";
import { Toaster } from "react-hot-toast"

function AllHabits() {
    return (
        <div className=" max-lg:flex-col w-full flex flex-row gap-0 relative ">
            <Toaster />
            <HabitWindow />
            <div className=" flex-col flex-grow m-3">
                <AllHabitsTopbar />
                <HabitsContainer />
                <HabitsCompleted />
            </div>

            <AllHabitsRightSideBar />
        </div>
    );
}

export default AllHabits;
