// src/hooks/useStockData.ts
import { useState, useEffect } from "react";
import { StockData } from "../types/stockData"; // Ensure this type is defined correctly
import { getStockData } from "../services/alphavantage"; // Service to fetch data

// Cache object to store fetched stock data
const stockDataCache: Record<string, StockData | null> = {};

export const useStockData = (
  symbol: string,
  initialInterval: string = "daily"
) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<string>(initialInterval);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Generate a cache key based on symbol and interval
      const cacheKey = `${symbol}-${interval}`;

      // Check if data is already cached
      if (stockDataCache[cacheKey]) {
        setStockData(stockDataCache[cacheKey]);
        setLoading(false);
        return; // Exit early if cached data is available
      }

      try {
        const data: any = await getStockData(symbol, interval);
        if (data.Information) {
          setError(data.Information);
        }
        if (data) {
          stockDataCache[cacheKey] = data; // Cache the fetched data
          setStockData(data);
        } else {
          setError("No data returned from the API.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval]); // Refetch when symbol or interval changes

  return { stockData, loading, error, interval, setInterval };
};
