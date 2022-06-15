import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
//import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const Predeployed = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);

  //Run function to get data
  useEffect(() => {
    requestData();
  }, []);

  //Function for getting data
  async function requestData() {
    const res = await fetch(`http://127.0.0.1:8000/FE/predeployed_data`, {
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
      dataField: "PLATFORM_NUBBER",
      text: "WMO",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "FUNDER",
      text: "Funder",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "last_location",
      text: "Location",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "last_event",
      text: "Latest Event",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "200px" };
      },
    },
    {
      dataField: "comment",
      text: "Comment",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "300px" };
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
      dataField: "DEPLOYMENT_MOB",
      text: "Deployment MOB",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "DEPLOYMENT_PORT",
      text: "Deployment Port",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "incoming_status",
      text: "Passed Incoming",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "internal_inspection_status",
      text: "Passed Internal Inspection",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "120px" };
      },
    },
    {
      dataField: "pressure_test_status",
      text: "Passed Pressure Test",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "120px" };
      },
    },
    {
      dataField: "docktest_status",
      text: "Passed Docktest",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "flow_through_status",
      text: "Passed Flow Through",
      sort: true,
      headerClasses: "tableheader",
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
        <h2 className="p-3">Predeployment Floats</h2>

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
        defaultSorted={defaultSorted}
        search
      >
        {(props) => (
          <div className="px-3">
            <div className="row">
              <div className="col">
                <h2 className="py-3">Predeployment Floats</h2>
              </div>
              <div className="col py-3 text-right">
                <SearchBar {...props.searchProps} />
              </div>
            </div>
            <div className="row px-3">
              <BootstrapTable
                {...props.baseProps}
                bootstrap4
                hover
                condensed
                headerClasses="tableheader"
                bordered={false}
              />
            </div>
          </div>
        )}
      </ToolkitProvider>
    );
  }
};

export default Predeployed;
