import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BarchartCashflow = ({ data }) => {
  const chartRef = useRef();
  const width = 400;
  const height = 120;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, width])
    .padding(0.1);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0]);

  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [isCheckedOut, setIsCheckedOut] = useState(true);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.month))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth() - 60)
      .attr("height", (d) => height - yScale(d.value))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", (d) => {
        if (isCheckedIn && isCheckedOut) {
          return `url(#${d.month}-gradient)`;
        } else if (isCheckedIn) {
          return "darkolivegreen";
        } else if (isCheckedOut) {
          return "rgb(60, 231, 60)";
        } else {
          return "yellowgreen";
        }
      });

    svg
      .selectAll("linearGradient")
      .data(data)
      .enter()
      .append("linearGradient")
      .attr("id", (d) => `${d.month}-gradient`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", yScale(0))
      .attr("x2", 0)
      .attr("y2", yScale(100))
      .selectAll("stop")
      .data([
        { offset: "0%", color: "darkolivegreen" },
        { offset: "100%", color: "rgb(60, 231, 60)" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    svg
      .selectAll("text.x-axis-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", (d) => xScale(d.month) + xScale.bandwidth() / 4)
      .attr("y", height + 30)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .text((d) => d.month);

    console.log("In Checkbox Status:", isCheckedIn);
    console.log("Out Checkbox Status:", isCheckedOut);
  }, [data, xScale, yScale, isCheckedIn, isCheckedOut]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="header-content">
          <h5>Total cash flow</h5>
          <div className="dropdowns">
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={isCheckedIn}
                  onChange={() => setIsCheckedIn(!isCheckedIn)}
                />
                <span className="checkmark-in"></span>
              </label>
              In
            </div>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={isCheckedOut}
                  onChange={() => setIsCheckedOut(!isCheckedOut)}
                />
                <span className="checkmark-out"></span>
              </label>
              Out
            </div>
          </div>
        </div>
      </div>
      <div className="card-body" style={{ padding: 10 }}>
        <svg ref={chartRef} width={width} height={height + 50}></svg>
      </div>
    </div>
  );
};

export default BarchartCashflow;
