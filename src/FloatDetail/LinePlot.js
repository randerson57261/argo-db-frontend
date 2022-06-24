import Plot from "react-plotly.js";
import translateVar from "../translateVar";

const LinePlot = ({ plotData, hovData, vars, ylabel, range, legend = true }) => {
  let series = [];
  //Seperate series for each variable
  vars.forEach((crtvar) => {
    //Reformat data plotly
    let data = {
      x: plotData.ProfileId,
      y: plotData[crtvar],
      type: "scatter",
      mode: "lines",
      customdata: hovData,
      hovertemplate: "%{y:.2f}<br>%{customdata[0]}",
      name: translateVar(crtvar),
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
          range: range,
        },
        showlegend: legend,
        height: 500,
        plot_bgcolor: "#EDEDED",
        margin: { t: 30, l: 60, r: 30, b: 40 },
      }}
      config={{ responsive: true }}
    />
  );
};

export default LinePlot;
