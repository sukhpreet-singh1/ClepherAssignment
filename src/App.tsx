import { useEffect, useState } from "react";
import "./App.css";
import DataFetcher from "./DataFetcher";

function App() {
  return (
    <div className="App">
      <h1>IBM Stock Price (5min Interval)</h1>
      <DataFetcher />
    </div>
  );
}

export default App;
