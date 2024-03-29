import { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { API_URL } from "./App";

const SerialNumbers = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);
  const url = useContext(API_URL);

  //Run function to get data
  useEffect(() => {
    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Function for getting data for plots
  async function requestData() {
    const res = await fetch(`${url}/FE/sn_data`, {
      mode: "cors",
    });
    let data = await res.json();
    //onsole.log(data);
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
      dataField: "DEPLOYMENT_CRUISE_ID",
      text: "Deployment Cruise ID",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "250px" };
      },
    },
    {
      dataField: "LAST_EVENT",
      text: "Last Event",
      sort: true,
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "200px" };
      },
    },
    {
      dataField: "CTD_CNDC",
      text: "CNDC SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "CTD_PRES",
      text: "PRES SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "CTD_TEMP",
      text: "TEMP SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "BACKSCATTERINGMETER_BBP700",
      text: "BBP700 SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "FLUOROMETER_CHLA",
      text: "CHLA SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "FLUOROMETER_CDOM",
      text: "CDOM SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "SPECTROPHOTOMETER_NITRATE",
      text: "Nitrate SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "TRANSISTOR_PH",
      text: "pH SN",
      sort: true,
      headerClasses: "tableheader",
    },
    {
      dataField: "OPTODE_DOXY",
      text: "DO SN",
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
        <h2 className="p-3">Serial Numbers</h2>

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
                <h2 className="py-3">Serial Numbers</h2>
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

export default SerialNumbers;
