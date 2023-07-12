import { Button } from "@mui/material";
import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Contexts/dataContext";

export const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const MAX_INPUTS = 4;

  let navigate = useNavigate("");
  let { loginSuccess, handleLoginSuccess } = useContext(DataContext);

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (value && index < MAX_INPUTS - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Enter Verification Code</h1>
      <div style={{ display: "flex" }}>
        {[...Array(MAX_INPUTS)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "30px",
              border: "1px solid black",
              marginRight: "10px",
            }}
            value={otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          handleLoginSuccess();
          navigate("/finance");
        }}
        variant="contained"
        style={{ marginTop: "3%" }}
      >
        Submit
      </Button>
    </div>
  );
};
