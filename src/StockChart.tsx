import React from "react";
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

interface ChartData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface StockChartProps {
  data: {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const chartData: ChartData[] = Object.entries(data)
    .map(([timestamp, values]) => ({
      timestamp,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
    }))
    .reverse();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleString()}
          formatter={(value: number) => [value.toFixed(2), ""]}
        />
        <Legend />
        <Line type="monotone" dataKey="open" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="high" stroke="#82ca9d" dot={false} />
        <Line type="monotone" dataKey="low" stroke="#ffc658" dot={false} />
        <Line type="monotone" dataKey="close" stroke="#ff7300" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
