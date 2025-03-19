import { useState, useEffect } from "react";
import { itemScheme } from "../data/itemScheme";

// Mock useQuery Hook with Filtering & Pagination
export const useMockQuery = (queryKey, fetchFn, { page = 1, limit = 10, filters = {}, delay = 1000 }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
          // Apply filtering at "backend" level
          const fullData = await new Promise((resolve) => {
            setTimeout(() => resolve(fetchFn()), delay);
          });
          
          // Apply filtering at "backend" level
          let filteredData = fullData.filter((row) =>
            Object.keys(filters).every((key) => {
              const filterValue = filters[key];
          
              switch (key) {
                case itemScheme.status:
                  return (
                    Array.isArray(filterValue) &&
                    filterValue.every((selectedStatus) => row[key].includes(selectedStatus))
                  );
          
                default:
                  // Standard text-based filtering
                  return row[key]?.toString().toLowerCase().includes(filterValue || "");
              }
            })
          );
          

        // Paginate the filtered data
        const startIndex = (page - 1) * limit;
        const paginatedData = filteredData.slice(startIndex, startIndex + limit);

        if (isMounted) {
          setData(paginatedData);
          setTotalCount(filteredData.length); // Update total count after filtering
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to prevent state update after unmount
    };
  }, [queryKey, page, limit, filters]); // Re-fetch when page, limit, or filters change

  return { data, isLoading, error, totalCount };
};
