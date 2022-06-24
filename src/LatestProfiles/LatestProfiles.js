import { useState } from "react";
import SelectYear from "../SelectYear";
import SelectMultiVars from "../SelectMultiVars";
import PlotLatestProfiles from "./PlotLatestProfiles";

const LatestProfiles = () => {
  const [year, setYear] = useState({ value: "2022", label: "2022" });
  const [vars, setVars] = useState([
    { value: "PSAL", label: "Salinity" },
    { value: "TEMP", label: "Temperature" },
  ]);

  return (
    <div className="container-fluid ml-4 pt-3">
      <div className="row">
        <h2>Latest Profiles</h2>
      </div>
      <div className="row">
        <div className="col-2">
          <label>Floats</label>
          <div className="row ml-0">
            <SelectYear year={year} setYear={setYear} />
          </div>
          <label>Variable</label>
          <div className="row ml-0">
            <SelectMultiVars vars={vars} setVars={setVars} />
          </div>
          <div className="row mt-5"></div>
        </div>
        <div className="col plot" id="plot">
          <PlotLatestProfiles year={year} vars={vars} />
        </div>
      </div>
    </div>
  );
};

export default LatestProfiles;
