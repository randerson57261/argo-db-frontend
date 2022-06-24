import SelectFloats from "../SelectFloats";
import SelectVar from "../SelectVar";
import { useState } from "react";
import PlotCompareProfiles from "./PlotCompareProfiles";

const CompareLatestProfiles = () => {
  const [selectedVar, setVar] = useState({ value: "PSAL", label: "Salinity" });
  const [selectedFloats, setSelectedFloats] = useState([]);

  return (
    <div className="container-fluid ml-4 pt-3">
      <div className="row full-plot">
        <div className="col-2">
          <div className="row">
            <h2>Compare Latest Profiles</h2>
          </div>
          <label>Floats</label>
          <div className="row ml-0">
            <SelectFloats selectedFloats={selectedFloats} setSelectedFloats={setSelectedFloats} />
          </div>
          <label>Variable</label>
          <div className="row ml-0">
            <SelectVar selectedVar={selectedVar} setVar={setVar} />
          </div>
          <div className="row mt-5"></div>
          <div className="row ml-0">
            <p>
              Some profiles may be off the scale. Click "Autoscale" in upper right of plot to see
              all profiles.
            </p>
          </div>
        </div>
        <PlotCompareProfiles selectedFloats={selectedFloats} selectedVar={selectedVar} />
      </div>
    </div>
  );
};

export default CompareLatestProfiles;
