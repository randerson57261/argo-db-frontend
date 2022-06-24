import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import NavBar from "./NavBar";
import Deployed from "./Deployed";
import Predeployed from "./Predeployed";
import FloatTracking from "./FloatTracking";
import SensorQC from "./SensorQC";
import SerialNumbers from "./SerialNumbers";
import ProfileExplorer from "./ProfileExplorer/ProfileExplorer";
import LatestProfiles from "./LatestProfiles/LatestProfiles";
import AllProfiles from "./AllProfiles/AllProfiles";
import CompareLatestProfiles from "./CompareLatestProfiles/CompareLatestProfiles";
import Map from "./Map/Map";
import FloatDetail from "./FloatDetail/FloatDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export const API_URL = createContext();

const App = () => {
  return (
    <API_URL.Provider value="http://127.0.0.1:8000">
      <div>
        <Router>
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route exact path="/" element={<Deployed />} />
            <Route exact path="/floats_predeployment" element={<Predeployed />} />
            <Route exact path="/floats_tracking" element={<FloatTracking />} />
            <Route exact path="/sensor_qc" element={<SensorQC />} />
            <Route exact path="/floats_serial_no" element={<SerialNumbers />} />
            <Route exact path="/profile_explorer" element={<ProfileExplorer />} />
            <Route exact path="/map" element={<Map />} />
            <Route exact path="/latest_profiles" element={<LatestProfiles />} />
            <Route exact path="/all_profiles" element={<AllProfiles />} />
            <Route exact path="/compare_latest_profiles" element={<CompareLatestProfiles />} />
            <Route exact path="/float_detail" element={<FloatDetail />} />
          </Routes>
        </Router>
      </div>
    </API_URL.Provider>
  );
};

export default App;
