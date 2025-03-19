import React, { useState, useEffect } from "react";
import { itemStatus, mockData } from "./mockData";
import { itemScheme } from "../../utilities/data/itemScheme";
import { elements } from "../elements/controls";
import { formatDate } from "../../utilities/transforms";
import { useMockQuery } from "../../utilities/mimic/mockItemsQuery";
import * as queueStyleClasses from "./displayQueueStyles";
import MultiSelectDropdown from "../multiselect/multiselectDropdown";

// Schema definition (Status moved before Item Entry Code)
const displayTableSchema = Object.fromEntries(
  Object.entries({
    [itemScheme.customerName]: "Customer Name",
    [itemScheme.specId]: "Spec ID",
    [itemScheme.status]: "Status", // Moved before Entry Code
    [itemScheme.itemEntryCode]: "Item Entry Code",
    [itemScheme.initiatedAt]: "Initiated At",
    [itemScheme.submittedAt]: "Submitted At",
    [itemScheme.group]: "Group",
    [itemScheme.originCode]: "Origin Code",
    [itemScheme.originLocation]: "Origin Location",
    [itemScheme.assignedUser]: "Assigned User",
  }).map(([accessor, content]) => [accessor, { accessor, content }])
);

// Format data for display
const matchFormatter = (accessor, value) => {
  switch (accessor) {
    case itemScheme.initiatedAt:
    case itemScheme.submittedAt:
      return formatDate(value);
    case itemScheme.status:
      return (
        <div className={queueStyleClasses.statusContainer}>
          {value.map((status, index) => (
            <span key={index} className={queueStyleClasses.statusTag}>
              {status}
            </span>
          ))}
        </div>
      ); // Render multiple status tags
    default:
      return value;
  }
};

// Extract unique groups for the dropdown
const getUniqueGroups = () => [
  ...new Set(mockData.map((item) => item[itemScheme.group])),
];

const DisplayQueue = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [filters, setFilters] = useState({});
  const [previousRowCount, setPreviousRowCount] = useState(rowsPerPage);
  const dataQueueElementId = "dataQueueElement";

  // Fetch paginated & filtered data from the "backend"
  const {
    data: fetchedData,
    isLoading,
    error,
    totalCount,
  } = useMockQuery("dataQueue", () => mockData, {
    page: currentPage,
    limit: rowsPerPage,
    filters,
    delay: 33,
  });

  // Preserve row count to prevent UI jumps when loading
  useEffect(() => {
    if (fetchedData) {
      setPreviousRowCount(fetchedData.length || previousRowCount);
    }
  }, [fetchedData]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  // Update filters
  const updateFilters = (columnKey, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (!value || (Array.isArray(value) && value.length === 0)) {
        delete newFilters[columnKey]; // Remove filter if empty
      } else {
        newFilters[columnKey] = value;
      }
      return newFilters;
    });
  };


  // Handle input change
  const handleColumnFilterChange = (e, columnKey) => {
    updateFilters(columnKey, e.target.value);
  };

  // Remove filter when clicking a tag
  const removeFilter = (columnKey) => {
    updateFilters(columnKey, "");
  };

  // Generate filter tags
  const filterTags = Object.entries(filters).map(([columnKey]) => (
    <span key={columnKey} className={queueStyleClasses.filterTag}>
      <div>{displayTableSchema[columnKey]?.content || columnKey}</div>
      <div onClick={() => removeFilter(columnKey)}>✕</div>
    </span>
  ));

  // Table headers
  const headerCells = Object.values(displayTableSchema).map(
    ({ accessor, content }) => (
      <th key={accessor} className={queueStyleClasses.tableHeaderCell}>
        {content}
      </th>
    )
  );

  // Placeholder loading row
  const LoadingRow = () => (
    <tr>
      <td colSpan={headerCells.length} className={queueStyleClasses.loadingRow}>
        Loading data...
      </td>
    </tr>
  );

  // Table rows (or placeholders while fetching)
  const dataRows = isLoading
    ? Array.from({ length: previousRowCount }).map((_, idx) => (
        <tr key={`loading-${idx}`} className={queueStyleClasses.loadingRow}>
          <td
            colSpan={headerCells.length}
            className={queueStyleClasses.tableCell}
          >
            &nbsp;
          </td>
        </tr>
      ))
    : (fetchedData || []).map((row, rowIndex) => {
        const cells = Object.keys(displayTableSchema).map((key) => (
          <td key={key} className={queueStyleClasses.tableCell} name={key}>
            {matchFormatter(key, row[key])}
          </td>
        ));

        return (
          <tr
            key={rowIndex}
            tabIndex={0}
            className={[
              queueStyleClasses.tableRow,
              queueStyleClasses.dataRow,
            ].join(" ")}
          >
            {cells}
          </tr>
        );
      });

  // Filter row (dropdown for Group, inputs for others)
  const filterControls = Object.keys(displayTableSchema).map((key) => (
    <td key={key} className={queueStyleClasses.tableCell}>
      {key === itemScheme.group ? (
        // Group Filter (Single-Select Dropdown)
        <select
          value={filters[key] || ""}
          onChange={(e) => handleColumnFilterChange(e, key)}
          className={queueStyleClasses.filterInput}
        >
          <option value="">All Groups</option>
          {getUniqueGroups().map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      ) : key === itemScheme.status ? (
        // Status Filter (Multi-Select Dropdown)
        <MultiSelectDropdown
          options={itemStatus}
          selectedValues={filters[key] || []}
          onChange={(selected) => updateFilters(key, selected)}
        />
      ) : (
        // Default Text Input for Other Filters
        elements.input({
          type: "text",
          value: filters[key] || "",
          onChange: (e) => handleColumnFilterChange(e, key),
          className: queueStyleClasses.filterInput,
        })
      )}
    </td>
  ));

  // Display filter tags
  const theFilters = () => {
    if (filterTags.length === 0)
      return (
        <div className={queueStyleClasses.filterTagStyles}>
          <div className="blank">&nbsp;</div>
        </div>
      );

    return (
      <div className={queueStyleClasses.filterTagStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div>Filters:</div>
          <span
            className={queueStyleClasses.resetFilterTag}
            onClick={() => setFilters({})}
          >
            Reset
          </span>
        </div>
        {filterTags}
      </div>
    );
  };

  // Pagination controls
  const paginationControls = (
    <div className={queueStyleClasses.paginationContainer}>
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1 || isLoading}
        className={queueStyleClasses.paginationButton}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages || isLoading}
        className={queueStyleClasses.paginationButton}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className={queueStyleClasses.container}>
      <h1 className={queueStyleClasses.title}>Data Queue</h1>
      <h2 className={queueStyleClasses.tableTitle}>
        Total Items ({totalCount})
      </h2>
      {theFilters()}
      <div className={queueStyleClasses.tableWrapper}>
        <table id={dataQueueElementId} className={queueStyleClasses.table}>
          <thead className={queueStyleClasses.tableHeader}>
            <tr>{headerCells}</tr>
            <tr className={queueStyleClasses.filterRow}>{filterControls}</tr>
          </thead>
          <tbody>{dataRows}</tbody>
        </table>
      </div>
      {paginationControls}
    </div>
  );
};

export default DisplayQueue;
