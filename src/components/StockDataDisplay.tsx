import React, { useState } from "react";
import Pagination from "./Pagination"; // Reusable Pagination component
import ItemsPerPageDropdown from "./ItemsPerPageDropdown"; // Reusable ItemsPerPageDropdown component
import { TimeSeries } from "../types/stockData";

interface StockDataDisplayProps {
  timeSeries: TimeSeries;
}

const StockDataDisplay: React.FC<StockDataDisplayProps> = ({ timeSeries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  if (!timeSeries) return <p>No data available for the selected interval.</p>;

  // Stock data processing
  const stockEntries = Object.entries(timeSeries);
  const totalPages = Math.ceil(stockEntries.length / itemsPerPage);
  const currentStockEntries = stockEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stock Data</h2>

      <div className="flex justify-between items-center mb-4">
        <ItemsPerPageDropdown
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(e) => setItemsPerPage(Number(e.target.value))}
        />
      </div>

      <ul className="space-y-2">
        {currentStockEntries.map(([date, data]) => (
          <li key={date} className="bg-gray-100 rounded p-4">
            <strong className="text-sm text-gray-500">{date}</strong>:
            <div className="flex space-x-4 mt-2">
              <span>Open: {data["1. open"]}</span>
              <span>High: {data["2. high"]}</span>
              <span>Low: {data["3. low"]}</span>
              <span>Close: {data["4. close"]}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StockDataDisplay;
