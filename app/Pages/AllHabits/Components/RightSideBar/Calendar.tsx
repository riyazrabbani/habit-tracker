import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
function Calendar() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    return (
        <div
            style={{
                backgroundColor: isDarkMode
                    ? darkModeColor.backgroundSlate
                    : defaultColor.backgroundSlate,
            }}
            className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl p-5 pt-7">
            <DateCalendar
                sx={{
                    "& .MuiPickersDay-root": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected": {
                            backgroundColor: defaultColor.default,
                            color: "white"
                        },
                    },
                    "& .MuiPickersYear-yearButton": {
                        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        "&.Mui-selected": {
                            backgroundColor: defaultColor.default,
                            color: "white"
                        },
                    },
                }}
            />
        </div>
    );
}

export default Calendar;