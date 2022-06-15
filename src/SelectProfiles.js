import { useState, useEffect } from "react";
import Select from "react-select";

const SelectProfiles = ({ profiles, setProfiles }) => {
  const [profileOptions, setOptions] = useState([]);

  //Run requestProfiles only once at first render
  useEffect(() => {
    requestProfiles();
  }, []);

  //Get list of profiles options for selector
  async function requestProfiles() {
    const res = await fetch(`http://127.0.0.1:8000/ajax/get_profiles_list`, {
      mode: "cors",
    });
    const json = await res.json();

    console.log(json);
    const profile_list = json.profiles.map((profile) => ({ value: profile, label: profile }));

    setOptions(profile_list);
  }

  function handleChange(selectedOptions) {
    setProfiles(selectedOptions);
  }

  return (
    <Select
      className="selector"
      classNamePrefix="react-select"
      searchable={true}
      value={profiles}
      options={profileOptions}
      hideSelectedOptions={false}
      onChange={handleChange}
      isMulti
      closeMenuOnSelect={false}
    />
  );
};

export default SelectProfiles;
