"use client"

import { ReactNode, createContext, useState, useContext } from "react"

import { GlobalContextType } from "./Types/GlobalContextType"
import { menuItemType } from "./Types/MenuItemType"
import { faSlack } from "@fortawesome/free-brands-svg-icons"
import {
    faChartSimple,
    faLayerGroup,
    faList,
    faRectangleList
} from "@fortawesome/free-solid-svg-icons"
import { icon } from "@fortawesome/fontawesome-svg-core"

const GlobalContext = createContext<GlobalContextType>({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => {},
    },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);

    return (
        <GlobalContext.Provider
            value={{ menuItemsObject: { menuItems, setMenuItems } }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContextProvider() {
    return useContext(GlobalContext);
}

export default GlobalContextProvider;