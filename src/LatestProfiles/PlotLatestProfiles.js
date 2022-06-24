import Plot from "react-plotly.js";
import { useState, useEffect, useContext } from "react";
import getRanges from "../getRanges";
import { API_URL } from "../App";

const PlotLatestProfiles = ({ year, vars }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [apiData, setApiData] = useState(null);
  const url = useContext(API_URL);

  //Run function to get plot data
  useEffect(() => {
    requestData(year);
  }, [year]);

  //Get data for plots
  async function requestData(year) {
    const res = await fetch(`${url}/FE/latest_profiles_data?year=${year.value}`, {
      mode: "cors",
    });
    const apiData = await res.json();

    setApiData(apiData);
    setLoadingData(false);
  }

  const axis = {
    TEMP: "x4",
    PSAL: "x",
    DOXY: "x5",
    CHLA: "x8",
    BBP700: "x2",
    PH_IN_SITU_TOTAL: "x7",
    NITRATE: "x6",
    CDOM: "x3",
    VRS_PH: null,
    VK_PH: null,
    IB_PH: null,
    IK_PH: null,
  };

  const colors = {
    TEMP: "#c9324e",
    PSAL: "#FEBD17",
    DOXY: "#1f77b4",
    CHLA: "#43b53b",
    BBP700: "#343c91",
    PH_IN_SITU_TOTAL: "#a8018c",
    NITRATE: "#bc925a",
    CDOM: "#023440",
    VRS_PH: null,
    VK_PH: null,
    IB_PH: null,
    IK_PH: null,
  };

  let plots = [];
  let dom_content = [];
  if (apiData) {
    //Loop through each float
    apiData.forEach((crtFloat) => {
      //Loop through each selected variable
      let single_plot_traces = [];
      vars.forEach((crtVar) => {
        const trace = {
          x: crtFloat.CONTINUOUS_DATA[crtVar.value],
          y: crtFloat.CONTINUOUS_DATA.PRES,
          type: "scatter",
          mode: "lines",
          hovertemplate: `${crtVar.value}: %{x}<br>PRES: %{y:.0f}`,
          name: crtVar.label,
          marker: {
            color: colors[crtVar.value],
          },
          xaxis: axis[crtVar.value],
        };
        single_plot_traces.push(trace);
      });

      //Create single plot
      const plot = (
        <Plot
          data={single_plot_traces}
          layout={{
            yaxis: {
              domain: [0.2, 0.78],
              title: "Pressure",
              linewidth: 1,
              linecolor: "black",
              mirror: true,
              range: [2000, 0],
            },
            xaxis: {
              title: {
                text: "Practical Salinity",
                standoff: 0,
              },
              titlefont: {
                color: colors["PSAL"],
              },
              tickfont: {
                color: colors["PSAL"],
              },
              position: 0.2,
              range: getRanges("PSAL"),
              showline: true,
              linewidth: 1,
              linecolor: colors["PSAL"],
            },

            xaxis2: {
              title: {
                text: "Particle Backscattering at 700 nm (m<sup>-1</sup>}",
                standoff: 0,
              },
              titlefont: {
                color: colors["BBP700"],
              },
              tickfont: {
                color: colors["BBP700"],
              },
              anchor: "free",
              overlaying: "x",
              side: "bottom",
              position: 0.14,
              range: getRanges("BBP700"),
              showline: true,
              linewidth: 1,
              linecolor: colors["BBP700"],
              showgrid: false,
            },

            xaxis3: {
              title: {
                text: "Coloured Dissolved Organic Matter (ppb)",
                standoff: 0,
              },
              titlefont: {
                color: colors["CDOM"],
              },
              tickfont: {
                color: colors["CDOM"],
              },
              anchor: "free",
              overlaying: "x",
              side: "bottom",
              position: 0.07,
              range: getRanges("CDOM"),
              showline: true,
              linewidth: 1,
              linecolor: colors["CDOM"],
              showgrid: false,
            },
            xaxis4: {
              title: {
                text: "In-situ Temperature (°C)",
                standoff: 0,
              },
              titlefont: {
                color: colors["TEMP"],
              },
              tickfont: {
                color: colors["TEMP"],
              },
              anchor: "free",
              overlaying: "x",
              side: "top",
              position: 0.78,
              range: getRanges("TEMP"),
              showline: true,
              linewidth: 1,
              linecolor: colors["TEMP"],
              showgrid: false,
            },
            xaxis5: {
              title: {
                text: "Dissolved Oxygen (μmol/kg)",
                standoff: 0,
              },
              titlefont: {
                color: colors["DOXY"],
              },
              tickfont: {
                color: colors["DOXY"],
              },
              anchor: "free",
              overlaying: "x",
              side: "top",
              position: 0.85,
              range: getRanges("DOXY"),
              showline: true,
              linewidth: 1,
              linecolor: colors["DOXY"],
              showgrid: false,
            },
            xaxis6: {
              title: {
                text: "Nitrate (μmol/kg)",
                standoff: 0,
              },
              titlefont: {
                color: colors["NITRATE"],
              },
              tickfont: {
                color: colors["NITRATE"],
              },
              anchor: "free",
              overlaying: "x",
              side: "top",
              position: 0.92,
              range: getRanges("NITRATE"),
              showline: true,
              linewidth: 1,
              linecolor: colors["NITRATE"],
              showgrid: false,
            },
            xaxis7: {
              title: {
                text: "In-situ pH (total)",
                standoff: 10,
              },
              titlefont: {
                color: colors["PH_IN_SITU_TOTAL"],
              },
              tickfont: {
                color: colors["PH_IN_SITU_TOTAL"],
              },
              anchor: "free",
              overlaying: "x",
              side: "top",
              position: 1,
              range: getRanges("PH_IN_SITU_TOTAL"),
              showline: true,
              linewidth: 1,
              linecolor: colors["PH_IN_SITU_TOTAL"],
              showgrid: false,
            },
            xaxis8: {
              title: {
                text: "Chlorophyll a (mg/m<sup>3</sup>)",
                standoff: 10,
              },
              titlefont: {
                color: colors["CHLA"],
              },
              tickfont: {
                color: colors["CHLA"],
              },
              anchor: "free",
              overlaying: "x",
              side: "bottom",
              position: 0.0,
              range: getRanges("CHLA"),
              showline: true,
              linewidth: 1,
              linecolor: colors["CHLA"],
              showgrid: false,
            },

            showlegend: false,
            autosize: true,
            height: 800,
            plot_bgcolor: "#EDEDED",
            margin: { t: 30, l: 60, r: 30, b: 40 },
          }}
          config={{ responsive: true }}
        />
      );
      plots.push(plot);
    });

    //Create layout (rows of plots)
    const n = apiData.length;

    for (let i = 2; i < n; i += 2) {
      if (i < n) {
        dom_content.push(
          <div key={"row" + i} className="row">
            <div className="col row">{plots[i]}</div>
            <div className="col row">{plots[i + 1]}</div>
          </div>
        );
      } else {
        dom_content.push(
          <div key={"row" + i} className="row">
            <div className="col row">{plots[i]}</div>
            <div className="col row"></div>
          </div>
        );
      }
    }
  }
  if (loadingData) {
    return (
      <div className="col">
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return <div>{dom_content}</div>;
  }
};

export default PlotLatestProfiles;
