import React, { useEffect, useRef, useState } from 'react';
import day from 'dayjs';
import PropTypes from 'prop-types';
import Chartjs from 'chart.js';

const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b}, __type__)`;
};

const chartConfig = {
  type: 'line',
  options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
};

const dataToConfig = (data, label) => {
  const colors = data.map(() => randomColor());
  return {
    type: chartConfig.type,
    data: {
      labels: data.map((_label) => day(_label.x).format('MMM D')),
      datasets: [{
        label,
        data: data.map((_data) => _data.y),
        backgroundColor: colors.map((color) => color.replace('__type__', '0.2')),
        borderColor: colors.map((color) => color.replace('__type__', '1')),
      }],
    },
    option: chartConfig.options,
  };
};

export default function Chart(props) {
  const { data, title } = props;
  const container = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const updateInstance = (instance, newData) => {
    instance.data = dataToConfig(newData, instance.data.datasets[0].label).data;
    instance.update();
  };

  useEffect(() => {
    if (chartInstance) {
      updateInstance(chartInstance, data);
    }
  }, [data]);


  useEffect(() => {
    if (container && container.current) {
      const contInstance = new Chartjs(container.current, dataToConfig(data, title));
      setChartInstance(contInstance);
    }
  }, [container]);
  return (
    <div>
      <canvas ref={container} />
    </div>
  );
}

Chart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
