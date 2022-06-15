import { useState, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import getData from "./SortTable";

const Deployed = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();

  //Run function to get data
  useEffect(() => {
    requestData();
  }, []);

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);

    // update sorted data
    // It could be an asynchronous request to sort through a database table.
  };

  //Function for getting data for plots
  async function requestData() {
    const res = await fetch(`http://127.0.0.1:8000/FE/deployed_data`, {
      mode: "cors",
    });
    let data = await res.json();

    setData(data);
    setLoadingData(false);
  }

  const styles = { padding: 2, fontWeight: "bold" };

  if (loadingData) {
    return (
      <div>
        <h2 className="p-3">Deployed Floats</h2>

        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="p-3">Deployed Floats</h2>
        <Table
          autoHeight={true}
          data={getData(data, sortColumn, sortType)}
          // onRowClick={(data) => {
          //   console.log(data);
          // }}
          // onSortColumn={(sortColumn, sortType) => {
          //   console.log(sortColumn, sortType);
          // }}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          headerHeight={30}
          rowHeight={30}
          className="px-3"
          loading={loadingData}
        >
          <Column flexGrow sortable>
            <HeaderCell style={styles}>Serial Number</HeaderCell>
            <Cell dataKey="FLOAT_SERIAL_NO" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>WMO</HeaderCell>
            <Cell dataKey="PLATFORM_NUMBER" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Platform Type</HeaderCell>
            <Cell dataKey="PLATFORM_TYPE" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column width={250} sortable>
            <HeaderCell style={styles}>Deployment Cruise ID</HeaderCell>
            <Cell dataKey="DEPLOYMENT_CRUISE_ID" />
          </Column>

          <Column width={200} sortable>
            <HeaderCell style={styles}>Deployment Platform</HeaderCell>
            <Cell dataKey="DEPLOYMENT_PLATFORM" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Launch Date (UTC)</HeaderCell>
            <Cell dataKey="LAUNCH_DATE" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Last Report (UTC)</HeaderCell>
            <Cell dataKey="last_report" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Next Report (est.)</HeaderCell>
            <Cell dataKey="next_report" />
          </Column>

          <Column width={200} sortable>
            <HeaderCell style={styles}>Days Since Last Report</HeaderCell>
            <Cell dataKey="days_since_last" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Cycles</HeaderCell>
            <Cell dataKey="last_cycle" />
          </Column>

          <Column flexGrow sortable>
            <HeaderCell style={styles}>Age</HeaderCell>
            <Cell dataKey="age" />
          </Column>
        </Table>
      </div>
    );
  }
};

export default Deployed;
