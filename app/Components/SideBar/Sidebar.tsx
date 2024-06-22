import React, { useRef, useEffect } from "react"
import LogoAndName from "../LogoAndName"
import { useGlobalContextProvider } from "@/app/contextApi"
import MenuSelection from "./MenuSelection"
import LogoutSection from "./LogoutSection"
function Sidebar() {

    const { openSideBarObject } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutsideClicked(event: MouseEvent) {
            if (!sideBarRef.current?.contains(event.target as Node)) {
                setOpenSideBar(false);
            }
        }
        document.addEventListener("click", handleOutsideClicked);
        return () => {
            document.removeEventListener("click", handleOutsideClicked);
        };
    }, [openSideBar])

    return (
        <div
            ref={sideBarRef}
            className={`${
                !openSideBar ? " max-xl:hidden " : "fixed shadow-lg"
            } flex-grow z-50 p-10 flex-col bg-white min-h-screen `}>
            <LogoAndName />
            <MenuSelection />
            <LogoutSection />
        </div>
    )
}

export default Sidebar;