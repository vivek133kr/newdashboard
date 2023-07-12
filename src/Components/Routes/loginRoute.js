import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";

export const LoginRoute = ({ children }) => {
  let [CounsellorData, setCounsellorData] = useState(
    JSON.parse(localStorage.getItem("CounsellorData"))
  );
  if (
    CounsellorData !== undefined && CounsellorData !== null 
    
  ) {
    return <Navigate to={`/finance`} />;
  }
  return children;
};
