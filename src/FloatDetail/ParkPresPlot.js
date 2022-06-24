import Plot from "react-plotly.js";

const ParkPresPlot = ({ plotData }) => {
  let max_parks = Object.keys(plotData).length - 1;

  let series = [];
  //Seperate series for each variable
  for (let i = 0; i < max_parks; i++) {
    //Reformat data plotly
    let data = {
      x: plotData.PROFILE_ID,
      y: plotData[i],
      type: "bar",
      hovertemplate: "%{y}",
      name: "Park " + i,
      marker: {
        color: "c42323",
      },
    };

    series.push(data);
  }

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
          side: "top",
          //range: getRanges(selectedVar.value),
        },
        yaxis: {
          title: "Park Pressure (dbar)",
          linewidth: 1,
          linecolor: "black",
          mirror: true,
          range: [1100, 0],
        },
        showlegend: false,
        height: 500,
        plot_bgcolor: "#EDEDED",
        margin: { t: 30, l: 60, r: 30, b: 40 },
        barmode: "group",
      }}
      config={{ responsive: true }}
    />
  );
};

export default ParkPresPlot;
