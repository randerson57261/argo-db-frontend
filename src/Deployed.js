import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const Deployed = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);

  //Run function to get data on first render
  useEffect(() => {
    requestData();
  }, []);

  //Get data from API
  async function requestData() {
    const res = await fetch(
      `http://127.0.0.1:8000/api/deployment_metadata?HISTORICAL=false&LAUNCH_DATE__gt=2019-01-01T00:00:00Z&PLATFORM_TYPE=NAVIS_EBR&deployment_fields=FLOAT_SERIAL_NO,PLATFORM_NUMBER,PLATFORM_TYPE,status,DEPLOYMENT_CRUISE_ID,DEPLOYMENT_PLATFORM,LAUNCH_DATE,last_report,next_report,days_since_last,last_cycle,age`,
      {
        mode: "cors",
      }
    );
    let data = await res.json();
    setData(data);
    setLoadingData(false);
  }

  const { SearchBar } = Search;

  //Define table columns
  const columns = [
    {
      dataField: "FLOAT_SERIAL_NO",
      text: "Serial Number",
      sort: true,
      headerStyle: () => {
        return { width: "130px" };
      },
      style: { cursor: "pointer" },
    },
    {
      dataField: "PLATFORM_NUMBER",
      text: "WMO",
      sort: true,
      headerStyle: () => {
        return { width: "130px" };
      },
      style: { cursor: "pointer" },
    },
    {
      dataField: "PLATFORM_TYPE",
      text: "Platform Type",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
      style: { cursor: "pointer" },
    },
    {
      dataField: "DEPLOYMENT_CRUISE_ID",
      text: "Deployment Cruise ID",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "DEPLOYMENT_PLATFORM",
      text: "Deployment Platform",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "LAUNCH_DATE",
      text: "Launch Date (UTC)",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "last_report",
      text: "Last Report (UTC)",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "next_report",
      text: "Next Report (est.)",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "days_since_last",
      text: "Days Since Last Report",
      sort: true,
      headerStyle: () => {
        return { width: "180px" };
      },
      style: { cursor: "pointer" },
    },
    {
      dataField: "last_cycle",
      text: "Cycles",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
      style: { cursor: "pointer" },
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      headerStyle: () => {
        return { width: "100px" };
      },
      style: { cursor: "pointer" },
    },
  ];

  //Default sort
  const defaultSorted = [
    {
      dataField: "FLOAT_SERIAL_NO",
      order: "asc",
    },
  ];

  //Redirect on click of row to float detail page
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      routeChange(row);
    },
  };

  let navigate = useNavigate();
  const routeChange = (row) => {
    let path = `float_detail?FLOAT_SERIAL_NO=${row.FLOAT_SERIAL_NO}&PLATFORM_TYPE=${row.PLATFORM_TYPE}`;
    navigate(path);
  };

  //Returns
  if (loadingData) {
    return (
      <div>
        <h2 className="p-3">Deployed Floats</h2>

        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <ToolkitProvider
        bordered={false}
        keyField="FLOAT_SERIAL_NO"
        data={data}
        columns={columns}
        search
      >
        {(props) => (
          <div className="px-3">
            <div className="row">
              <div className="col">
                <h2 className="py-3">Deployed Floats</h2>
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
                rowEvents={rowEvents}
              />
            </div>
          </div>
        )}
      </ToolkitProvider>
    );
  }
};

export default Deployed;
