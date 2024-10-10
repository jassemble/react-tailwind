import axios from "axios";
import { StockData } from "../../types/stockData";

// Set up base URL and API key
const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = "RIBXT3XYLI69PC0Q";

// Function to fetch stock data based on the selected interval
export const getStockData = async (
  symbol: string,
  interval: string = "TIME_SERIES_DAILY"
) => {
  let functionType;

  // Determine the function based on the selected interval
  switch (interval) {
    case "daily":
      functionType = "TIME_SERIES_DAILY";
      break;
    case "weekly":
      functionType = "TIME_SERIES_WEEKLY";
      break;
    case "monthly":
      functionType = "TIME_SERIES_MONTHLY";
      break;
    default:
      throw new Error("Invalid interval");
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: functionType,
        symbol,
        apikey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const searchStocks = async (keyword: string) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
        keyword
      )}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data && data.bestMatches) {
      return data.bestMatches.map((match: any) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching stock symbols:", error);
    return [];
  }
};
