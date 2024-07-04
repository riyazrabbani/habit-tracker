"use client"

import { ReactNode, createContext, useState, useContext, useEffect } from "react";

import { GlobalContextType } from "./Types/GlobalContextType";
import { menuItemType } from "./Types/MenuItemType";
import { faSlack, faUpwork } from "@fortawesome/free-brands-svg-icons";
import {
    faBorderAll,
    faBriefcase,
    faCode,
    faGraduationCap,
    faSortAmountDesc,
    faUsers,
} from "@fortawesome/free-solid-svg-icons"
import {
    faChartSimple,
    faLayerGroup,
    faList,
    faRectangleList,
    faSun,
    faMoon,
    faDumbbell
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeItem } from "./Types/DarkModeTypes";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import AllHabits from "./Pages/AllHabits/AllHabits";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { textToIcon } from "./Pages/AllHabits/Components/IconsWindow/IconData";
import { getDateString } from "./utils/allHabitsUtils/DateFunctions";
const { v4: uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from "uuid";

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
    },
    selectedAreaStringObject: {
        selectedAreaString: "",
        setSelectedAreaString: () => {},
    },
    allFilteredHabitsObject: {
        allFilteredHabits: [],
        setAllFilteredHabits: () => {},
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
        { _id: uuidv4(), icon: faBorderAll, name: "All" },
        { _id: uuidv4(), icon: faGraduationCap, name: "Study" },
        { _id: uuidv4(), icon: faDumbbell, name: "Exercise" },
        { _id: uuidv4(), icon: faBorderAll, name: "Work"},
    ]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
        getDateString(new Date())
    );
    const [offsetDay, setOffsetDay] = useState(0);
    const [selectedAreaString, setSelectedAreaString] = useState<string>("All");
    const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);

    //us based date
    useEffect(() => {
        function fetchData() {
            const allHabitsData: HabitType[] = [
                {
                    _id: uuidv4(),
                    name: "Habit 1",
                    icon: textToIcon("faTools") as IconProp,
                    frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
                    areas: [
                        { _id: uuidv4(), icon: faGraduationCap, name: "Study"},
                        { _id: uuidv4(), icon: faDumbbell, name: "Exercise"},

                    ],
                    completedDays: [{_id: uuidv4(), date: "03/06/2024"}],
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
                },
                selectedAreaStringObject: {
                    selectedAreaString,
                    setSelectedAreaString,
                },
                allFilteredHabitsObject: {
                    allFilteredHabits,
                    setAllFilteredHabits,
                },
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