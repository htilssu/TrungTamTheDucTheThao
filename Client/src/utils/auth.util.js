import {wPost} from './request.util.js';

export function signIn(email, password) {
  return wPost('/api/login', {email, password});
}