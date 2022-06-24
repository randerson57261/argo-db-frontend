import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import LinePlot from "./LinePlot";
import ParkPresPlot from "./ParkPresPlot";
import ProfileStartPresPlot from "./ProfileStartPresPlot";
import DurationPlot from "./DurationPlot";
import SurfaceDurationPlot from "./SurfaceDurationPlot";
import SatellitePlot from "./SatellitePlot";
import SelectOtherVar from "./SelectOtherVar";

const FloatDetail = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [otherData, setOtherData] = useState(null);

  const [deploymentData, setDeploymentData] = useState(null);
  const [searchParams] = useSearchParams();
  const [selectedVar, setVar] = useState({ value: "MSG_BYTES", label: "MSG BYTES" });

  //Run function to get data
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("fetching");
    const FLOAT_SERIAL_NO = searchParams.get("FLOAT_SERIAL_NO");
    const PLATFORM_TYPE = searchParams.get("PLATFORM_TYPE");

    let [dep, other] = await Promise.all([
      fetch(
        `http://127.0.0.1:8000/api/deployment_metadata?FLOAT_SERIAL_NO=${FLOAT_SERIAL_NO}&PLATFORM_TYPE=${PLATFORM_TYPE}&deployment_fields=FLOAT_SERIAL_NO,PLATFORM_NUMBER,PLATFORM_TYPE,LAUNCH_DATE,status,last_cycle,age,last_report`
      ),
      fetch(
        `http://127.0.0.1:8000/FE/float_detail?FLOAT_SERIAL_NO=${FLOAT_SERIAL_NO}&PLATFORM_TYPE=${PLATFORM_TYPE}`
      ),
    ]);

    const depJ = await dep.json();
    const otherJ = await other.json();

    setDeploymentData(depJ[0]);
    setOtherData(otherJ);
    setLoadingData(false);
  }

  const last_report_columns = [
    {
      dataField: "KEY",
      text: "",
      headerClasses: "tableheader",
    },
    {
      dataField: "VALUE",
      text: "",
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "130px" };
      },
    },
  ];

  const sensorQC_columns = [
    {
      dataField: "SENSOR",
      text: "Sensor",
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "120px" };
      },
    },
    {
      dataField: "START_CYCLE",
      text: "Start Cycle",
      headerClasses: "tableheader",
    },
    {
      dataField: "END_CYCLE",
      text: "End Cycle",
      headerClasses: "tableheader",
    },
    {
      dataField: "QC_LEVEL",
      text: "QC Level",
      headerClasses: "tableheader",
    },
  ];

  if (loadingData) {
    return (
      <div>
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    console.log(otherData["sensor_qcs"]);
    const lastReportData = [
      {
        id: 1,
        KEY: "Status",
        VALUE: deploymentData["status"],
      },
      {
        id: 2,
        KEY: "Cycles",
        VALUE: deploymentData["last_cycle"],
      },
      {
        id: 3,
        KEY: "Age",
        VALUE: deploymentData["age"],
      },
      {
        id: 4,
        KEY: "Last Report (UTC)",
        VALUE: deploymentData["last_report"],
      },
    ];

    return (
      <div className="row px-3">
        <div className="col-3">
          <h2 className="py-3">Serial Number: {deploymentData["FLOAT_SERIAL_NO"]}</h2>
          <p>WMO: {deploymentData["PLATFORM_NUMBER"]}</p>
          <p>Platform Type: {deploymentData["PLATFORM_TYPE"]}</p>
          <p>Deployment Date: {deploymentData["LAUNCH_DATE"].slice(0, 10)}</p>
          <h3>Latest Report</h3>
          <BootstrapTable
            keyField="id"
            data={lastReportData}
            columns={last_report_columns}
            bootstrap4
            hover
            condensed
            bordered={false}
          />
          <h3>Sensor QC</h3>
          <BootstrapTable
            keyField="id"
            data={otherData["sensor_qcs"]}
            columns={sensorQC_columns}
            bootstrap4
            hover
            condensed
            bordered={false}
          />
        </div>
        <div className="col">
          <h2 className="py-3">Electrical</h2>
          <div className="row">
            <LinePlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["general_hov_data"]}
              vars={[
                "AirPumpVolts",
                "BuoyancyPumpVolts",
                "QuiescentVolts",
                "Sbe41cpVolts",
                "Sbe63Volts",
                "McomsVolts",
              ]}
              ylabel={"Volts"}
              range={[8, 12]}
            />
          </div>
          <div className="row">
            <LinePlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["general_hov_data"]}
              vars={[
                "AirPumpAmps",
                "BuoyancyPumpAmps",
                "QuiescentAmps",
                "Sbe41cpAmps",
                "Sbe63Amps",
                "McomsAmps",
              ]}
              ylabel={"Amps"}
              range={[0, 1]}
            />
          </div>
          <h2>Buoyancy</h2>
          <div className="row">
            <LinePlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["general_hov_data"]}
              vars={[
                "CurrentBuoyancyPosition",
                "DeepProfileBuoyancyPosition",
                "ParkBuoyancyPosition",
                "SurfaceBuoyancyPosition",
              ]}
              ylabel={"Position (counts)"}
              range={[0, 900]}
            />
          </div>
          <div className="row">
            <LinePlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["general_hov_data"]}
              vars={["AirBladderPressure"]}
              ylabel={"Pressure"}
              range={[6, 9]}
            />
          </div>
          <div className="row">
            <LinePlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["general_hov_data"]}
              vars={["BuoyancyPumpOnTime"]}
              ylabel={"Time"}
              range={[200, 1000]}
            />
          </div>
          <div className="row">
            <ParkPresPlot plotData={otherData["park_pres_data"]} />
          </div>
          <div className="row">
            <ProfileStartPresPlot plotData={otherData["profile_start_pres_data"]} />
          </div>
          <h2>Duration</h2>
          <div className="row">
            <DurationPlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["duration_hov_data"]}
            />
          </div>
          <div className="row">
            <SurfaceDurationPlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["surface_duration_hov_data"]}
            />
          </div>
          <h2>Satellite</h2>
          <div className="row">
            <SatellitePlot
              plotData={otherData["cycle_metadata"]}
              vars={["CONNECTION_ATTEMPTS", "CONNECTIONS"]}
              ylabel={"Connections"}
            />
          </div>
          <div className="row">
            <SatellitePlot
              plotData={otherData["cycle_metadata"]}
              vars={["UPLOAD_ATTEMPTS", "UPLOADS"]}
              ylabel={"File Uploads"}
            />
          </div>
          <h2>Internal Vacuum</h2>
          <div className="row">
            <LinePlot
              plotData={otherData["cycle_metadata"]}
              hovData={otherData["general_hov_data"]}
              vars={["Vacuum"]}
              ylabel={"Pressure"}
              range={[70, 90]}
            />
          </div>
          <h2>Other</h2>
          <div className="row">
            <div className="col-2">
              <SelectOtherVar selectedVar={selectedVar} setVar={setVar} />
            </div>
            <div className="row">
              <LinePlot
                plotData={otherData["cycle_metadata"]}
                hovData={otherData["general_hov_data"]}
                vars={[selectedVar.value]}
                ylabel={selectedVar.label}
                legend={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FloatDetail;
