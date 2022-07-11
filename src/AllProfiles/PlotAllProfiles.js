import Plot from "react-plotly.js";
import { useState, useEffect, useContext } from "react";
import translateVar from "../translateVar";
import getRanges from "../getRanges";
import { API_URL } from "../App";
import Gradient from "javascript-color-gradient";

const PlotAllProfiles = ({ year, selectedVar }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [apiData, setApiData] = useState(null);
  const url = useContext(API_URL);

  //Run function to get plot data
  useEffect(() => {
    setLoadingData(true);
    requestData(year, selectedVar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, selectedVar]);

  //Get data for plots
  async function requestData(year, selectedVar) {
    const res = await fetch(
      `${url}/FE/all_profiles_data?year=${year.value}&var_selected=${selectedVar.value}`,
      {
        mode: "cors",
      }
    );
    const apiData = await res.json();

    setApiData(apiData);
    setLoadingData(false);
  }

  let plots = [];
  let dom_content = [];
  if (apiData) {
    //Loop through each float
    apiData.forEach((crtFloat) => {
      //Loop through each profile
      let single_plot_traces = [];
      //Continuous data series, each profile
      if (crtFloat["x"] != null) {
        // if no continuous data (nitrate)

        //Generate colors for each series
        const colors = new Gradient()
          .setColorGradient("#B295CB", "#3600A1")
          .setMidpoint(crtFloat["x"].length)
          .getColors();

        for (let i = 0; i < crtFloat["x"].length; i++) {
          const result = {
            x: crtFloat["x"][i],
            y: crtFloat["y"][i],
            type: "scatter",
            mode: "lines",
            hovertemplate: `X: %{x}<br>PRES: %{y:.0f}`,
            marker: {
              color: colors[i],
            },
            name: `Profile: ${crtFloat["CYCLE_ID"][i]}<br>${crtFloat["TIME_START_PROFILE"][i]}`,
          };
          single_plot_traces.push(result);
        }
      }

      //Discrete data series, each profile
      if (selectedVar !== "NITRATE") {
        for (let i = 0; i < crtFloat["dis_x"].length; i++) {
          const result = {
            x: crtFloat["dis_x"][i],
            y: crtFloat["dis_y"][i],
            type: "scatter",
            mode: "markers",
            marker: {
              color: crtFloat["continuous_colors"][i],
            },
            hovertemplate: `X: %{x}<br>PRES: %{y:.0f}`,
            name: `Profile: ${crtFloat["CYCLE_ID"][i]}<br>${crtFloat["TIME_START_PROFILE"][i]}`,
          };
          single_plot_traces.push(result);
        }
      }

      //Create single plot
      const plot = (
        <Plot
          data={single_plot_traces}
          layout={{
            xaxis: {
              title: translateVar(selectedVar.value),
              linecolor: "black",
              linewidth: 1,
              mirror: true,
              zeroline: false,
              range: getRanges(selectedVar),
            },
            yaxis: {
              title: "Pressure",
              linewidth: 1,
              linecolor: "black",
              mirror: true,
              range: [2000, 0],
            },
            showlegend: false,
            height: 750,
            plot_bgcolor: "#EDEDED",
            margin: { t: 30, l: 60, r: 30, b: 40 },
            annotations: [
              {
                xref: "paper",
                yref: "paper",
                x: 0.02,
                xanchor: "left",
                y: 1,
                yanchor: "bottom",
                text: `WMO: ${crtFloat["wmo"]}   SN: ${crtFloat["sn"]}`,
                showarrow: false,
              },
            ],
          }}
          config={{ responsive: true }}
        />
      );
      plots.push(plot);
    });

    //Create layout (rows of plots)
    const n = apiData.length;

    for (let i = 0; i < n; i += 2) {
      if (i < n) {
        dom_content.push(
          <div key={"row" + i} className="row">
            <div className="col row">{plots[i]}</div>
            <div className="col row">{plots[i + 1]}</div>
          </div>
        );
      } else {
        //last row if odd # of plots
        dom_content.push(
          <div key={"row" + i} className="row">
            <div className="col row">{plots[i]}</div>
            <div className="col row"></div>
          </div>
        );
      }
    }
  }

  //Return spinner or plots
  if (loadingData) {
    return (
      <div>
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return <div>{dom_content}</div>;
  }
};

export default PlotAllProfiles;
