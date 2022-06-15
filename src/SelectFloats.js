import { useState, useEffect } from "react";
import Select from "react-select";

const SelectFloats = ({ selectedFloats, setSelectedFloats }) => {
  const [floatOptions, setOptions] = useState([]);

  //Run requestFloats only once at first render
  useEffect(() => {
    requestFloats();
  }, []);

  //Get list of float options for selector
  async function requestFloats() {
    const res = await fetch(`http://127.0.0.1:8000/ajax/get_deployments_list`, {
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
