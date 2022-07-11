import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { API_URL } from "./App";

const SelectProfiles = ({ profiles, setProfiles }) => {
  const [profileOptions, setOptions] = useState([]);
  const url = useContext(API_URL);

  //Run requestProfiles only once at first render
  useEffect(() => {
    requestProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get list of profiles options for selector
  async function requestProfiles() {
    const res = await fetch(`${url}/FE/get_profiles_list`, {
      mode: "cors",
    });
    const json = await res.json();

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
