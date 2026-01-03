import { useState, useEffect } from 'react';

/**
 * useFetch Hook
 * -------------
 * A generic custom hook for fetching data from a URL.
 * It manages the loading and error states automatically.
 * 
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} { data, loading, error }
 */
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If no URL provided, don't fetch (or reset)
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);

                // Check for HTTP errors (e.g. 404, 500)
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                // Catch network errors or JSON parsing errors
                setError(err.message);
            } finally {
                // Always stop loading, success or failure
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Re-run if URL changes

    return { data, loading, error };
};

export default useFetch;
