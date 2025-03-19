import React, { useState } from "react";
import { css } from "@linaria/core";
import { mockData } from "./mockData";
import { itemScheme } from "../../utilities/data/itemScheme";
import {
  primaryContentTextColor,
  tableHeadingTextColor,
} from "../../utilities/theme";
import { elements } from "../elements/controls";
import { formatDate } from "../../utilities/transforms";

// Schema definition
const displayTableSchema = Object.fromEntries(
  Object.entries({
    [itemScheme.customerName]: "Customer Name",
    [itemScheme.specId]: "Spec ID",
    [itemScheme.itemEntryCode]: "Item Entry Code",
    [itemScheme.status]: "Status",
    [itemScheme.initiatedAt]: "Initiated At",
    [itemScheme.submittedAt]: "Submitted At",
    [itemScheme.group]: "Group",
    [itemScheme.originCode]: "Origin Code",
    [itemScheme.originLocation]: "Origin Location",
    [itemScheme.assignedUser]: "Assigned User",
  }).map(([accessor, content]) => [accessor, { accessor, content }])
);

const matchFormatter = ((accessor, value)=>{
  switch(accessor){
    case itemScheme.initiatedAt:
    case itemScheme.submittedAt:
      return formatDate(value)
    default:
      return value
  }
 })

const styleValues = {
  headerWeight: "700",
  fontSize: "1rem",
  titleColor: "#1b1b1b",
};

// Encapsulated CSS styles
const container = css`
  color: ${styleValues.titleColor};
  padding: 16px;
  cursor: pointer;
`;

const title = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const searchInput = css`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: -webkit-fill-available;
`;

const tableWrapper = css`
  overflow-x: auto;
`;

const tableBackground = "white";

const table = css`
  background-color: ${tableBackground};
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: break-spaces;
  font-size: ${styleValues.fontSize};
`;

const headerBackgroundColor = "white";
const tableHeader = css`
  color: ${tableHeadingTextColor};
  background-color: ${headerBackgroundColor};
  font-weight: ${styleValues.headerWeight};
`;

const tableHeaderCell = css`
  padding: 8px;
  background-color: inherit;
  color: inherit !important;
`;

const tableRow = css`
  color: ${primaryContentTextColor};
  border-bottom: 1px solid #ccc;
`;

const dataRow = css`
  &:focus{
    background: red;
  }
`;

const tableCell = css`
  padding: 0.8rem 0.533rem;
  color: inherit !important;
`;
const tableTitle = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const filterInput = css`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const filterRow = css`
  background-color: #dfe1e2;
`

const filterTagStyles = css`
  width: -webkit-fill-available;
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  `

const filterTag = css`
  display: flex;
  white-space: break-word;
  flex-direction: row;
  flex-shrink: 0;
  border-radius:0.6rem;
  background-color: #efefef;
  gap: 1rem;
  border: 1px solid black;
  & > *: nth-child(1){
    padding: 6px 1rem 6px 6px;
  }
  & > *:nth-child(2){
      font-weight: bold;
      font-size: 1.2rem;
      right: 1.51rem;
      margin-right: -1.57rem;
      top: -1px;
      aspect-ratio: 1;
      height: 1rem;
      position: relative;
      align-self: start;  
      display: grid;
      justify-content: center;
      align-content: center;
      padding: 3px;
      border-radius: 1rem;
      color: transparent;
background: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E %3Ccircle cx='12' cy='12' r='11' fill='%23efefef' stroke='black' stroke-width='1'/%3E %3Cline x1='8' y1='8' x2='16' y2='16' stroke='black' stroke-width='2'/%3E %3Cline x1='8' y1='16' x2='16' y2='8' stroke='black' stroke-width='2'/%3E %3C/svg%3E") 
    no-repeat center/contain;

    box-shadow: 0px 0px 1px 2px rgba(255, 255, 255, 0);
    border-radius: 50%;
    transition: box-shadow 0.2s;
  }

  & > *:nth-child(2):hover {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.50);
  }
