import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataForm from './components/DataForm';

interface UserData {
  name: string;
  description: string;
  age: number;
  birthdate: string;
  isActive: boolean;
  category: string;
}

function App() {
  const [savedData, setSavedData] = useState<UserData>({
    name: '',
    description: '',
    age: 0,
    birthdate: '',
    isActive: false,
    category: '',
  });

  const fields: Field<UserData>[] = [
    { name: 'name', label: 'Name', type: 'string' },
    { name: 'description', label: 'Description', type: 'longString' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'birthdate', label: 'Birth Date', type: 'date' },
    { name: 'isActive', label: 'Is Active', type: 'boolean' },
    { name: 'category', label: 'Category', type: 'enum', options: ['A', 'B', 'C'] },
  ];
  const handleFormSave = (data: UserData) => {
    setSavedData(data);
  };
  return (
    <DataForm
      onSave={handleFormSave}
      fields={fields}
      initialData={savedData}
    />
  )
}

export default App
