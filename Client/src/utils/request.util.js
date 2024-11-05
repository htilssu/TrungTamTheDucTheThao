import {getToken} from './token.util.js';

const baseUrl = import.meta.env.VITE_API_URL;

export async function wPost(url, data) {
  const response = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function wGet(url) {
  return (await fetch(baseUrl + url, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })).json();
}

export async function wPut(url, data) {
  return (await fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  })).json();
}

export async function wDelete(url) {
  return (await fetch(baseUrl + url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })).json();
}