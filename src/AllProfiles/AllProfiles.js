import { useState } from "react";
import SelectYear from "../SelectYear";
import SelectVar from "../SelectVar";
import PlotAllProfiles from "./AllPlots";

const AllProfiles = () => {
  const [year, setYear] = useState({ value: "2022", label: "2022" });
  const [selectedVar, setVar] = useState({ value: "PSAL", label: "Salinity" });

  return (
    <div className="container-fluid ml-4 pt-3">
      <div className="row">
        <h2>All Profiles</h2>
      </div>
      <div className="row">
        <div className="col-2">
          <label>Floats</label>
          <div className="row ml-0">
            <SelectYear year={year} setYear={setYear} />
          </div>
          <label>Variable</label>
          <div className="row ml-0">
            <SelectVar selectedVar={selectedVar} setVar={setVar} />
          </div>
          <div className="row mt-5"></div>
        </div>
        <div className="col plot" id="plot">
          <PlotAllProfiles year={year} selectedVar={selectedVar} />
        </div>
      </div>
    </div>
  );
};

export default AllProfiles;
