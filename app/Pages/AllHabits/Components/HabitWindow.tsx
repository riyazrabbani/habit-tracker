"use client";

import { useGlobalContextProvider } from "@/app/contextApi"
import { darkModeColor, defaultColor } from "@/colors"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import { faStar, faChevronDown, faClose, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useRef, useEffect, useState } from "react";
import IconsWindow from "./IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type FrequencyType = {
    type: string;
    days: string[];
}

type HabitType = {
    _id: string;
    name: string;
    icon: IconProp;
    frequency: FrequencyType[]
}

type RepeatOption = {
    name: string;
    isSelected: boolean;
}

type DayOption = {
    id: number,
    name: string,
    isSelected: boolean;
}

// const HeaderMemo = memo(Header);
// const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

function HabitWindow() {
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const [habitItem, setHabitItem] = useState<HabitType>({
        _id: "",
        name: "",
        icon: faChevronDown,
        frequency: [{ type: "Daily", days: ["M"] }],
    });
    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);

    const onUpdateHabitName = (inputText: string) => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.name = inputText;
        setHabitItem(copyHabitItem);
    };

    function changeRepeatOption(repeatOptions: RepeatOption[]) {
        const filterIsSelected = repeatOptions.filter(
            (singleOption) => singleOption.isSelected
        );

        const nameOfSelectedOption = filterIsSelected[0].name;

        const copyHabitsItem = { ...habitItem };

        copyHabitsItem.frequency[0].type = nameOfSelectedOption;

        setHabitItem(copyHabitsItem);
    }

    function changeDaysOption(allDays: DayOption[]) {
        const selectedDays = allDays.filter((singleDay) => singleDay.isSelected).map((day => day.name));

        const copyHabitsItem = {...habitItem};

        copyHabitsItem.frequency[0].days = selectedDays;

        setHabitItem(copyHabitsItem);
    }

    useEffect(() => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.icon = iconSelected;
        setHabitItem(copyHabitItem);
    }, [iconSelected]);

    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                color: isDarkMode ? darkModeColor.textColor : "black",
            }}
            className={` top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10
                rounded-md shadow-md ${openHabitWindow ? "absolute" : "hidden"}`}
        >
            <IconsWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
                setIconSelected={setIconSelected}
            />
            <Header />
            <InputNameAndIconButton
                onUpdateHabitName={onUpdateHabitName}
                habitName={habitItem.name}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
            />
            <Repeat onChangeOption={changeRepeatOption} onChangeDaysOption = {changeDaysOption} />
            <SaveButton habit={habitItem} />
        </div>
    )
}

export default HabitWindow;

function Header() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl">
                Add New Habit
            </span>
            <FontAwesomeIcon
                onClick={() => setOpenHabitWindow(false)}
                className=" text-gray-400 cursor-pointer"
                icon={faClose}
            />
        </div>
    )
}

function InputNameAndIconButton({
    onUpdateHabitName,
    habitName,
    setOpenIconWindow,
    iconSelected,
}: {
    onUpdateHabitName: (inputText: string) => void;
    habitName: string;
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
    iconSelected: IconProp;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;

    function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
        onUpdateHabitName(event.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        if (!openHabitWindow) {
            onUpdateHabitName("");
        }
    }, [openHabitWindow]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [iconSelected]);

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="opacity-80 font-semibold">Habit Name</span>
            <div
                className="flex gap-4 justify-between items-center">
                <input
                    style={{
                        backgroundColor: isDarkMode ? darkModeColor.background : "white",
                    }}
                    ref={inputRef}
                    value={habitName}
                    onChange={(event) => updateInputHabit(event)}
                    className={`border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]`}
                    placeholder="Type a name for the habit..."
                />

                <FontAwesomeIcon
                    onClick={() => setOpenIconWindow(true)}
                    className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-customBlue"
                    icon={iconSelected}
                    height={16}
                    width={20}
                />
            </div>
        </div>
    )
}

