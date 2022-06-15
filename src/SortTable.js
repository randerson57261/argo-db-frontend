//Sorting data
const dateFields = ["LAUNCH_DATE", "last_report", "next_report"];
const getData = (data, sortColumn, sortType) => {
  if (sortColumn && sortType) {
    return data.sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];
      //Date Fields
      if (dateFields.includes(sortColumn)) {
        x = new Date(x);
        y = new Date(y);
      }
      //All other fields
      else if (typeof x === "string") {
        x = x.charCodeAt();
        y = y.charCodeAt();
      }
      //If sorting
      if (sortType === "asc") {
        return x - y;
      } else {
        return y - x;
      }
    });
  }
  //If not sorting
  return data;
};

export default getData;
