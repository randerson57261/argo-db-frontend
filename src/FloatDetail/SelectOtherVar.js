import Select from "react-select";

const SelectOtherVar = ({ selectedVar, setVar }) => {
  const options = [
    { value: "MSG_BYTES", label: "MSG BYTES" },
    { value: "LOG_BYTES", label: "LOG BYTES" },
    { value: "ISUS_BYTES", label: "ISUS BYTES" },
    { value: "ActiveBallastAdjustments", label: "ActiveBallastAdjustments" },
    { value: "BatteryCounts", label: "BatteryCounts" },
    { value: "FlashErrorsCorrectable", label: "FlashErrorsCorrectable" },
    { value: "FlashErrorsUncorrectable", label: "FlashErrorsUncorrectable" },
    { value: "IceMLSample", label: "IceMLSample" },
    { value: "ParkDescentPCnt", label: "ParkDescentPCnt" },
    { value: "ObsIndex", label: "ObsIndex" },
    { value: "GpsNsat", label: "GpsNsat" },
    { value: "IsusPowerCycleCounter", label: "IsusPowerCycleCounter" },
    { value: "Sbe41cpHumidity", label: "Sbe41cpHumidity" },
    { value: "Sbe41cpHumidityTemp", label: "Sbe41cpHumidityTemp" },
    { value: "PHBaseAmps", label: "PHBaseAmps" },
    { value: "PHBatteryInVolts", label: "PHBatteryInVolts" },
    { value: "PHBatteryOutVolts", label: "PHBatteryOutVolts" },
    { value: "PHCounterVolts", label: "PHCounterVolts" },
    { value: "PHCounterAmps", label: "PHCounterAmps" },
    { value: "SurfacePressure", label: "SurfacePressure" },
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
      options={options}
    />
  );
};

export default SelectOtherVar;
