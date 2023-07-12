import { createContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const DataContext = createContext({
 loginSuccess:"",
 handleLoginSuccess:()=>{},
 counsellorData:{},

 handleCounsellorData:()=>{}
});
export const DataContextProvider = ({ children }) => {
  
   let [loginSuccess, setLoginSuccess] = useState(false);
   let [counsellorData, setCounsellorData] = useState(JSON.parse(localStorage.getItem("CounsellorData")))

   console.log(counsellorData , " line 1dfsdfsdfdsf7");
   
  

   let handleLoginSuccess = () =>{

    setLoginSuccess(!loginSuccess);
   }
   let handleCounsellorData = (data) =>{
     setCounsellorData(data)
   }
  return (
    <DataContext.Provider
      value={{
        loginSuccess,
       handleLoginSuccess,
       counsellorData,
       handleCounsellorData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
