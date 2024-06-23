"use client";

import React, { useEffect, useState } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Sidebar from "../Components/SideBar/Sidebar";
import { useGlobalContextProvider } from "../contextApi";
import { menuItemType } from "../Types/MenuItemType";
import Areas from "../Pages/Areas/Areas";
import AllHabits from "../Pages/AllHabits/AllHabits";
import Statistics from "../Pages/Statistics/Statistics";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { darkModeColor, defaultColor } from "@/colors";
import HabitWindow from "../Pages/AllHabits/Components/HabitWindow";

function Dashboard() {
    const { menuItemsObject, darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { menuItems } = menuItemsObject;
    const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);
    let selectComponent = null;

    useEffect(() => {
        menuItems.map((singleItem) => {
            if (singleItem.isSelected) {
                setSelectedMenu(singleItem);
            }
        });
    }, [menuItems]);

    switch (selectedMenu?.name) {
        case "All Habits":
            selectComponent = <AllHabits />
            break;
        case "Statistics":
            selectComponent = <Statistics />
            break;
        case "Areas":
            selectComponent = <Areas />
            break;
        case "All Areas":
            break;
    }

    const { user } = useUser();
    return (
        <div
            style={{
                backgroundColor: isDarkMode 
                ? darkModeColor.backgroundSlate 
                : defaultColor.backgroundSlate,
            }}
            className=" flex ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Sidebar />
                {selectComponent}
                <BlackSoftLayer />
            </LocalizationProvider>
        </div>
    )
}

export default Dashboard;

function BlackSoftLayer() {
    const { openSideBarObject, habitWindowObject } = useGlobalContextProvider();
    const { openSideBar } = openSideBarObject;
    const { openHabitWindow } = habitWindowObject;


    return (
        <div
            className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-40 ${openSideBar || openHabitWindow ? "fixed" : "hidden"
                }`}
        ></div>
    );
}