import {getToken} from './token.util.js';

const baseUrl = import.meta.env.VITE_API_URL;

export async function wPost(url, data) {
  return await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
}

export async function wGet(url) {
  return await fetch(baseUrl + url, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });
}

export async function wPut(url, data) {
  return (await fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  }));
}

export async function wDelete(url) {
  return (await fetch(baseUrl + url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  }));
}