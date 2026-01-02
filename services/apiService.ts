import { MarketSignal, SignalType } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

// Check if we're in production and API URL is localhost
const isProduction = (import.meta as any).env?.PROD || false;
const isLocalhostAPI = API_BASE_URL.includes('localhost') || API_BASE_URL.includes('127.0.0.1');

const fetchAPI = async (endpoint: string) => {
  // In production, if API is localhost, return null gracefully
  if (isProduction && isLocalhostAPI) {
    console.warn('⚠️ Backend API not configured. Set VITE_API_URL in GitHub Secrets.');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('API request timeout');
    } else {
      console.error('API fetch error:', error);
    }
    return null;
  }
};

export const getDashboardSignal = async (): Promise<MarketSignal | null> => {
  try {
    const signal = await fetchAPI('/api/dashboard');
    return signal;
  } catch (error) {
    console.error('Error fetching dashboard signal:', error);
    return null;
  }
};

export const getSignals = async (symbols?: string[]): Promise<MarketSignal[]> => {
  try {
    const query = symbols ? `?symbols=${symbols.join(',')}` : '';
    const signals = await fetchAPI(`/api/signals${query}`);
    return signals || [];
  } catch (error) {
    console.error('Error fetching signals:', error);
    return [];
  }
};

export const getSignalBySymbol = async (symbol: string): Promise<MarketSignal | null> => {
  try {
    const signal = await fetchAPI(`/api/signals/${symbol}`);
    return signal;
  } catch (error) {
    console.error('Error fetching signal:', error);
    return null;
  }
};

export const getMarketData = async (symbol: string) => {
  try {
    const data = await fetchAPI(`/api/market/data/${symbol}`);
    return data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return null;
  }
};

