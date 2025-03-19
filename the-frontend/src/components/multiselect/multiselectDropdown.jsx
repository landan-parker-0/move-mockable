import React, { useState, useRef, useEffect } from "react";
import { css } from "@linaria/core";
import { primaryContentTextColor } from "../../utilities/theme";

// Styles (unchanged)
const dropdownContainer = css`
    display: inline-block;
    min-width: 130px;
    max-width: 200px;
    white-space: nowrap;
    border-width: 1px;
    padding: 4px;
    border-style: solid;
    border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    background-color: white;
`;

const dropdownButton = css`
    width: 100%;
    padding: 4px;
    line-height: 1.4;
    border: 2px solid #565c65;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
    overflow-y: hidden;
    height: min-content;
    position: relative;
    display: contents;
    margin-bottom: -1rem;
`;

const dropdownList = css`
  position: absolute;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const dropdownItem = css`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const checkbox = css`
  width: 14px;
  height: 14px;
`;

const selectedItemsContainer = css`
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    gap: 4px;
`;

const selectText = css`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  color: ${primaryContentTextColor} !important;
  background-color: unset !important;
  border: 0px solid transparent;
`;

const selectedItem = css`
    background-color: #007bff;
    color: white;
    border-radius: 12px;
    padding: 4px 8px;
    font-size: 0.85rem;
    cursor: pointer; /* Make it clear that it's clickable */
`;

const clearButton = css`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 0.85rem;
`;

const MultiSelectDropdown = ({ options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside or losing focus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selection changes
  const handleSelectionChange = (value) => {
    let updatedSelection;
    if (selectedValues.includes(value)) {
      updatedSelection = selectedValues.filter((item) => item !== value);
    } else {
      updatedSelection = [...selectedValues, value];
    }
    onChange(updatedSelection.length ? updatedSelection : null);
  };

  return (
    <div
      className={dropdownContainer}
      ref={dropdownRef}
      tabIndex={0}
      onBlur={(e) => {
        // Ensure dropdown only closes if focus moves outside
        if (!dropdownRef.current.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className={dropdownButton}
        ref={buttonRef}
        onClick={() => {
          setIsOpen((prev) => !prev); // Toggle dropdown on click
          buttonRef.current.focus();
        }}
      >
        {selectedValues.length > 0 ? (
          <div className={selectedItemsContainer} onClick={() => setIsOpen((prev) => !prev)}>
            {selectedValues.map((val) => (
              <span key={val} className={selectedItem} onClick={() => setIsOpen((prev) => !prev)}>
                {val}
              </span>
            ))}
          </div>
        ) : (
          <div className={selectedItemsContainer}>
            <span className={[selectedItem, selectText].join(" ")}>Select...</span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className={dropdownList}>
          {options.map((option) => (
            <div
              key={option}
              className={dropdownItem}
              onClick={() => handleSelectionChange(option)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                className={checkbox}
                readOnly
              />
              {option}
            </div>
          ))}
          <button className={clearButton} onClick={() => onChange([])}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
