import Plot from "react-plotly.js";
import translateVar from "../translateVar";

const SurfaceDurationPlot = ({ plotData, hovData }) => {
  //Variables to include
  const vars = ["GPS_DURATION_plotly", "TRANS_DURATION_plotly"];

  //Color of each variable
  const colors = {
    GPS_DURATION_plotly: "#A65132",
    TRANS_DURATION_plotly: "#3C7373",
  };

  //Tick mark positions
  let tickvals = [];
  let startdate = new Date("1970-01-01T00:00:00");
  const enddate = new Date("1970-01-02T00:00:00");
  while (startdate < enddate) {
    tickvals.push(new Date(startdate));
    startdate.setTime(startdate.getTime() + 20 * 60000);
  }

  //Tick mark text
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  let ticktext = tickvals.map(function (crt) {
    return zeroPad(crt.getHours(), 2) + ":" + zeroPad(crt.getMinutes(), 2);
  });

  //Seperate series for each variable
  let series = [];
  vars.forEach((crtvar, indx) => {
    let data = {
      x: plotData.ProfileId,
      y: plotData[crtvar],
      type: "bar",
      customdata: hovData,
      hovertemplate: `%{customdata[${indx}]}`,
      name: translateVar(crtvar),
      marker: {
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
          title: "Surface Duration (HH:MM)",
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

export default SurfaceDurationPlot;
