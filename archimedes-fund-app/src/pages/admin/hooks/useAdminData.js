import { useState, useCallback } from 'react';

/**
 * useAdminData Hook
 * 
 * Generic hook for fetching and managing admin data with loading/error states
 * 
 * @param {string} endpoint - API endpoint to fetch from
 * @param {Object} options - Configuration options
 * @returns {Object} Data, loading state, error state, and refetch function
 */
const useAdminData = (endpoint, options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      console.error(`Fetch error for ${endpoint}:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const updateData = useCallback(async (method, body = null, customEndpoint = null) => {
    const url = customEndpoint || endpoint;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Refetch data after successful update
      if (options.refetchOnUpdate !== false) {
        await fetchData();
      }
      
      return result;
    } catch (err) {
      console.error(`Update error for ${url}:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, fetchData, options.refetchOnUpdate]);

  const createItem = useCallback(async (itemData) => {
    return updateData('POST', itemData);
  }, [updateData]);

  const updateItem = useCallback(async (itemData, id = null) => {
    const url = id ? `${endpoint}/${id}` : endpoint;
    return updateData('PUT', itemData, url);
  }, [endpoint, updateData]);

  const deleteItem = useCallback(async (id) => {
    const url = id ? `${endpoint}/${id}` : endpoint;
    return updateData('DELETE', null, url);
  }, [endpoint, updateData]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const setDataManually = useCallback((newData) => {
    setData(newData);
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    refetch,
    createItem,
    updateItem,
    deleteItem,
    setData: setDataManually,
    isError: !!error,
    isLoading: loading,
  };
};

export default useAdminData;
