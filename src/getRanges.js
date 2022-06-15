const getRanges = (props) => {
  const VarRanges = {
    TEMP: [0, 30],
    PRES: [-2000, 0],
    PSAL: [34.5, 37.5],
    DOXY: [0, 300],
    CHLA: [0, 0.7],
    BBP700: [0, 0.0004],
    PH_IN_SITU_TOTAL: [7.7, 8.2],
    NITRATE: [-5, 35],
    CDOM: [0, 3],
    VRS_PH: [-1, -0.85],
    VK_PH: [-3, 0],
    IB_PH: [-0.0000001, 0],
    IK_PH: [-0.0000001, 0],
  };

  return VarRanges[props];
};

export default getRanges;
