import Select from "react-select";

const SelectYear = ({ year, setYear }) => {
  const vars = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  function handleChange(selectedOption) {
    setYear(selectedOption);
  }

  return (
    <Select
      className="selector"
      value={year}
      onChange={handleChange}
      // onBlur={handleChange}
      options={vars}
    />
  );
};

export default SelectYear;
