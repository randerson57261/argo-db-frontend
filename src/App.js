import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Deployed from "./Deployed";
import Predeployed from "./Predeployed";
import ProfileExplorer from "./ProfileExplorer/ProfileExplorer";
import LatestProfiles from "./LatestProfiles/LatestProfiles";
import AllProfiles from "./AllProfiles/AllProfiles";
import CompareLatestProfiles from "./CompareLatestProfiles/CompareLatestProfiles";
import Map from "./Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "rsuite-table/dist/css/rsuite-table.min.css";

const App = () => {
  return (
    <div>
      <Router>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route exact path="/" element={<Deployed />} />
          <Route exact path="/floats_predeployment" element={<Predeployed />} />
          <Route exact path="/profile_explorer" element={<ProfileExplorer />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/latest_profiles" element={<LatestProfiles />} />
          <Route exact path="/all_profiles" element={<AllProfiles />} />
          <Route exact path="/compare_latest_profiles" element={<CompareLatestProfiles />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
