import {wGet} from './request.util.js';

export async function getUser() {
  return wGet('/api/user/me');
}