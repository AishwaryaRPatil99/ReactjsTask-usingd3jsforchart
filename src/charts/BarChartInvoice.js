import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Modal from "react-modal";

const BarChartInvoice = ({ data }) => {
  const chartRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const width = 400;
  const height = 150;
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
    },
  };

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.date))
    .range([0, width])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0]);

  const handleNewSalesInvoiceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth() - 60)
      .attr("height", (d) => height - yScale(d.value))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "green");

    svg
      .selectAll("text.x-axis-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", (d) => xScale(d.date) + xScale.bandwidth() / 2)
      .attr("y", height + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .text((d) => d.date);
  }, [data, xScale, yScale]);

  return (
    <div className="card" style={{ position: "relative" }}>
      <div className="card-header">
        <div className="header-content">
          <h5>Invoices owed to you</h5>
          <div className="dropdowns">
            <button onClick={handleNewSalesInvoiceClick}>
              New Sales Invoice
            </button>
          </div>
        </div>
      </div>
      <div className="card-body" style={{ padding: 10 }}>
        <svg ref={chartRef} width={width} height={height + 30}></svg>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="File Upload Modal"
        style={modalStyles}
      >
        <h2>New Sales Invoice</h2>
        <form>
          <input type="file" />
          <button type="submit">Submit</button>
        </form>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default BarChartInvoice;
