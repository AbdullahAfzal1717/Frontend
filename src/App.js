import React, { useContext } from "react";
import "./App.scss";
import { AuthContext } from "./context/AuthContext";
import Routes from "./pages/Routes";
import "bootstrap/dist/js/bootstrap.bundle";
import ScreenLoader from "./components/ScreenLoader";
// import Footer from './components/Footer'

function App() {
  const { isAppLoading } = useContext(AuthContext);
  // console.log(isAppLoading);
  return <>{!isAppLoading ? <Routes /> : <ScreenLoader />}</>;
}

export default App;
