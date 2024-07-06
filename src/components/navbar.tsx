import { Select, SelectChangeEvent, FormControl, MenuItem, InputLabel, Box } from '@mui/material';
import { useState } from 'react';

interface NavbarProps {
    callbackFn: (arg: string) => void;
}

export function Navbar( { callbackFn }: NavbarProps ) {
    const [chapter, setChapter] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setChapter(event.target.value);
        callbackFn(event.target.value)
    };

    return (
        <div className="w-full flex items-center py-3 px-6 bg-[#546490]">
            <img src="/images/logo.png" className="h-14 pr-2" alt="LIT logo" />
            <Box sx={{ minWidth: 160 }}>
                <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ color: "white" }}>Select Chapter</InputLabel>
                    <Select
                    value={chapter}
                    label="Select Chapter"
                    onChange={handleChange}
                    sx={{ color: "white" }}
                    >
                    <MenuItem value={'atx'}>Austin</MenuItem>
                    <MenuItem value={'dfw'}>Dallas/Fort Worth</MenuItem>
                    <MenuItem value={'htx'}>Houston</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}
