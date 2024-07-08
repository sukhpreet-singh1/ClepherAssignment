import React, { useState, useEffect } from "react";
import StockChart from "./StockChart";
import Header from "./Header";
import Dropdown from "./Dropdown";

interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string | null;
  "4. Output Size": string;
  "5. Time Zone": string;
}

interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface StockData {
  "Meta Data": MetaData;
  "Time Series (5min)"?: { [key: string]: TimeSeriesData };
  "Time Series (Daily)"?: { [key: string]: TimeSeriesData };
}

const DataFetcher: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDropdown, setDropdownValue] = useState<string>(
    "TIME_SERIES_INTRADAY"
  );

  const dropdownOptions: Option[] = [
    { value: "TIME_SERIES_INTRADAY", label: "Time Series Intraday" },
    { value: "TIME_SERIES_DAILY", label: "Time Series Daily" },
  ];

  const handleDropdownChange = (value: string) => {
    setDropdownValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=${selectedDropdown}&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: StockData = await response.json();
        setStockData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDropdown]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stockData) return <div>No data available</div>;

  const timeSeriesData =
    selectedDropdown === "TIME_SERIES_INTRADAY"
      ? stockData["Time Series (5min)"]
      : stockData["Time Series (Daily)"];

  return (
    <>
      <Header data={stockData["Meta Data"]} />
      <Dropdown options={dropdownOptions} onChange={handleDropdownChange} />
      <StockChart data={timeSeriesData} />
    </>
  );
};

export default DataFetcher;
