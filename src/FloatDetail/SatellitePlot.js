import Plot from "react-plotly.js";
import translateVar from "../translateVar";

const SatellitePlot = ({ plotData, vars, ylabel }) => {
  //Color of each variable
  const colors = ["#DC143C", "#4D86A3"];

  //Seperate series for each variable
  let series = [];
  vars.forEach((crtvar, indx) => {
    let data = {
      x: plotData.ProfileId,
      y: plotData[crtvar],
      type: "bar",
      hovertemplate: `%{y}`,
      name: translateVar(crtvar),
      marker: {
        color: colors[indx],
      },
    };

    series.push(data);
  });

  //Return Plot
  return (
    <Plot
      className="col"
      data={series}
      layout={{
        xaxis: {
          title: "Cycle",
          linecolor: "black",
          linewidth: 1,
          mirror: true,
          zeroline: false,
        },
        yaxis: {
          title: ylabel,
          linewidth: 1,
          linecolor: "black",
          mirror: true,
        },
        barmode: "overlay",
        showlegend: true,
        height: 500,
        plot_bgcolor: "#EDEDED",
        margin: { t: 30, l: 60, r: 30, b: 40 },
      }}
      config={{ responsive: true }}
    />
  );
};

export default SatellitePlot;
