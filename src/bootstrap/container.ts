import { BrowserSessionStore } from '../adapters/storage/BrowserSessionStore';
import { HttpClient } from '../adapters/http/HttpClient';
import { UserHttpAdapter } from '../adapters/http/UserHttpAdapter';
import { UserApplicationService } from '../application/services/UserApplicationService';
import { Capacitor } from '@capacitor/core';
const store = new BrowserSessionStore(localStorage);
const baseUrl = Capacitor.isNativePlatform()
  ? import.meta.env.VITE_NATIVE_API_BASE_URL || 'https://users-management-api-ptmc.onrender.com/api'
  : import.meta.env.VITE_API_BASE_URL || '/api';
export const useCases = new UserApplicationService(new UserHttpAdapter(new HttpClient(baseUrl, store, () => window.dispatchEvent(new Event('session-expired')))), store);
