import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { Home as HomeIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import CustomFooter from './CustomFooter';

import { renderField } from './renderField';

type DataType = 'string' | 'longString' | 'number' | 'date' | 'boolean' | 'enum';

interface Field<T> {
  name: keyof T;
  label: string;
  type: DataType;
  options?: string[];
}

interface FormProps<T> {
  onSave: (data: T) => void;
  fields: Field<T>[];
  initialData?: T;
  initialMode: 'view' | 'edit' | 'create';
}

const DataForm = <T,>({ onSave, fields, initialData = {} as T, initialMode }: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(initialMode);

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const footerButtons: ButtonInfo[] = [
    {
      label: 'Home',
      onClick: () => console.log('Home clicked'),
      icon: <HomeIcon />,
    },
    {
      label: 'Save',
      onClick: () => console.log('Save clicked'),
      icon: <SaveIcon />,
    },
    {
      label: 'Cancel',
      onClick: () => console.log('Close clicked'),
      icon: <CancelIcon />,
    },
  ];

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            {mode === 'view' ? 'View Data' : mode === 'edit' ? 'Edit Data' : 'Create Data'}
          </Typography>
          {mode === 'view' && (
            <Button color="inherit" onClick={() => setMode('edit')}>
              Edit
            </Button>
          )}
          {mode === 'edit' && (
            <Button color="inherit" onClick={() => setMode('view')}>
              View
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        {fields.length > 0 && fields.map(field => (
          <div key={field.name.toString()}>
            {renderField<UseData>({field, formData, mode, handleChange})}
          </div>
        ))}
      </div>
      {mode !== 'view' && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '100px'}}>
          <Button variant="contained" onClick={() => onSave(formData)}>
            Save
          </Button>
        </div>
      )}
      <CustomFooter buttons={footerButtons} />
    </>
  );
};

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  backgroundColor: '#f0f0f0',
  borderTop: '1px solid #ddd',
};

const buttonStyle: React.CSSProperties = {
  minWidth: '100px',
};

export default DataForm;
