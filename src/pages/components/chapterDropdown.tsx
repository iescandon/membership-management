import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ChapterDropdownProps {
  callbackFn: (arg: string) => void;
}

export default function ChapterDropdown( { callbackFn }: ChapterDropdownProps ) {
  const [chapter, setChapter] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setChapter(event.target.value);
    callbackFn(event.target.value)
  };

  return (
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
  );
}
