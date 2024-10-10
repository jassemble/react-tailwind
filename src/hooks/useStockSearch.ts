// src/hooks/useStockSearch.ts
import { useState, useEffect } from "react";
import { searchStocks } from "../services/alphavantage";
import { debounce } from "../utils/debounce";

interface Stock {
  symbol: string;
  name: string;
}

export const useStockSearch = (keyword: string) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchStocks = async () => {
      if (keyword.length > 1) {
        const results = await searchStocks(keyword);
        setStocks(results);
        setDropdownOpen(true);
      } else {
        setStocks([]);
        setDropdownOpen(false);
      }
    };

    const debouncedFetchStocks = debounce(fetchStocks, 500);
    debouncedFetchStocks();

    return () => {
      setStocks([]);
      setDropdownOpen(false);
    };
  }, [keyword]);

  return { stocks, isDropdownOpen, setDropdownOpen };
};
