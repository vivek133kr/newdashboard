import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";

import "@fontsource/roboto";
import "@fontsource/inter";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../../App.css"

import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Button } from "@mui/material";
import { json, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../Contexts/dataContext";
// import { hotjar } from "react-hotjar";
function SignIn() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     hotjar.initialize(3503164, 6);
  //   }, 2000);
  // }, []);]
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({});

  console.log(errors , " dofjsdofjdoiij")
  let navigate = useNavigate()
    let { loginSuccess, handleLoginSuccess, counsellorData, handleCounsellorData } =
      useContext(DataContext);

  let [urlError, seturlError] = useState(false);
  let [postError, setpostError] = useState(false);

let [registrationProcess, setRegistrationProcess] = useState(false);
let [postingData, setPostingData] = useState(false);
  let [qrcode, setQrcode] = useState("");
    const [widthTotal, setWidth] = useState(window.innerWidth);

let [fields, setFieldssData] = useState([
  {
    id: 1,
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Your Answer",
  },
  {
    id: 2,
    name: "password",
    type: "password",
    required: true,
    label: "Password",
    placeholder: "Your Answer",
  },
  {
    id: 3,
    name: "otp",
    type: "number",
    label: "OTP",
    required: true,
    placeholder: "Your Answer",
  },
]);
  let refData = useRef([]);


  let [fieldsData, setFieldsData] = useState(fields);




  function handleInput(e) {
    const value = e.target.value;
    if (value.toString().length > 6) {
      e.target.value = value.toString().slice(0, 6);
    }
  }

  const handleGenerateQr = () => {
    setRegistrationProcess(true)
    if (validateEmailAndPassword() !== false){
        fetch("https://upsc.joshtalks.org/api/v1/user/register_2fa/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        }).then((res) => res.json()).then((data) => {
        
          
          if (data && data.qr_url){
setQrcode(data.qr_url);
          }else {
            seturlError(true);

            setTimeout(()=>{
              seturlError(false)
            }, 2000)
            setEmail("");
            setPassword("");
            setOtp("");
          }
          setRegistrationProcess(false)
          }).catch((err) => console.log("err check", err))
          return;
    }
   setRegistrationProcess(false);
  };

  const handlePostData = () => {
  setPostingData(true)
    if (validateAllFields() != false){
 fetch("https://upsc.joshtalks.org/api/v1/user/staff_login/", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     email: email,
     password: password,
     token: otp,
   }),
 })
   .then((res) => res.json())
   .then((data) => {
     if (Object.keys(data).length > 2) {

       localStorage.setItem("CounsellorData", JSON.stringify(data));

       handleCounsellorData(data);
        setPostingData(false);
       navigate("/finance");
     }else {
setpostError(true);
setEmail("")
setPassword("")
setOtp("")
setTimeout(()=>{
  setpostError(false)
},2000)
setPostingData(false);
     }
     
   })
   .catch((err) => console.log("err check", err));
   return;
    }
      
     setPostingData(false);
  };
  const validateEmailAndPassword = () => {
    let errors = {};
   
    let isValid = true;

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    setErrors(errors);

    return isValid;
  };

  
  const validateAllFields = () => {
    let errors = {};
    let isValid = true;

    if (!otp) {
      isValid = false;
      errors["otp"] = "Please enter your OTP.";
    }

    if (typeof otp !== "undefined") {
      if (otp.length !== 6) {
        isValid = false;
        errors["otp"] = "OTP should be of 6 digits.";
      }
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    setErrors(errors);

    return isValid;
  };

  
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="newClass">
        <h1>Fill in your details to begin verification process</h1>

        <div className="secondStyleClass">
          <div className="allBoxMainDiv">
            <div
              key={1}
              style={{
                padding: "0px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                marginBottom: "2.5em",
              }}
              className={`bg-white allBoxElement`}

              // className={`bg-white morePadding`}
            >
              <div style={{ width: "95%" }}>
                <label
                  htmlFor={email}
                  style={{
                    display: "block",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "19px",
                    padding: "0px",
                    paddingBottom: "8px",
                  }}
                  className="inputLabelv inputLabelStylev "
                >
                  {"Email"}
                </label>

                <input
                  id={1}
                  autoComplete="on"
                  name={"email"}
                  placeholder={`Your Answer`}
                  type={"text"}
                  required
                  value={email}
                  onChange={(e) => {
                    setErrors({});
                    setEmail(e.target.value);
                  }}
                  style={{
                    border: errors["email"]
                      ? "2px solid #DC2626"
                      : "1px solid #D2D5DA",
                    width: "95%",
                    height: "46px",
                    paddingLeft: "10px",
                  }}
                  className={`focus:outline-none inputStylev ${
                    errors["email"] ? "text-input error" : "text-input"
                  }`}
                />
                {errors["email"] && (
                  <div
                    style={{
                      color: "#DC2626",
                      fontWeight: 600,
                      display: "flex",
                      height: "40px",

                      alignItems: "center",
                    }}
                    className="input-feedback flex text-red-600  items-center mt-3"
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <ErrorOutlineIcon />
                    </span>
                    <span
                      style={{
                        marginLeft: "1%",
                        paddingTop: "0px",
                        marginTop: "0px",
                      }}
                      className="errorStyle"
                    >
                      {errors["email"]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              key={2}
              style={{
                padding: "0px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                marginBottom: "2.5em",
              }}
              className={`bg-white allBoxElement`}

              // className={`bg-white morePadding`}
            >
              <div style={{ width: "95%" }}>
                <label
                  htmlFor={password}
                  style={{
                    display: "block",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "19px",
                    padding: "0px",
                    paddingBottom: "8px",
                  }}
                  className="inputLabelv inputLabelStylev "
                >
                  Password
                </label>

                <input
                  id={2}
                  autoComplete="on"
                  name={"password"}
                  placeholder={`Your Answer`}
                  type={"password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setErrors({});
                    setPassword(e.target.value);
                  }}
                  style={{
                    border: errors["password"]
                      ? "2px solid #DC2626"
                      : "1px solid #D2D5DA",
                    width: "95%",
                    height: "46px",
                    paddingLeft: "10px",
                  }}
                  className={`focus:outline-none inputStylev ${
                    errors["password"] ? "text-input error" : "text-input"
                  }`}
                />
                {errors["password"] && (
                  <div
                    style={{
                      color: "#DC2626",
                      fontWeight: 600,
                      display: "flex",
                      height: "40px",

                      alignItems: "center",
                    }}
                    className="input-feedback flex text-red-600  items-center mt-3"
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <ErrorOutlineIcon />
                    </span>
                    <span
                      style={{
                        marginLeft: "1%",
                        paddingTop: "0px",
                        marginTop: "0px",
                      }}
                      className="errorStyle"
                    >
                      {errors["password"]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              key={3}
              style={{
                padding: "0px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                marginBottom: "1em",
              }}
              className={`bg-white allBoxElement`}

              // className={`bg-white morePadding`}
            >
              <div style={{ width: "95%" }}>
                <label
                  htmlFor={otp}
                  style={{
                    display: "block",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "19px",
                    padding: "0px",
                    paddingBottom: "8px",
                  }}
                  className="inputLabelv inputLabelStylev "
                >
                  {"OTP"}
                </label>

                <input
                  id={3}
                  autoComplete="on"
                  name={"otp"}
                  placeholder={`Your Answer`}
                  type={"number"}
                  onInput={handleInput}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setErrors({});
                  }}
                  style={{
                    border: errors["otp"]
                      ? "2px solid #DC2626"
                      : "1px solid #D2D5DA",
                    width: "95%",
                    height: "46px",
                    paddingLeft: "10px",
                  }}
                  className={`focus:outline-none inputStylev ${
                    errors["otp"] ? "text-input error" : "text-input"
                  }`}
                />
                {errors["otp"] && (
                  <div
                    style={{
                      color: "#DC2626",
                      fontWeight: 600,
                      display: "flex",
                      height: "40px",

                      alignItems: "center",
                    }}
                    className="input-feedback flex text-red-600  items-center mt-3"
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <ErrorOutlineIcon />
                    </span>
                    <span
                      style={{
                        marginLeft: "1%",
                        paddingTop: "0px",
                        marginTop: "0px",
                      }}
                      className="errorStyle"
                    >
                      {errors["otp"]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {urlError && (
              <div
                style={{
                  color: "#DC2626",
                  fontWeight: 600,
               
                  display: "flex",
                  height: "40px",
                  justifyContent: "center",

                  alignItems: "center",
                }}
                className="input-feedback flex text-red-600  items-center mt-3"
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ErrorOutlineIcon />
                </span>
                <span
                  style={{
                    marginLeft: "1%",
                    paddingTop: "0px",
                    marginTop: "0px",
                  }}
                  className="errorStyle"
                >
                  {"Invalid Username or Password"}
                </span>
              </div>
            )}
            <div
              style={{
                width: "100%",

                padding: "0px",
                margin: "0px",
                marginBottom: "1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "95%",
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "flex",
                  padding: "0px",
                  margin: "0px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {registrationProcess == false ? (
                  <p
                    variant="contained"
                    onClick={async () => {
                      await handleGenerateQr();
                    }}
                    style={{
                      color: "#107BE5",

                      fontFamily: "Roboto",
                      cursor: "pointer",
                      padding: "0px",
                      margin: "0px",
                      textDecoration: "none",
                      textTransform: "none",
                    }}
                  >
                    Register for OTP
                  </p>
                ) : (
                  <CircularProgress />
                )}
              </div>
            </div>

            {qrcode ? (
              <div
                style={{
                  width: "100%",
                  marginBottom: "1em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      color: "black",

                      fontSize: "20px",

                      fontWeight: "bold",
                      fontFamily: "Roboto",
                      cursor: "pointer",
                      padding: "0px",
                      margin: "0px",
                      marginBottom: "1em",
                      textDecoration: "none",
                      textTransform: "none",
                    }}
                  >
                    {" "}
                    Scan QR code for OTP
                  </p>
                  <img
                    src={qrcode}
                    alt="qrcode"
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {postError && (
              <div
                style={{
                  color: "#DC2626",
                  fontWeight: 600,
                  display: "flex",
                  height: "40px",
                  justifyContent: "center",

                  alignItems: "center",
                }}
                className="input-feedback flex text-red-600  items-center mt-3"
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ErrorOutlineIcon />
                </span>
                <span
                  style={{
                    marginLeft: "1%",
                    paddingTop: "0px",
                    marginTop: "0px",
                  }}
                  className="errorStyle"
                >
                  {"Invalid Credentials"}
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",

                justifyContent: "center",
              }}
            >
              {postingData == false ? (
                <Button
                  className="submitBtnStyle"
                  variant="contained"
                  style={{
                    fontFamily: "Roboto",
                    borderRadius: "6px",
                    height: "46px",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                  onClick={async () => {
                    handlePostData();
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
