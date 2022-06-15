import Select from "react-select";

const SelectVar = ({ selectedVar, setVar }) => {
  const vars = [
    {
      label: "Derived Parameters",
      options: [
        { value: "PSAL", label: "Salinity" },
        { value: "TEMP", label: "Temperature" },
        { value: "DOXY", label: "Dissolved Oxygen" },
        { value: "CHLA", label: "Chlorophyll a" },
        { value: "BBP700", label: "Particle Backscatter" },
        { value: "CDOM", label: "CDOM" },
        { value: "NITRATE", label: "Nitrate" },
        { value: "PH_IN_SITU_TOTAL", label: "pH Total" },
      ],
    },
    {
      label: "Raw Sensor Parameters",
      options: [
        { value: "VRS_PH", label: "pH Vrs" },
        { value: "VK_PH", label: "pH Vk" },
        { value: "IB_PH", label: "pH Ib" },
        { value: "IK_PH", label: "pH Ik" },
      ],
    },
  ];

  function handleChange(selectedOption) {
    setVar(selectedOption);
  }

  return (
    <Select
      className="selector"
      value={selectedVar}
      onChange={handleChange}
      // onBlur={handleChange}
      options={vars}
    />
  );
};

export default SelectVar;
