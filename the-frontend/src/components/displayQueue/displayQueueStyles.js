import { css } from "@linaria/core";
import { itemScheme } from "../../utilities/data/itemScheme";
import {
  primaryContentTextColor,
  tableHeadingTextColor,
} from "../../utilities/theme";

export const styleValues = {
  headerWeight: "700",
  fontSize: "1rem",
  titleColor: "#1b1b1b",
};

// Encapsulated CSS styles
export const container = css`
  color: ${styleValues.titleColor};
  padding: 16px;
  cursor: pointer;
`;

export const title = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const tableWrapper = css`
  overflow-x: auto;
  overflow-y: unset;
`;

export const tableBackground = "white";

export const table = css`
  background-color: ${tableBackground};
  width: 100%;
  border-collapse: collapse;
  white-space: break-spaces;
  text-align: left;
  font-size: ${styleValues.fontSize};
`;

export const headerBackgroundColor = "white";
export const tableHeader = css`
  color: ${tableHeadingTextColor};
  background-color: ${headerBackgroundColor};
  font-weight: ${styleValues.headerWeight};
`;

export const tableHeaderCell = css`
  padding: 8px;
  background-color: inherit;
  color: inherit !important;
`;

export const tableRow = css`
  color: ${primaryContentTextColor};
  border-bottom: 1px solid #ccc;
`;

export const dataRow = css`
  &:focus {
    background: red;
  }
`;

export const tableCell = css`
  padding: 0.8rem 0.533rem;
  color: inherit !important;
  &[name*="${itemScheme.group}"] {
    white-space: nowrap;
  }
`;
export const tableTitle = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
export const filterInput = css`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const filterRow = css`
  background-color: #dfe1e2;
`;

export const filterTagStyles = css`
  width: -webkit-fill-available;
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &>*[class*="blank"] {
    padding: 6px 1rem 6px 6px;
  }
`;

export const filterTag = css`
  display: flex;
  white-space: break-word;
  flex-direction: row;
  flex-shrink: 0;
  border-radius: 0.6rem;
  background-color: #efefef;
  gap: 1rem;
  border: 1px solid black;
  &>*: nth-child(1) {
    padding: 6px 1rem 6px 6px;
  }
  & > *:nth-child(2) {
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
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.5);
  }
`;

export const resetFilterTag = css`
  display: flex;
  white-space: break-word;
  flex-direction: row;
  flex-shrink: 0;
  border-radius: 0.6rem;
  background-color: #fff;
  gap: 1rem;
  border: 1px solid black;
  padding: 6px 1rem 6px 6px;
`;
export const paginationContainer = css`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 16px;
  gap: 10px;
`;

export const paginationButton = css`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

export const loadingRow = css`
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0.533rem;

  & > td:after {
    content: "";
    font-size: 1rem;
  }
`;

export const statusContainer = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  white-space: nowrap;
`;

export const statusTag = css`
  background-color: #efefef;
  border: 1px solid #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
  border-collapse: collapse;
  white-space: nowrap;
`;
