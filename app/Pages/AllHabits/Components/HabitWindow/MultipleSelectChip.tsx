import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { defaultColor } from '@/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContextProvider } from '@/app/contextApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip({
    onChange,
}: {
    onChange: (selectedAreasItems: any) => void;
}) {
    const theme = useTheme();
    const { allAreasObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;

    const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
    const [selectedAreasItems, setSelectedAreasItems] = useState<any>([]);


    const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
        const {
            target: { value },
        } = event;
        setSelectedAreas(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const filteredAreas = allAreas.filter((area) => area.name !== "All");

    React.useEffect(() => {
        const selectedAreaObjects = selectedAreas.map((selectedArea) => {
            return allAreas.find((area) => area.name === selectedArea);
        });

        setSelectedAreasItems(selectedAreaObjects);
    }, [selectedAreas]);


    React.useEffect(() => {
        onChange(selectedAreasItems);
    }, [selectedAreasItems])

    //need to add validation to habit form

    return (
        <div>
            <FormControl
                sx={{
                    m: 1,
                    width: "100%",
                    "& .Mui-focused .MuiInputLabel-root": {
                        color: defaultColor.default
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: defaultColor.default,
                    },
                }}
            >
                <InputLabel
                    sx={{
                        "& .Mui-focused ": {
                            color: defaultColor.default
                        },
                    }}
                    id="demo-multiple-chip-label"
                >
                    Choose Your Area...
                </InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedAreas}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip" label="Choose your area..."
                            sx={{
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: defaultColor.default,
                                },
                            }}
                        />
                    }

                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {filteredAreas.map((area) => (
                        <MenuItem
                            key={area.id}
                            value={area.name}
                            style={getStyles(area.name, selectedAreas, theme)}
                        >
                            <FontAwesomeIcon
                                className="text-blue-500"
                                icon={area.icon}
                                style={{ marginRight: 8 }}
                            />
                            {area.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
