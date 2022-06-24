import Plot from "react-plotly.js";
import { useState, useEffect, useContext } from "react";
import translateVar from "../translateVar";
import getRanges from "../getRanges";
import Gradient from "javascript-color-gradient";
import { API_URL } from "../App";

const PlotCompareProfiles = ({ selectedFloats, selectedVar }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);
  const url = useContext(API_URL);

  //Run function to get plot data
  useEffect(() => {
    requestData(selectedFloats, selectedVar);
  }, [selectedFloats, selectedVar]);

  //Function for getting data for plots
  async function requestData(selectedFloats, selectedVar) {
    //Get data
    const floatParam = selectedFloats.map((e) => e.value).join();

    const res = await fetch(
      `${url}/FE/compare_latest_profiles_data?var_selected=${selectedVar.value}&deployments=${floatParam}`,
      {
        mode: "cors",
      }
    );
    const resdata = await res.json();

    //Generate colors for each series
    const colors = new Gradient()
      .setColorGradient("#ab00a7", "#2bc7e4", "#000000")
      .setMidpoint(resdata.length)
      .getColors();

    //Reformat data for plotly
    let con_data = resdata.map((e, index) => ({
      x: e["CON_" + selectedVar.value],
      y: e.CON_PRES,
      type: "scatter",
      mode: "lines",
      hovertemplate: `${selectedVar.value}: %{x}<br>PRES: %{y:.0f}`,
      name: `SN: ${e.SN}`,
      marker: {
        color: colors[index],
      },
    }));

    let dis_data = resdata.map((e, index) => ({
      x: e["DIS_" + selectedVar.value],
      y: e.DIS_PRES,
      type: "scatter",
      mode: "markers",
      hovertemplate: `${selectedVar.value}: %{x}<br>PRES: %{y:.0f}`,
      name: `SN: ${e.SN}`,
      marker: {
        color: colors[index],
      },
    }));

    setData(con_data.concat(dis_data));
    setLoadingData(false);
  }

  //Return Plot
  if (loadingData) {
    return (
      <div className="col">
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <Plot
        className="col"
        data={data}
        layout={{
          xaxis: {
            title: translateVar(selectedVar.value),
            linecolor: "black",
            linewidth: 1,
            mirror: true,
            zeroline: false,
            range: getRanges(selectedVar.value),
          },
          yaxis: {
            title: "Pressure",
            linewidth: 1,
            linecolor: "black",
            mirror: true,
            range: [2000, 0],
          },
          showlegend: false,
          //width: plotWidth - 100,
          //height: 800,
          plot_bgcolor: "#EDEDED",
          margin: { t: 30, l: 60, r: 30, b: 40 },
        }}
        config={{ responsive: true }}
      />
    );
  }
};

export default PlotCompareProfiles;
