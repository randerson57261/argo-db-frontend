import { useState, useEffect } from "react";
import { Viewer, Entity, Camera, CameraFlyTo } from "resium";
import { Cartesian2, Cartesian3, Color, LabelStyle, VerticalOrigin } from "cesium";

const PlotMap = ({ selectedFloats }) => {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  //Run function to get map data
  useEffect(() => {
    requestData(selectedFloats);
  }, [selectedFloats]);

  //Function for getting data for map
  async function requestData(selectedFloats) {
    //Get data
    const floatParam = selectedFloats.map((e) => e.value).join();

    const res = await fetch(`http://127.0.0.1:8000/FE/map_data?deployments=${floatParam}`, {
      mode: "cors",
    });
    const resdata = await res.json();
    console.log(resdata);

    //add points and lines
    add_points(resdata);
    add_lines(resdata);
  }

  //Hide loading spinner once basemap has loaded
  // viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (queuedTileCount) {
  //   if (viewer.scene.globe.tilesLoaded) {
  //     hideSpinner();
  //   }
  // });

  //Allows js to run in infobox (link to float detail page)
  // viewer.infoBox.frame.setAttribute(
  //   "sandbox",
  //   "allow-same-origin allow-popups allow-forms allow-scripts"
  // );
  // viewer.infoBox.frame.src = "about:blank";

  // function hideSpinner() {
  //   var spinner = document.getElementById("mapspinner"); //Loading spinner
  //   spinner.style.display = "none";

  //   var spinner = document.getElementById("cesiumContainer"); //Loading spinner
  //   spinner.style.opacity = 1;
  // }

  function add_points(deployments) {
    //Adds points to map
    let newpoints = [];
    deployments.forEach(function (item, index) {
      const newentity = (
        <Entity
          name={item["sn"]}
          position={Cartesian3.fromDegrees(item["long"], item["lat"])}
          point={{
            pixelSize: 8,
            color: Color.fromCssColorString("#ffd30fff"),
            outlineColor: Color.BLACK,
            outlineWidth: 1,
          }}
          label={{
            text: item["sn"],
            font: "12pt arial",
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9),
          }}
          description={
            "<h3>WMO</h3><p>" +
            item["wmo"] +
            "</p>" +
            "<h3>Current Position</h3>" +
            "<p>Lat: " +
            item["lat"] +
            " Long: " +
            item["long"] +
            "</p>" +
            "<a target='_blank' href='/float_detail?FLOAT_SERIAL_NO=" +
            item["sn"] +
            "&PLATFORM_TYPE=NAVIS_EBR'>Float Detail Page</a>"
          }
        />
      );
      newpoints.push(newentity);
    });
    setPoints(newpoints);
  }

  function add_lines(deployments) {
    let newlines = [];
    deployments.forEach(function (item, index) {
      const newentity = (
        <Entity
          polyline={{
            positions: Cartesian3.fromDegreesArray(item["hist_positions"]),
            width: 1,
            material: Color.WHITE,
          }}
        />
      );
      newlines.push(newentity);
    });
    setLines(newlines);
  }

  //Return Plot
  return (
    <Viewer
      className="pt-5 mt-4"
      full
      geocoder={true}
      homeButton={true}
      sceneModePicker={false}
      baseLayerPicker={false}
      fullscreenButton={true}
      navigationHelpButton={false}
      animation={false}
      timeline={false}
      fulllscreenButtond={false}
      vrButton={false}
      infoBox={true}
    >
      <Camera defaultZoomAount={0} />
      <CameraFlyTo duration={0} destination={Cartesian3.fromDegrees(-40, 26, 20000000)} />
      {points}
      {lines}
    </Viewer>
  );
};

export default PlotMap;
