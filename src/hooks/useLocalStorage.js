import { useState, useEffect } from "react";

/**
 * useLocalStorage Hook
 * --------------------
 * A custom hook that works like useState but persists the value to localStorage.
 * Useful for auth tokens, theme preferences, shopping cart, etc.
 * 
 * @param {string} key - The key to store the data under in localStorage.
 * @param {any} initialValue - The initial value if no data is found in storage.
 * @returns {[any, Function]} - [storedValue, setValue]
 */
function useLocalStorage(key, initialValue) {
    // Get from local storage then
    // parse stored json or if none return initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Parse JSON if found, otherwise use initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error (e.g. storage disabled), return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
