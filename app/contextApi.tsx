"use client"

import { ReactNode, createContext, useState, useContext, useEffect } from "react";

import { GlobalContextType } from "./Types/GlobalContextType";
import { menuItemType } from "./Types/MenuItemType";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import {
    faChartSimple,
    faLayerGroup,
    faList,
    faRectangleList,
    faSun,
    faMoon,
    faUsers,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeItem } from "./Types/DarkModeTypes";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import AllHabits from "./Pages/AllHabits/AllHabits";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { textToIcon } from "./Pages/AllHabits/Components/IconsWindow/IconData";
import { getDateString } from "./utils/allHabitsUtils/DateFunctions";

const GlobalContext = createContext<GlobalContextType>({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => { },
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => { },
    },
    darkModeObject: {
        isDarkMode: false,
        setDarkMode: () => { },
        darkModeItems: [],
        setDarkModeItems: () => { },
    },
    habitWindowObject: {
        openHabitWindow: false,
        setOpenHabitWindow: () => { },
    },
    allAreasObject: {
        allAreas: [],
        setAllAreas: () => { },
    },
    allHabitsObject: {
        allHabits: [],
        setAllHabits: () => { },
    },
    selectedCurrentDayObject: {
        selectedCurrentDate: "",
        setSelectedCurrentDate: () => { },
    },
    offsetDayObject: {
        offsetDay: 0,
        setOffsetDay: () => { }
    }
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);

    const [allHabits, setAllHabits] = useState<HabitType[]>([]);

    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: true },
        { id: 2, icon: faMoon, isSelected: false },

    ]);

    const [allAreas, setAllAreas] = useState<AreaType[]>([
        { id: 1, icon: faUsers, name: "All" },
        { id: 2, icon: faGraduationCap, name: "Study" },
        { id: 3, icon: faSun, name: "Exercise" },

    ]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
        getDateString(new Date())
    );
    const [offsetDay, setOffsetDay] = useState(0);

    //us based date
    useEffect(() => {
        function fetchData() {
            const allHabitsData = [
                {
                    _id: "",
                    name: "Thanks for using this!",
                    icon: textToIcon("faGlobe") as IconProp,
                    frequency: [{ type: "Daily", days: ["M"], number: 1 }],
                    areas: [],
                    completedDays: [{ _id: "1", date: "6/30/2024" }],
                },
            ];

            setTimeout(() => {
                setAllHabits(allHabitsData);
            }, 1000);
        }

        fetchData();
    }, []);

    //console.log(allHabits);

    return (
        <GlobalContext.Provider
            value={{
                menuItemsObject: { menuItems, setMenuItems },
                openSideBarObject: { openSideBar, setOpenSideBar },
                darkModeObject: {
                    isDarkMode,
                    setDarkMode,
                    darkModeItems,
                    setDarkModeItems,
                },
                habitWindowObject: {
                    openHabitWindow,
                    setOpenHabitWindow,
                },
                allAreasObject: {
                    allAreas,
                    setAllAreas,
                },
                allHabitsObject: {
                    allHabits,
                    setAllHabits,
                },
                selectedCurrentDayObject: {
                    selectedCurrentDate,
                    setSelectedCurrentDate,
                },
                offsetDayObject: {
                    offsetDay,
                    setOffsetDay,
                }
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContextProvider() {
    return useContext(GlobalContext);
}

export default GlobalContextProvider;