`

const resetFilterTag = css`
  display: flex;
  white-space: break-word;
  flex-direction: row;
  flex-shrink: 0;
  border-radius:0.6rem;
  background-color: #fff;
  gap: 1rem;
  border: 1px solid black;
  padding: 6px 1rem 6px 6px;
`

const headerLimitFn = (cell, idx) => {
  const isAssignedUserField = cell.accessor === itemScheme.assignedUser || cell === itemScheme.assignedUser
  return idx < 7 || isAssignedUserField};

// Component Definition
const DisplayQueue = () => {
  const [filteredData, setFilteredData] = useState(mockData);
  const [filters, setFilters] = useState({});
  const dataQueueElementId = "dataQueueElement"
  
 // Function to update filters based on column input or tag removal
const updateFilters = (columnKey, value) => {
  setFilters((prevFilters) => {
    const newFilters = { ...prevFilters };

    // Remove filter if value is empty, otherwise update it
    if (!value) {
      delete newFilters[columnKey];
    } else {
      newFilters[columnKey] = value;
    }

    // Apply updated filtering
    const filtered = mockData.filter((row) =>
      Object.keys(newFilters).every((key) =>
        row[key]?.toString().toLowerCase().includes(newFilters[key])
      )
    );

    setFilteredData(filtered);
    return newFilters;
  });
};

// Handle input change in filter row
const handleColumnFilterChange = (e, columnKey) => {
  updateFilters(columnKey, e.target.value.toLowerCase());
};

// Remove a filter when clicking a tag
const removeFilter = (columnKey) => {
  updateFilters(columnKey, ""); // Pass empty value as if it were an event value
};

// Generate filter tags based on active filters
const filterTags = Object.entries(filters).map(([columnKey,]) => (
  <span key={columnKey} className={filterTag} >
    <div>{displayTableSchema[columnKey]?.content || columnKey}</div><div onClick={() => removeFilter(columnKey)}>✕</div>
  </span>
));

  
  
  // Top-level mapping for header cells
  const headerCells = Object.values(displayTableSchema).filter(headerLimitFn).map(
    ({ accessor, content }) => (
      <th key={accessor} className={tableHeaderCell}>
        {content}
      </th>
    )
  );

  // Top-level mapping for rows and cells
  const dataRows = filteredData.map((row, rowIndex) => {
    const cells = Object.keys(displayTableSchema).filter(headerLimitFn).map((key) => {
     const content = matchFormatter(key, row[key])
     return (<td key={key} className={tableCell}>
        {content}
      </td>)
    });
    return (
      <tr  key={rowIndex} tabIndex={0} className={[tableRow,dataRow].join(' ')}>
        {cells}
      </tr>
    );
  });

  const filterControls = Object.keys(displayTableSchema).filter(headerLimitFn).map((key) => (
    <td key={key} className={tableCell}>
      {elements.input({
        type: "text",
        value: filters[key] || "",
        onChange: (e) => handleColumnFilterChange(e, key),
        className: filterInput,
      })}
    </td>
  ));

  const theFilters = () => {
    if (filterTags.length === 0) return <></>;
  
    return (
      <div className={filterTagStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div>Filters:</div>
          <span className={resetFilterTag} onClick={() => setFilters({})}>
            Reset
          </span>
        </div>
        {filterTags}
      </div>
    );
  };
  

  return (
    <div className={container}>
      <h1 className={title}>Data Queue</h1>
      <h2 className={tableTitle}>Total Items ({filteredData.length})</h2>
      {theFilters()}
      <div className={tableWrapper}>
        <table id={dataQueueElementId} className={table}>
          <thead className={tableHeader}>
            <tr>{headerCells}</tr>
            <tr className={filterRow}>{filterControls}</tr>
          </thead>
          <tbody>{dataRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayQueue;
