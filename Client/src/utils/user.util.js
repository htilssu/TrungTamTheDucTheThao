import {wGet} from './request.util.js';

export async function getUser() {
  return wGet('/v1/user/me');
}