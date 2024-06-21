"use client";

import React from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Sidebar from "../Components/SideBar/Sidebar";

export default function Dashboard() {
    const { user } = useUser();
    return (
        <div className="flex">
            <Sidebar />
            <div>
                We here and whatnot
            </div>
            <SignOutButton>SignOut</SignOutButton>
        </div>
    )
}