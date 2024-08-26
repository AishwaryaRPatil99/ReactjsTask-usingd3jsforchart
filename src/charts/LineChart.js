import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const LineChart = ({ data: propData }) => {
  const chartRef = useRef();
  const [localData, setLocalData] = useState([
    { x: 1, y: 20 },
    { x: 2, y: 40 },
    { x: 3, y: 10 },
    { x: 4, y: 30 },
    { x: 5, y: 50 },
    { x: 6, y: 20 },
    { x: 7, y: 40 },
    { x: 8, y: 10 },
    { x: 9, y: 30 },
    { x: 10, y: 50 },
  ]);

  const width = 400;
  const height = 100;

  const xScale = d3.scaleLinear().domain([1, 10]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 50]).range([height, 0]);

  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveCardinal);

  const [selectedData, setSelectedData] = useState("propData");

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    const svgElement = svg
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    const selectedDataset = selectedData === "propData" ? propData : localData;

    renderCurveChart(svgElement, line, selectedDataset);
  }, [propData, localData, selectedData]);

  const renderCurveChart = (svg, line, data) => {
    svg
      .append("path")
      .data([data])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "green")
      .transition()
      .duration(500)
      .ease(d3.easeLinear);

    svg
      .selectAll("text.x-axis-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", (d) => xScale(d.x))
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .text((d) => d.x);
  };

  const handleDropdownChange = (e) => {
    setSelectedData(e.target.value);
  };

  const generateRandomData = () => {
    return localData.map((point) => ({
      x: point.x,
      y: Math.floor(Math.random() * 50),
    }));
  };

  const handleDateSelectorChange = (selectedDate) => {
    const randomizedData = generateRandomData();
    setLocalData(randomizedData);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div className="header-content">
          <h5>Checking Account</h5>
          <div className="dropdowns">
            <select onChange={handleDropdownChange} value={selectedData}>
              <option value="propData">Randomize Data</option>
              <option value="localData">Manage Data</option>
            </select>
            <select onChange={(e) => handleDateSelectorChange(e.target.value)}>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card-body" ref={chartRef}></div>
    </div>
  );
};

export default LineChart;
