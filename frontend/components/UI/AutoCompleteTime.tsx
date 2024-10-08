import { Dispatch, SetStateAction, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export function AutoCompleteTime ({
  label,
  options,
  defaultValue,
  setValue,
  value,
}: {
  label: string;
  options: string[];
  defaultValue: string;
  setValue: Dispatch<SetStateAction<string>>;
  value?: string | null;
}) {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Autocomplete
        value={value ? value : defaultValue}
        onChange={(event: any, newValue: string | null) => {
          var newTime = newValue ? newValue : defaultValue;
          setValue(newTime);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  );
}