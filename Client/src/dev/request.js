const API_BASE_URL = 'http://localhost:8080/api';

export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers, 
    };

    const fetchOptions = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, fetchOptions);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
};
