// Define the structure of each entry in the time series
export interface TimeSeriesEntry {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume"?: string; // Volume may not always be present
}

// Define the structure of the entire time series (daily, weekly, monthly)
export interface TimeSeries {
  [date: string]: TimeSeriesEntry;
}

// MetaData for the stock data
export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

// Full StockData type for the Alpha Vantage API
export interface StockData {
  "Meta Data": MetaData;
  "Time Series (Daily)"?: TimeSeries;
  "Weekly Time Series"?: TimeSeries;
  "Monthly Time Series"?: TimeSeries;
}
