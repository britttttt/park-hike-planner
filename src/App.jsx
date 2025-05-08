import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "/auth/Login";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Register } from "/auth/Register";


export const App = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register/>} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews/>
          </Authorized>
        }
      />
    </Routes>
  );
};