function Repeat({
    onChangeOption,
    onChangeDaysOption,
}: {
    onChangeOption: (repeatOptions: RepeatOption[]) => void;
    onChangeDaysOption: (allDays: DayOption[]) => void;
}) {

    const [repeatOptions, setRepeatOptions] = useState<RepeatOption[]>([
        { name: "Daily", isSelected: true },
        { name: "Weekly", isSelected: false },
    ]);

    const days: DayOption[] = [
        { id: 1, name: "M", isSelected: true },
        { id: 2, name: "T", isSelected: false },
        { id: 3, name: "W", isSelected: false },
        { id: 4, name: "T", isSelected: false },
        { id: 5, name: "F", isSelected: false },
        { id: 6, name: "S", isSelected: false },
        { id: 7, name: "S", isSelected: false }

    ];

    const [allDays, setAllDays] = useState<DayOption[]>(days);

    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    function changeOption(indexClicked: number) {
        const updateRepeatOptions = repeatOptions.map((singleOption, index) => {
            if (index === indexClicked) {
                return { ...singleOption, isSelected: true };
            }
            return { ...singleOption, isSelected: false }
        });
        setRepeatOptions(updateRepeatOptions);
        onChangeOption(updateRepeatOptions);
    }

    useEffect(() => {
        onChangeDaysOption(allDays);
    }, [allDays])

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="font-semibold text-[17px] ">Repeat</span>

            <div className="flex gap-4 mt-2 items-center">
                {repeatOptions.map((singleOption, index) => (
                    <button
                        key={index}
                        onClick={() => changeOption(index)}
                        style={{
                            color: !singleOption.isSelected
                                ? !isDarkMode
                                    ? defaultColor.default
                                    : darkModeColor.textColor : "",
                            backgroundColor: singleOption.isSelected
                                ? defaultColor.default
                                : !isDarkMode
                                    ? defaultColor[100]
                                    : defaultColor[50],
                        }}
                        className=" p-2 px-3 rounded-md text-white cursor-pointer "
                    >
                        {singleOption.name}
                    </button>
                ))}
            </div>
            <DailyOptions allDays={allDays} setAllDays={setAllDays} />
        </div>
    )
}

function DailyOptions({
    allDays,
    setAllDays,
}: {
    allDays: DayOption[];
    setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>;
}) {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    function selectedDays(singleDayIndex: number) {
        const selectedCount: number = allDays.filter(
            (singleDay) => singleDay.isSelected
        ).length;

        const updatedAllDays = allDays.map((singleDay, index) => {
            if (
                selectedCount === 1 &&
                singleDay.isSelected === true &&
                index === singleDayIndex
            ) {
                return singleDay;
            }

            return index === singleDayIndex
                ? { ...singleDay, isSelected: !singleDay.isSelected }
                : singleDay;
        });
        setAllDays(updatedAllDays);
    }

    return (
        <div className="mt-5 flex flex-col gap-4">
            <span className="font-medium opacity-85">On These Days</span>
            <div className="flex gap-3 w-full">
                {allDays.map((singleDay, singleDayIndex) => (
                    <span
                        onClick={() => selectedDays(singleDayIndex)}
                        style={{
                            color: !singleDay.isSelected
                                ? !isDarkMode
                                    ? defaultColor.default
                                    : darkModeColor.textColor : "",
                            backgroundColor: singleDay.isSelected
                                ? defaultColor.default
                                : !isDarkMode
                                    ? defaultColor[100]
                                    : defaultColor[50],
                        }}
                        key={singleDayIndex}
                        className={`p-2 px-3 w-11 text-center  rounded-md select-none cursor-pointer ${singleDay.isSelected ? "text-white" : "text-gray-400"
                            }`}
                    >
                        {singleDay.name}
                    </span>
                ))}
            </div>
        </div>
    )
}

function SaveButton({ habit }: { habit: HabitType }) {
    return (
        <div className="w-full flex justify-center mt-9">
            <button
                className="bg-customBlue p-4 w-[98%] rounded-md text-white"
            >
                Add a Habit
            </button>
        </div>
    )
}