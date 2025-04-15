import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Template for creating custom hooks with best practices
 * @param {Object} options - Hook configuration options
 * @param {Function} options.action - Redux action to dispatch
 * @param {string} options.selector - Redux selector path
 * @param {number} options.itemsPerPage - Number of items per page for pagination
 * @returns {Array} Array containing [data, pagination, loading, error, handlers]
 */
const useCustomHook = ({ action, selector, itemsPerPage = 10 }) => {
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();

  // Memoized selector
  const reduxData = useSelector((state) => {
    const path = selector.split(".");
    return path.reduce((obj, key) => obj?.[key], state);
  });

  /**
   * Fetch initial data
   * @returns {Promise<void>}
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(action("", itemsPerPage));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, action, itemsPerPage]);

  /**
   * Handle pagination
   * @param {number} page - Page number to fetch
   * @returns {Promise<void>}
   */
  const handlePageChange = useCallback(
    async (page) => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(action(page, itemsPerPage));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching page:", err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, action, itemsPerPage]
  );

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update local state when Redux state changes
  useEffect(() => {
    if (!loading && reduxData) {
      const { results, paginationResult, data: newData } = reduxData;

      if (results) setData(newData);
      if (paginationResult) setPagination(paginationResult);
    }
  }, [loading, reduxData]);

  // Memoize handlers
  const handlers = useMemo(
    () => ({
      fetchData,
      handlePageChange,
    }),
    [fetchData, handlePageChange]
  );

  // Memoize return value
  return useMemo(
    () => [data, pagination, loading, error, handlers],
    [data, pagination, loading, error, handlers]
  );
};

export default useCustomHook;
