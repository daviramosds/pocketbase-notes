
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '../pb_types';
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL) as TypedPocketBase