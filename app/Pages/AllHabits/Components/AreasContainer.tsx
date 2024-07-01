import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType } from "@/app/Types/GlobalTypes";

export default function AreasContainer() {
    const { allAreasObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;

    const [selectedAreas, setSelectedAreas] = useState<{
        [key: number]: boolean;
    }>({});

    const toggleSelection = (index: number) => {
        const selectedAreasCopy = { ...selectedAreas };

        Object.keys(selectedAreasCopy).forEach((key) => {
            selectedAreasCopy[parseInt(key)] = false;
        });

        selectedAreasCopy[index] = true;

        setSelectedAreas(selectedAreasCopy);
    };

    useEffect(() => {
        const initialSelectedArea: { [key: number]: boolean } = {};

        allAreas.forEach((_, index) => {
            initialSelectedArea[index] = false;
        });

        initialSelectedArea[0] = true;

        setSelectedAreas(initialSelectedArea);
    }, [allAreas]);

    return (
        <div className="p-5 bg-white rounded-md flex gap-3 items-center transition-all mt-5 text-sm">
            {allAreas.map((area: AreaType, index) => (
                <div onClick={() => toggleSelection(index)} key={index}>
                    <SingleAreaContainer
                        singleArea={area}
                        isSelected={selectedAreas[index]}
                    />
                </div>
            ))}
        </div>
    );

    function SingleAreaContainer({
        singleArea,
        isSelected,
    }: {
        singleArea: AreaType;
        isSelected: boolean;
    }) {

        return (
            <div
                className = {` p-2 px-3 rounded-md flex gap-1 items-center cursor-pointer ${
                    isSelected ? "bg-customBlue text-white" : "text-gray-400"
                }`}
            >
                <FontAwesomeIcon icon = {singleArea.icon} />
                <span>{singleArea.name}</span>
            </div>
        );
    }
};

