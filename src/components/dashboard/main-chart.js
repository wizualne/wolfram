import React, { useEffect } from "react";

import { Line as ChartLine } from "react-chartjs-2";

export const MainChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: props.arr,
  };

  return <ChartLine data={data} />;
};
