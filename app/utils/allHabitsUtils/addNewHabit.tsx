import { HabitType } from "@/app/Types/GlobalTypes";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast"

export default function addNewHabit({
    allHabits,
    setAllHabits,
    newHabit,
}: {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    newHabit: HabitType;
}) {
    try {
        setAllHabits([...allHabits, newHabit]);
        toast.success("Habit added successfully!");
    } catch (error) {
        toast.error("Something went wrong!...")
    }
}
