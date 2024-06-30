"use client"

import { ReactNode, createContext, useState, useContext } from "react"

import { GlobalContextType } from "./Types/GlobalContextType"
import { menuItemType } from "./Types/MenuItemType"
import { faSlack } from "@fortawesome/free-brands-svg-icons"
import {
    faChartSimple,
    faLayerGroup,
    faList,
    faRectangleList,
    faSun,
    faMoon,
    faUsers,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons"
import { DarkModeItem } from "./Types/DarkModeTypes"
import { AreaType } from "./Types/GlobalTypes"

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
        setAllAreas: () => {},
    },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);

    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: true },
        { id: 2, icon: faMoon, isSelected: false },

    ]);

    const [allAreas, setAllAreas] = useState<AreaType[]>([
        {id: 1, icon: faUsers, name: "All"},
        {id: 2, icon: faGraduationCap, name: "Study"},
        {id: 3, icon: faSun, name: "Exercise"},

    ]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);

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