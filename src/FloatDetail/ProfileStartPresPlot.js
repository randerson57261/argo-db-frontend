import Plot from "react-plotly.js";

const ProfileStartPresPlot = ({ plotData }) => {
  //Reformat data plotly
  let series = {
    x: plotData.PROFILE_ID,
    y: plotData.PRES,
    type: "bar",
    hovertemplate: "%{y}",
    name: "",
    marker: {
      color: "c42323",
    },
  };

  //Return Plot
  return (
    <Plot
      className="col"
      data={[series]}
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
          range: [2100, 0],
        },
        showlegend: false,
        height: 500,
        plot_bgcolor: "#EDEDED",
        margin: { t: 30, l: 60, r: 30, b: 40 },
        barmode: "group",
        bargap: 0.1,
        bargroupgap: 0.1,
      }}
      config={{ responsive: true }}
    />
  );
};

export default ProfileStartPresPlot;
