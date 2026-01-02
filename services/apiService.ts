import { MarketSignal } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const fetchAPI = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
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

