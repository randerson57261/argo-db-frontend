import { useState } from "react";
import SelectVar from "../SelectVar";
import SelectProfiles from "../SelectProfiles";
import PlotExplorer from "./PlotExplorer";

const ProfileExplorer = () => {
  //Selections
  const [topVar, setTopVar] = useState({ value: null, label: null });
  const [botVar, setBotVar] = useState({ value: null, label: null });
  const [profiles, setProfiles] = useState([]);

  return (
    <div className="container-fluid ml-4 pt-3">
      <div className="row full-plot">
        <div className="col-2">
          <div className="row">
            <h2>Profile Explorer</h2>
          </div>
          <label>Profiles</label>
          <div className="row ml-0">
            <SelectProfiles profiles={profiles} setProfiles={setProfiles} />
          </div>
          <label>Top Axis</label>
          <div className="row ml-0">
            <SelectVar selectedVar={topVar} setVar={setTopVar} clearable={true} />
          </div>
          <label>Bottom Axis</label>
          <div className="row ml-0">
            <SelectVar selectedVar={botVar} setVar={setBotVar} clearable={true} />
          </div>
          <div className="row mt-5"></div>
        </div>
        <PlotExplorer profiles={profiles} topVar={topVar} botVar={botVar} />
      </div>
    </div>
  );
};

export default ProfileExplorer;
