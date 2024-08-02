import React from 'react';
import { TextField, Typography, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

type DataType = 'string' | 'longString' | 'number' | 'date' | 'boolean' | 'enum';

interface Field<T> {
  name: keyof T;
  label: string;
  type: DataType;
  options?: string[];
}

interface RenderFieldProps<T> {
  field: Field<T>;
  formData: T;
  mode: 'view' | 'edit' | 'create';
  handleChange: <K extends keyof T>(name: K, value: T[K]) => void;
}

export function renderField<T>({ field, formData, mode, handleChange }: RenderFieldProps<T>) {
  const commonProps = {
    label: field.label,
    value: formData[field.name] as string | number | boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) =>
      handleChange(field.name, e.target.value as T[keyof T]),
    fullWidth: true,
    margin: "normal" as const,
    InputLabelProps: {
      shrink: true,
    },
  };

  switch (field.type) {
    case 'string':
    case 'longString':
      return mode === 'view' ? (
        <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
      ) : (
        <TextField
          {...commonProps}
          multiline={field.type === 'longString'}
          rows={field.type === 'longString' ? 4 : 1}
          disabled={mode === 'view'}
        />
      );
    case 'number':
      return mode === 'view' ? (
        <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
      ) : (
        <TextField
          {...commonProps}
          type="number"
          disabled={mode === 'view'}
        />
      );
    case 'date':
      return mode === 'view' ? (
        <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
      ) : (
        <TextField
          {...commonProps}
          type="date"
          disabled={mode === 'view'}
        />
      );
    case 'boolean':
      return mode === 'view' ? (
        <Typography key={field.name.toString()}>{field.label}: {formData[field.name] ? 'Yes' : 'No'}</Typography>
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              checked={formData[field.name] as boolean}
              onChange={(e) => handleChange(field.name, e.target.checked as T[keyof T])}
              disabled={mode === 'view'}
            />
          }
          label={field.label}
        />
      );
    case 'enum':
      return mode === 'view' ? (
        <Typography key={field.name.toString()}>{field.label}: {formData[field.name]}</Typography>
      ) : (
        <FormControl fullWidth margin="normal">
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={formData[field.name] as string}
            onChange={(e) => handleChange(field.name, e.target.value as T[keyof T])}
            disabled={mode === 'view'}
          >
            {field.options?.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return null;
  }
}
