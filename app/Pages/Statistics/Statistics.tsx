import React from "react";
import StatisticsTopBar from "../Statistics/Components/StatisticsTopBar";
import StatisticsBoard from "./Components/StatisticsBoard";
export default function Statistics() {
    return (
        <div className="w-full h-screen p-3">
            <StatisticsTopBar />
            <StatisticsBoard />
        </div>
    )
}