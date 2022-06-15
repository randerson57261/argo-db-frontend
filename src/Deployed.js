import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const Deployed = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);

  //Run function to get data
  useEffect(() => {
    requestData();
  }, []);

  //Function for getting data for plots
  async function requestData() {
    const res = await fetch(`http://127.0.0.1:8000/FE/deployed_data`, {
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
      headerStyle: () => {
        return { width: "130px" };
      },
    },
    {
      dataField: "PLATFORM_NUMBER",
      text: "WMO",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "130px" };
      },
    },
    {
      dataField: "PLATFORM_TYPE",
      text: "Platform Type",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "DEPLOYMENT_CRUISE_ID",
      text: "Deployment Cruise ID",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "DEPLOYMENT_PLATFORM",
      text: "Deployment Platform",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "LAUNCH_DATE",
      text: "Launch Date (UTC)",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "last_report",
      text: "Last Report (UTC)",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "next_report",
      text: "Next Report (est.)",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "days_since_last",
      text: "Days Since Last Report",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "180px" };
      },
    },
    {
      dataField: "last_cycle",
      text: "Cycles",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "100px" };
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
                headerClasses="tableheader"
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

export default Deployed;
