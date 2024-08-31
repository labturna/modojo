// localStorage.js
const Storage = {
    // Save data to localStorage
    save(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    },
    // Get data from localStorage
    get(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue);
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return null;
        }
    },
    // Delete data from localStorage
    delete(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error deleting from localStorage", error);
        }
    }
};

export default Storage;