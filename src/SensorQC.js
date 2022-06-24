import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const SensorQC = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);

  //Run function to get data
  useEffect(() => {
    requestData();
  }, []);

  //Function for getting data for plots
  async function requestData() {
    const res = await fetch(`http://127.0.0.1:8000/FE/sensor_qc_data`, {
      mode: "cors",
    });
    let data = await res.json();

    setData(data);
    setLoadingData(false);
  }

  const { SearchBar } = Search;

  const columns = [
    {
      dataField: "FLOAT_SERIAL_NO",
      text: "Serial Number",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "PLATFORM_NUMBER",
      text: "WMO",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "SENSOR",
      text: "Sensor",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "SENSOR_SERIAL_NO",
      text: "Sensor Serial Number",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "START_CYLCE",
      text: "Start Cycle",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "END_CYCLE",
      text: "End Cycle",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "QC_LEVEL",
      text: "QC Level",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "PROBLEM",
      text: "Problem",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "400px" };
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "FLOAT_SERIAL_NO",
      order: "asc",
    },
  ];

  if (loadingData) {
    return (
      <div>
        <h2 className="p-3">Sensor QC</h2>

        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <ToolkitProvider bordered={false} keyField="id" data={data} columns={columns} search>
        {(props) => (
          <div className="px-3">
            <div className="row">
              <div className="col">
                <h2 className="py-3">Sensor QC</h2>
              </div>
              <div className="col py-3 text-end">
                <SearchBar {...props.searchProps} srText="" />
              </div>
            </div>
            <div className="row">
              <BootstrapTable
                {...props.baseProps}
                bootstrap4
                hover
                condensed
                bordered={false}
                defaultSorted={defaultSorted}
              />
            </div>
          </div>
        )}
      </ToolkitProvider>
    );
  }
};

export default SensorQC;
