import { useState, useEffect, useContext } from "react";
import { API_URL } from "./App";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const Predeployed = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);
  const url = useContext(API_URL);

  //Run function to get data
  useEffect(() => {
    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Function for getting data
  async function requestData() {
    const res = await fetch(
      `${url}/api/deployment_metadata?LAUNCH_DATE__isnull=true&PLATFORM_TYPE=NAVIS_EBR&deployment_fields=FLOAT_SERIAL_NO,PLATFORM_NUMBER,FUNDER,last_location,last_event,comment,DEPLOYMENT_CRUISE_ID,DEPLOYMENT_PLATFORM,DEPLOYMENT_MOB,DEPLOYMENT_PORT,incoming_status,internal_inspection_status,pressure_test_status,docktest_status,flow_through_status`,
      {
        mode: "cors",
      }
    );
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
        search
      >
        {(props) => (
          <div className="px-3">
            <div className="row">
              <div className="col">
                <h2 className="py-3">Predeployment Floats</h2>
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

export default Predeployed;
