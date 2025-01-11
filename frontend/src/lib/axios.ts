import axios from 'axios';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const api = axios.create({
  baseURL: `${backend_url || ''}/api`,
  timeout: 20000,
});
