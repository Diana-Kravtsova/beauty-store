import React from 'react';
import { InputAdornment, TextField, TextFieldProps, TextFieldPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFieldProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    TextFieldPropsColorOverrides
  >;
  size?: 'small' | 'medium';
  sx?: TextFieldProps['sx'];
  onSearch?: (searchTerm: string) => void;
}

export const Search = ({
  value = '',
  onChange,
  label,
  color = 'secondary',
  size = 'medium',
  sx,
  onSearch,
  ...props
}: SearchFieldProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <TextField
      fullWidth={true}
      label={label}
      type={'search'}
      color={color}
      variant={'outlined'}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      size={size}
      sx={sx}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};
