import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Calendar() {
    return (
        <div className = "flex mx-4 flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl p-5 pt-7">
            <DateCalendar 
                sx = {{
                    "& .MuiPickersDay-root" : {
                        "&.Mui-selected": {
                            backgroundColor: "#0000FF",
                        },
                    },
                    "&.MuiPickersYear-yearButton.Mui-selected": {
                        backgroundColor: "#0000FF",
                    },
                }}
            />
        </div>
    );
}

export default Calendar;