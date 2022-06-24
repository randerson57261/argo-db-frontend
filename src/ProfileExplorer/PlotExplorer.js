import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import translateVar from "../translateVar";
import getRanges from "../getRanges";
import Gradient from "javascript-color-gradient";

const PlotExplorer = ({ profiles, topVar, botVar }) => {
  const [topSeries, setTopSeries] = useState(null);
  const [botSeries, setBotSeries] = useState(null);

  //Run function to get plot data
  useEffect(() => {
    if (profiles.length > 0) {
      requestData(profiles, topVar, botVar);
    }
  }, [profiles, topVar, botVar]);

  //Function for getting data for plots
  async function requestData(profiles, topVar, botVar) {
    //Get data
    const profilesParam = profiles.map((e) => e.value).join();

    const res = await fetch(
      `http://127.0.0.1:8000/FE/profile_explorer_data?profiles=${profilesParam}&top_var=${topVar.value}&bot_var=${botVar.value}`,
      {
        mode: "cors",
      }
    );
    const resdata = await res.json();
    console.log(resdata);

    const top_data = resdata["TOP_DATA"];
    const bot_data = resdata["BOTTOM_DATA"];

    //Reformat data for plotly
    //Top axis data
    if (top_data) {
      //Generate colors for each series
      const colors = new Gradient()
        .setColorGradient("#B295CB", "#3600A1")
        .setMidpoint(top_data.length)
        .getColors();

      //Top axis continuous series
      let top_con_data = top_data.map((e, index) => ({
        x: e["CON_" + topVar.value],
        y: e.CON_PRES,
        type: "scatter",
        mode: "lines",
        hovertemplate: `Profile: ${e.PROFILE_ID.split(".")[1]}`,
        name: `SN: ${e.SN}`,
        marker: {
          color: colors[index],
        },
        xaxis: "x2",
      }));

      //Top axis discrete series
      let top_dis_data = top_data.map((e, index) => ({
        x: e["DIS_" + topVar.value],
        y: e.DIS_PRES,
        type: "scatter",
        mode: "markers",
        hovertemplate: `Profile: ${e.PROFILE_ID.split(".")[1]}`,
        name: `SN: ${e.SN}`,
        marker: {
          color: colors[index],
        },
        xaxis: "x2",
      }));
      setTopSeries(top_con_data.concat(top_dis_data));
    }

    if (bot_data) {
      //Generate colors for each series
      const colors = new Gradient()
        .setColorGradient("#A6ADCE", "#032FF1")
        .setMidpoint(bot_data.length)
        .getColors();

      //Bottom axis continuous series
      let bot_con_data = bot_data.map((e, index) => ({
        x: e["CON_" + botVar.value],
        y: e.CON_PRES,
        type: "scatter",
        mode: "lines",
        hovertemplate: `Profile: ${e.PROFILE_ID.split(".")[1]}`,
        name: `SN: ${e.SN}`,
        marker: {
          color: colors[index],
        },
      }));

      //Bottom axis discrete series
      let bot_dis_data = bot_data.map((e, index) => ({
        x: e["DIS_" + botVar.value],
        y: e.DIS_PRES,
        type: "scatter",
        mode: "markers",
        hovertemplate: `Profile: ${e.PROFILE_ID.split(".")[1]}`,
        name: `SN: ${e.SN}`,
        marker: {
          color: colors[index],
        },
      }));
      setBotSeries(bot_con_data.concat(bot_dis_data));
    }
  }

  let plotlyData = null;
  //Return Plot
  if (profiles.length === 0) {
    plotlyData = null;
  } else if ((topSeries === null) & (botSeries === null)) {
    plotlyData = null;
  } else if ((topSeries === null) & (botSeries !== null)) {
    plotlyData = botSeries;
  } else if ((topSeries !== null) & (botSeries === null)) {
    plotlyData = topSeries;
  } else {
    plotlyData = botSeries.concat(topSeries);
  }

  //Return plot
  return (
    <Plot
      className="col"
      data={plotlyData}
      layout={{
        xaxis: {
          title: translateVar(botVar.value),
          titlefont: {
            color: "#032FF1",
          },
          tickfont: {
            color: "#032FF1",
          },
          linewidth: 1,
          linecolor: "#032FF1",
          mirror: true,
          zeroline: false,
          range: getRanges(botVar.value),
        },
        yaxis: {
          title: "Pressure",
          linewidth: 1,
          linecolor: "black",
          mirror: true,
          range: [2000, 0],
        },
        xaxis2: {
          title: {
            text: translateVar(topVar.value),
            standoff: 0,
          },
          titlefont: {
            color: "#3600A1",
          },
          tickfont: {
            color: "#3600A1",
          },
          anchor: "free",
          overlaying: "x",
          side: "top",
          position: 1,
          range: getRanges(topVar.value),
          showline: false,
          showgrid: false,
        },
        showlegend: false,
        plot_bgcolor: "#EDEDED",
        margin: { t: 30, l: 60, r: 30, b: 40 },
      }}
      config={{ responsive: true }}
    />
  );
};

export default PlotExplorer;
