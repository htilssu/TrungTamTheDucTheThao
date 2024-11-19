export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',

        ...options.headers,  
    };
    console.log(localStorage.getItem('token')),
    console.log(headers);

    const fetchOptions = {
        ...options,
        headers,
    };

    const response = await fetch(`${url}`, fetchOptions);

    // Kiểm tra mã trạng thái
    if (response.status === 404) {
        throw new Error("API endpoint not found (404)");
    }
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return response.json();
};

