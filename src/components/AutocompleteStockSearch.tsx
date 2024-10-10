// src/components/AutocompleteStockSearch.tsx
import React, { useState } from "react";
import { useStockSearch } from "../hooks/useStockSearch";

interface Stock {
  symbol: string;
  name: string;
}

const AutocompleteStockSearch: React.FC<{
  onSelect: (stock: Stock) => void;
}> = ({ onSelect }) => {
  const [keyword, setKeyword] = useState("");
  const { stocks, isDropdownOpen, setDropdownOpen } = useStockSearch(keyword);

  const handleSelect = (stock: Stock) => {
    setKeyword(stock.symbol); // or set it to stock.name, based on your preference
    onSelect(stock); // Pass the selected stock object
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for a stock"
        className="border border-gray-300 rounded p-2 w-full"
      />
      {isDropdownOpen && stocks.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-auto">
          {stocks.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => handleSelect(stock)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {stock.name} ({stock.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteStockSearch;
