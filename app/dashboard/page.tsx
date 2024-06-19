"use client";

import React from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Dashboard() {
    const { user } = useUser();
    return (
        <div>
            hello, {user?.lastName} <SignOutButton>SignOut</SignOutButton>
        </div>
    )
}