import React, { useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import BarChartInvoice from "./charts/BarChartInvoice";
import LineChart from "./charts/LineChart";
import BarchartCashflow from "./charts/BarchartCashflow";
import AccountWatchlist from "./charts/AccountWatchlist";

function App() {
  const generateRandomDataLine = () => {
    return [
      { x: 1, y: Math.floor(Math.random() * 50) },
      { x: 2, y: Math.floor(Math.random() * 50) },
      { x: 3, y: Math.floor(Math.random() * 50) },
      { x: 4, y: Math.floor(Math.random() * 50) },
      { x: 5, y: Math.floor(Math.random() * 50) },
      { x: 6, y: Math.floor(Math.random() * 50) },
      { x: 7, y: Math.floor(Math.random() * 50) },
      { x: 8, y: Math.floor(Math.random() * 50) },
      { x: 9, y: Math.floor(Math.random() * 50) },
      { x: 10, y: Math.floor(Math.random() * 50) },
    ];
  };
  const generateRandomDataInvoice = () => {
    return [
      { date: "2023-01-01", value: Math.floor(Math.random() * 50) },
      { date: "2023-02-01", value: Math.floor(Math.random() * 50) },
      { date: "2023-03-01", value: Math.floor(Math.random() * 50) },
      { date: "2023-04-01", value: Math.floor(Math.random() * 50) },
      { date: "2023-05-01", value: Math.floor(Math.random() * 50) },
    ];
  };
  const generateRandomDataCashFlow = () => {
    return [
      { month: "January", value: Math.floor(Math.random() * 50) },
      { month: "February", value: Math.floor(Math.random() * 50) },
      { month: "March", value: Math.floor(Math.random() * 50) },
      { month: "April", value: Math.floor(Math.random() * 50) },
      { month: "May", value: Math.floor(Math.random() * 50) },
    ];
  };
  const [lineChartData, setLineChartData] = useState(generateRandomDataLine());
  const [barChartInvoiceData, setBarChartInvoiceData] = useState(
    generateRandomDataInvoice()
  );
  const [barchartCashflowData, setBarchartCashflowData] = useState(
    generateRandomDataCashFlow()
  );

  const handleRandomizeData = () => {
    setLineChartData(generateRandomDataLine());
    setBarChartInvoiceData(generateRandomDataInvoice());
    setBarchartCashflowData(generateRandomDataCashFlow());
  };

  return (
    <BrowserRouter>
      <div className="container-graph">
        <Grid container>
          <Grid item xs={12}>
            <Topbar onRandomizeData={handleRandomizeData} />
          </Grid>
          <Grid item xs={3}>
            <Navbar />
          </Grid>
          <Grid item xs={9} className="content-container">
            <Routes>
              <Route
                path="/"
                element={
                  <React.Fragment>
                    <Grid container spacing={2}>
                      <Grid item xs={6} className="chart-container">
                        <LineChart data={lineChartData} />
                      </Grid>
                      <Grid item xs={6} className="chart-container">
                        <BarChartInvoice data={barChartInvoiceData} />
                      </Grid>
                      <Grid item xs={6} className="chart-container">
                        <BarchartCashflow data={barchartCashflowData} />
                      </Grid>
                      <Grid item xs={6} className="chart-container">
                        <AccountWatchlist />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                }
              />
            </Routes>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;
