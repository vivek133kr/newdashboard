import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Dashboard/Home';
import Navbar from './Components/Navbar/Navbar';
import SignIn from './Components/Login/Login';
import SignUp from './Components/SignUp/Signup';
import { OTP } from './Components/OTP/otp';
import FormDetails from './Components/FormDetails/FormDetails';
import { PrivateRoute } from './Components/Routes/privateRoute';
import { LoginRoute } from './Components/Routes/loginRoute';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path={`/finance/login`}
          element={
            <LoginRoute>
              <SignIn />
            </LoginRoute>
          }
        />

        <Route path={`/finance/signup`} element={<SignUp />} />
        <Route path={`/finance/otp`} element={<OTP />} />
        <Route
          path={`/finance`}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path={`/finance-new`} element={<FormDetails />} />
      </Routes>
    </div>
  );
}

export default App;
