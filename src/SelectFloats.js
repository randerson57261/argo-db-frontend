import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { API_URL } from "./App";

const SelectFloats = ({ selectedFloats, setSelectedFloats }) => {
  const [floatOptions, setOptions] = useState([]);
  const url = useContext(API_URL);

  //Run requestFloats only once at first render
  useEffect(() => {
    requestFloats();
  }, []);

  //Get list of float options for selector
  async function requestFloats() {
    const res = await fetch(`${url}/FE/get_deployments_list`, {
      mode: "cors",
    });
    const json = await res.json();

    const float_list = json.deployments.map(({ PLATFORM_NUMBER: value, LABEL: label }) => ({
      value,
      label,
    }));

    setOptions(float_list);
    setSelectedFloats(float_list);
  }

  function handleChange(selectedOptions) {
    setSelectedFloats(selectedOptions);
  }

  return (
    <Select
      className="selector"
      classNamePrefix="react-select"
      searchable={true}
      value={selectedFloats}
      options={floatOptions}
      hideSelectedOptions={false}
      onChange={handleChange}
      isMulti
      closeMenuOnSelect={false}
    />
  );
};

export default SelectFloats;
