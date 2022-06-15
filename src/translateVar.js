const translateVar = (props) => {
  const VarTranslation = {
    TEMP: "Temperature (°C)",
    PRES: "Pressure (dbar)",
    PSAL: "Practical Salinity",
    DOXY: "Dissolved Oxygen (μmol/kg)",
    CHLA: "Chlorophyll a (mg/m<sup>3</sup>)",
    BBP700: "Particle backscattering at 700 nm (m<sup>-1</sup>)",
    PH_IN_SITU_TOTAL: "pH total scale",
    NITRATE: "Nitrate (μmol/kg)",
    CDOM: "Coloured dissolved organic matter (ppb)",
  };

  return VarTranslation[props];
};

export default translateVar;
