import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { languageOptions } from '../helpers/languages';
import './LanguageSelector.css';

const LanguageSelector = ({ value, onChange }) => {
  const options = languageOptions.map(lang => ({
    value: lang.id,
    label: lang.name
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2d2d2d',
      borderColor: '#3e3e3e',
      width: '180px', // Adjusted width
      minHeight: '38px', // Ensure consistent height with other components
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
  };

  return (
    <div className="language-selector-container">
      <FontAwesomeIcon icon={faCode} className="language-icon" />
      <Select
        value={value ? { value: value.id, label: value.name } : null}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        options={options}
        className="language-dropdown"
        classNamePrefix="react-select"
        placeholder="Select Language"
        styles={customStyles}
      />
    </div>
  );
};

export default LanguageSelector;
