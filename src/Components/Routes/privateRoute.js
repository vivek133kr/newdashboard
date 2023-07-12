import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

  let [CounsellorData, setCounsellorData] = useState(JSON.parse(localStorage.getItem("CounsellorData")));
  if (!CounsellorData ||CounsellorData.token && CounsellorData.token === null) {
    return <Navigate to={`/finance/login`} />;
  }
  return children;
};
