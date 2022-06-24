import Plot from "react-plotly.js";
import translateVar from "../translateVar";

const DurationPlot = ({ plotData, hovData }) => {
  //Variables to include
  const vars = [
    "TimeStartDescent_delta",
    "GpsFixDate_delta",
    "TimeStartPark_delta",
    "TimeStartProfileDescent_delta",
    "TimeStartProfile_delta",
    "TimeStopProfile_delta",
    "TimeStartTelemetry_delta",
  ];

  //Color of each variable
  const colors = {
    TimeStartDescent_delta: "#99B0BF",
    GpsFixDate_delta: "#003659",
    TimeStartPark_delta: "#4D86A3",
    TimeStartProfileDescent_delta: "#65C0F0",
    TimeStartProfile_delta: "#F07D86",
    TimeStopProfile_delta: "#F0AB28",
    TimeStartTelemetry_delta: "#DC143C",
  };

  //Tick mark positions
  let tickvals = [];
  let startdate = new Date("1970-01-01T00:00:00");
  const enddate = new Date("1970-01-15T00:00:00");
  while (startdate < enddate) {
    tickvals.push(new Date(startdate));
    startdate.setDate(startdate.getDate() + 1);
  }

  //Tick mark text
  let ticktext = tickvals.map(function (crt) {
    return crt.getDate() - 1;
  });

  //Seperate series for each variable
  let series = [];
  vars.forEach((crtvar, indx) => {
    let data = {
      x: plotData.ProfileId,
      y: plotData[crtvar],
      type: "scatter",
      mode: "markers",
      customdata: hovData,
      hovertemplate: `%{customdata[${indx}]}`,
      name: translateVar(crtvar),
      marker: {
        size: 10,
        symbol: "square",
        color: colors[crtvar],
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
          title: "Phase Duration (days)",
          linewidth: 1,
          linecolor: "black",
          mirror: true,
          tickvals: tickvals,
          ticktext: ticktext,
        },
        showlegend: true,
        height: 500,
        plot_bgcolor: "#EDEDED",
        margin: { t: 30, l: 60, r: 30, b: 40 },
      }}
      config={{ responsive: true }}
    />
  );
};

export default DurationPlot;
