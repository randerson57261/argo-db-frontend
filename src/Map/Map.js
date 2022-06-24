import SelectFloats from "../SelectFloats";
import { useState } from "react";
import PlotMap from "./PlotMap";
import { API_URL } from "../App";

const Map = () => {
  const [selectedFloats, setSelectedFloats] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  return (
    <div>
      <PlotMap
        selectedFloats={selectedFloats}
        loadingData={loadingData}
        setLoadingData={setLoadingData}
      />
      <div className="col-2">
        <SelectFloats selectedFloats={selectedFloats} setSelectedFloats={setSelectedFloats} />
      </div>
      <div className="col">
        <div className={`loading-spinner ${loadingData ? "" : "hide-component"}`}></div>
      </div>
    </div>
  );
};

export default Map;
