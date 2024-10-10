// src/components/HeaderOptions.tsx
import React from "react";
import AutocompleteStockSearch from "./AutocompleteStockSearch";

interface Props {
  interval: string;
  handleIntervalChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedStock: { symbol: string; name: string };
  handleStockChange: (stock: { symbol: string; name: string }) => void;
}

const HeaderOptions: React.FC<Props> = ({
  interval,
  handleIntervalChange,
  selectedStock,
  handleStockChange,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 flex-1">
          {selectedStock.name} ({selectedStock.symbol}) Stock
        </h2>
        <div className="flex flex-grow items-center space-x-4 flex-1">
          <div className="flex-1">
            <AutocompleteStockSearch onSelect={handleStockChange} />
          </div>
          <div className="flex items-center">
            <label className="text-gray-800 font-semibold mr-2">
              Select Interval:
            </label>
            <select
              value={interval}
              onChange={handleIntervalChange}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOptions;
