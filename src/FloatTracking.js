import { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { API_URL } from "./App";

const FloatTracking = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [tables, setTables] = useState(null);
  const url = useContext(API_URL);

  //Run function to get data
  useEffect(() => {
    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Function for getting data for plots
  async function requestData() {
    const res = await fetch(`${url}/FE/tracking_data`, {
      mode: "cors",
    });
    let data = await res.json();

    setLoadingData(false);

    let tables = [];
    data.forEach(function (item, index) {
      const table = (
        <div className="row justify-content-md-center">
          <div className="col col-lg-6">
            <h3 className="pt-5">{item["FLOAT_SERIAL_NO"]}</h3>
            <BootstrapTable
              keyField="id"
              data={item["deployment_tracking"]}
              columns={columns}
              bootstrap4
              hover
              condensed
              bordered={false}
            />
          </div>
        </div>
      );
      tables.push(table);
    });

    setTables(tables);
  }

  const columns = [
    {
      dataField: "DATE",
      text: "Date",
      headerClasses: "tableheader",
    },
    {
      dataField: "EVENT",
      text: "Event",
      headerClasses: "tableheader",
    },
    {
      dataField: "LOCATION",
      text: "Location",
      headerClasses: "tableheader",
    },
    {
      dataField: "COMMENT",
      text: "Comment",
      headerClasses: "tableheader",
      headerStyle: () => {
        return { width: "300px" };
      },
    },
  ];

  if (loadingData) {
    return (
      <div>
        <h2 className="p-3">Float Tracking</h2>

        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <div className="px-3">
        <h2 className="py-3">Float Tracking</h2>
        {tables}
      </div>
    );
  }
};

export default FloatTracking;
