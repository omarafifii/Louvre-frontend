import React from "react";
import Login from "./Login";
import HomeAdmin from "./HomeAdmin";
import Home from "./Home";

const MyRoutes = {
  "/": () => <Login />,
  "/home": () => <Home />,
  // "/contact": () => <Contact />
};
export default MyRoutes;