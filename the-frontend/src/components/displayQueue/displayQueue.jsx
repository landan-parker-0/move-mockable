import React, { useState } from "react";
import { css } from "@linaria/core";
import { mockData } from "./mockData";
import { itemScheme } from "../../utilities/data/itemScheme";
import { primaryContentTextColor, tableHeadingTextColor } from "../../utilities/theme";

// Schema definition
const displayTableSchema = Object.fromEntries(
  Object.entries({
    [itemScheme.customerName]: "Customer Name",
    [itemScheme.specId]: "Spec ID",
    [itemScheme.itemEntryCode]: "Item Entry Code",
    [itemScheme.status]: "Status",
    [itemScheme.submittedAt]: "Submitted At",
    [itemScheme.group]: "Group",
    [itemScheme.originCode]: "Origin Code",
    [itemScheme.originLocation]: "Origin Location",
    [itemScheme.assignedUser]: "Assigned User",
  }).map(([accessor, content]) => [accessor, { accessor, content }])
);

const styleValues = {
    headerWeight: '700',
    fontSize: '1rem',
    titleColor: '1b1b1b',
}

// Encapsulated CSS styles
const container = css`
color: ${styleValues.titleColor}
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

const headerBackgroundColor = 'white'
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
// Component Definition
const DisplayQueue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(mockData);
  const [filters, setFilters] = useState({});

  // Handle column-specific filtering
  const handleColumnFilterChange = (e, columnKey) => {
    const value = e.target.value.toLowerCase();
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: value,
    }));
  
    const filtered = mockData.filter((row) =>
      Object.keys(filters).every((key) =>
        row[key].toString().toLowerCase().includes(filters[key] || "")
      )
    );
  
    setFilteredData(filtered);
  };
  
  // Handle search filtering
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredData(mockData);
      return;
    }

    const filtered = mockData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
  };

  // Top-level mapping for header cells
  const headerCells = Object.values(displayTableSchema).map(
    ({ accessor, content }) => (
      <th key={accessor} className={tableHeaderCell}>
        {content}
      </th>
    )
  );

  // Top-level mapping for rows and cells
  const dataRows = filteredData.map((row, rowIndex) => {
    const cells = Object.keys(displayTableSchema).map((key) => (
      <td key={key} className={tableCell}>
        {row[key]}
      </td>
    ));
    return (
      <tr key={rowIndex} className={tableRow}>
        {cells}
      </tr>
    );
  });

  const filterControls = Object.keys(displayTableSchema).map((key) => (
    <td key={key} className={tableCell}>
      <input
        type="text"
        placeholder="Filter..."
        value={filters[key] || ""}
        onChange={(e) => handleColumnFilterChange(e, key)}
        className={filterInput}
      />
    </td>
  ));
  
  return (
    <div className={container}>
      <h1 className={title}>Data Queue</h1>
      <h2 className={tableTitle}>Total Items ({filteredData.length})</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className={searchInput}
      />
      <div className={tableWrapper}>
        <table className={table}>
          <thead className={tableHeader}>
            <tr>{headerCells}</tr>
            <tr>{filterControls}</tr> {/* Added Filter Control Row */}
          </thead>
          <tbody>{dataRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayQueue;
