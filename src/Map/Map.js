import SelectFloats from "../SelectFloats";
import { useState } from "react";
import PlotMap from "./PlotMap";

const Map = () => {
  const [selectedFloats, setSelectedFloats] = useState([]);

  return (
    <div>
      <PlotMap selectedFloats={selectedFloats} />
      <div className="col-2">
        <SelectFloats selectedFloats={selectedFloats} setSelectedFloats={setSelectedFloats} />
      </div>
      {/* <div className="spinner-border overlay" role="status" id="mapspinner">
        <span className="sr-only">Loading...</span>
      </div> */}
    </div>
  );
};

export default Map;
