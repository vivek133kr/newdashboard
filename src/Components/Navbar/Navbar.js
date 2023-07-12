import React, { useContext, useState } from 'react'
import "../../Styles/Navbar.css"
import { Button } from "@mui/material";
import NavImg from "../../Images/JoshUPSC.png"
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../Contexts/dataContext';
function Navbar() {
  let navigate = useNavigate()
 
  let {loginSuccess , handleLoginSuccess, counsellorData, handleCounsellorData} = useContext(DataContext)

  console.log(counsellorData, " lisdnfjnsdfj")
  return (
    <div className="mainNav" style={{ backgroundColor: "white" }}>
      <div
        style={{
          width: "50%",

          paddingLeft: "5%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <img style={{ height: "100%" }} src={NavImg} alt="logo" />
      </div>
      <div
        style={{
          display: "flex",

          alignItems: "center",
          paddingRight: "5%",
          width: "50%",
          justifyContent: "flex-end",
        }}
      >
        <h2 style={{ width: "fit-content", paddingRight: "5%" }}>
          {counsellorData !== null &&
            Object.keys(counsellorData).length > 2 &&
            `Hi, ${counsellorData.name.split(" ")[0]}`}
        </h2>

        {counsellorData && Object.keys(counsellorData).length > 2 && (
          <Button
            variant="contained"
            style={{
              backgroundColor:"white",
              color:"black"
            }}
            onClick={() => {
              localStorage.removeItem("CounsellorData");
              handleCounsellorData({});
              navigate("/finance/login");
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar