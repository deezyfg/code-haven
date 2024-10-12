import React from 'react';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import monacoThemes from "monaco-themes/themes/themelist";
import './ThemeDropdown.css';

const ThemeDropdown = ({ theme, handleThemeChange, defaultTheme }) => {
  const themeOptions = [
    { label: 'Dark Theme', value: 'vs-dark' },
    { label: 'Light', value: 'light' },
    ...Object.entries(monacoThemes).map(([themeId, themeName]) => ({
      label: themeName,
      value: themeId,
      key: themeId,
    }))
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2d2d2d',
      borderColor: '#3e3e3e',
      width: '180px',
      minHeight: '38px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4a4a4a' : '#2d2d2d',
      color: 'white',
      '&:hover': {
        backgroundColor: '#3e3e3e',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2d2d2d',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  const onChange = (selectedOption) => {
    if (handleThemeChange && selectedOption && selectedOption.value) {
      handleThemeChange(selectedOption);
    }
  };

  const getCurrentTheme = () => {
    if (theme === defaultTheme) {
      return themeOptions.find(option => option.value === defaultTheme);
    }
    return themeOptions.find(option => option.value === theme) || null;
  };

  return (
    <div className="theme-dropdown-container">
      <FontAwesomeIcon icon={faPalette} className="theme-icon" />
      <Select
        className='theme-dropdown'
        classNamePrefix="react-select"
        placeholder={`Select Theme`}
        options={themeOptions}
        value={getCurrentTheme()}
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
};

export default ThemeDropdown;
