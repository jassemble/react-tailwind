// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { useStockData } from "../hooks/useStockData";
import StockDataDisplay from "../components/StockDataDisplay";
import StockChart from "../components/StockChart";
import LoadingSpinner from "../components/LoadingSpinner";
import HeaderOptions from "../components/HeaderOptions";
import ErrorDisplay from "../components/ErrorDisplay";

const linesConfig = [
  { key: "1. open", color: "#8884d8", label: "Open Price" },
  { key: "2. high", color: "#82ca9d", label: "High Price" },
  { key: "3. low", color: "#ff7300", label: "Low Price" },
  { key: "4. close", color: "#000000", label: "Close Price" },
];

const Home: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<{
    symbol: string;
    name: string;
  }>({ symbol: "AAPL", name: "Apple Inc." });
  const { stockData, loading, error, interval, setInterval } = useStockData(
    selectedStock.symbol
  );

  let timeSeries;
  if (stockData) {
    if (interval === "daily") {
      timeSeries = stockData["Time Series (Daily)"];
    } else if (interval === "weekly") {
      timeSeries = stockData["Weekly Time Series"];
    } else if (interval === "monthly") {
      timeSeries = stockData["Monthly Time Series"];
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Alpha Vantage Data
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : timeSeries ? (
        <div className="flex flex-col space-y-4">
          <HeaderOptions
            interval={interval}
            handleIntervalChange={(e) => setInterval(e.target.value)}
            selectedStock={selectedStock}
            handleStockChange={setSelectedStock}
          />
          <StockChart timeSeries={timeSeries} linesConfig={linesConfig} />
          <StockDataDisplay timeSeries={timeSeries} />
        </div>
      ) : (
        error && (
          <ErrorDisplay
            error={error}
            retryAction={() => window.location.reload()}
          />
        )
      )}
    </div>
  );
};

export default Home;
