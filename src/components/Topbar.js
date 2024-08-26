import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Womenavatar from "../Assets/women.jpg";
import Logo from "../Assets/Assiduus_TM_Logo.png";

const Topbar = ({ onRandomizeData }) => {
  return (
    <div
      className="top-bar"
      style={{
        backgroundColor: "rgba(235, 228, 228, 0.782) !important",
        color: "black !important",
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <div className="top_section">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "16px",
              marginBottom: "20px",
              paddingTop: "20px",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <SearchIcon style={{ color: "black" }} />
              </div>
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                style={{ paddingLeft: "30px", backgroundColor: "ghostwhite" }}
              />
            </div>
          </div>
          <button onClick={onRandomizeData}>Randomize Data</button>

          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationAddIcon />
            </Badge>
          </IconButton>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "16px",
            }}
          >
            <img
              src={Womenavatar}
              alt=""
              style={{ width: "40px", height: "40px", marginRight: "8px" }}
            />
            <ArrowDropDownIcon style={{ marginLeft: "8px" }} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
