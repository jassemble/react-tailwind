// src/components/StockChart.tsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { TimeSeries } from "../types/stockData";
import Checkbox from "./Checkbox";

interface LineConfig {
  key: string;
  color: string;
  label: string;
}

interface StockChartProps {
  timeSeries: TimeSeries;
  linesConfig: LineConfig[];
}

const StockChart: React.FC<StockChartProps> = ({ timeSeries, linesConfig }) => {
  const formattedData = Object.entries(timeSeries).map(([date, data]) => ({
    date: new Date(date),
    ...Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, parseFloat(value)])
    ),
  }));

  // State for toggling line chart visibility
  const initialLineStates = Object.fromEntries(
    linesConfig.map((line) => [line.key, true])
  );
  const [selectedLines, setSelectedLines] = useState(initialLineStates);

  // Handler for checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Ensure at least one checkbox is selected
    const linesSelected = Object.values(selectedLines).filter(
      (line) => line
    ).length;

    // Prevent unchecking the last selected line
    if (linesSelected === 1 && !checked) {
      return;
    }

    setSelectedLines((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Function to format the X-axis ticks dynamically
  const formatXAxis = (tickItem: Date) => format(tickItem, "MM/dd");

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price Chart</h2>

      <div className="flex space-x-4 mb-4">
        {linesConfig.map(({ key, label }) => (
          <Checkbox
            key={key}
            name={key}
            checked={selectedLines[key]}
            onChange={handleCheckboxChange}
            label={label}
          />
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} minTickGap={20} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />

          {/* Conditionally render each line based on checkbox state */}
          {linesConfig.map(({ key, color, label }) =>
            selectedLines[key] ? (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                name={label}
                dot={false} // Disable dots for this line
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
