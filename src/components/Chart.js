import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';
import { useFirestoreDocData, useFirestore } from 'reactfire';
import day from 'dayjs';
import { Card, Row, Col } from 'react-bootstrap';

const chartConfig = {
  type: 'line',
  options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
};

const dataToConfig = (data, label) => ({
  type: chartConfig.type,
  data: {
    labels: data.map((_label) => _label.x),
    datasets: [{
      label,
      data: data.map((_data) => _data.y),
    }],
  },
  option: chartConfig.options,
});

export default function Chart() {
  const contributionsContainer = useRef(null);
  const dailyContainer = useRef(null);
  const pfIndexContainer = useRef(null);
  const pfValueContainer = useRef(null);
  const [contributionsInstance, setContributionsInstance] = useState(null);
  const [dailyInstance, setDailyInstance] = useState(null);
  const [pFIndexInstance, setPFIndexInstance] = useState(null);
  const [pFValueInstance, setPFValueInstance] = useState(null);

  const userRef = useFirestore().collection('investmentEvolutions').doc('user1');
  const { array: user } = useFirestoreDocData(userRef);

  const contributions = user.map((data) => ({ y: data.contributions, x: day(data.date.seconds * 1000).format('MMM D') }));
  const dailyReturn = user.map((data) => ({ y: data.dailyReturn, x: day(data.date.seconds * 1000).format('MMM D') }));
  const portfolioIndex = user.map((data) => ({ y: data.portfolioIndex, x: day(data.date.seconds * 1000).format('MMM D') }));
  const portfolioValue = user.map((data) => ({ y: data.portfolioValue, x: day(data.date.seconds * 1000).format('MMM D') }));


  const updateInstance = (instance, newData) => {
    instance.data = dataToConfig(newData, instance.data.datasets[0].label).data;
    instance.update();
  };

  useEffect(() => {
    if (contributionsInstance) {
      updateInstance(contributionsInstance, contributions);
    }
    if (dailyInstance) {
      updateInstance(dailyInstance, dailyReturn);
    }
    if (pFIndexInstance) {
      updateInstance(pFIndexInstance, portfolioIndex);
    }
    if (pFValueInstance) {
      updateInstance(pFValueInstance, portfolioValue);
    }
  }, [user]);


  useEffect(() => {
    if (contributionsContainer && contributionsContainer.current) {
      const contInstance = new Chartjs(contributionsContainer.current, dataToConfig(contributions, 'Contributions'));
      const dInstance = new Chartjs(dailyContainer.current, dataToConfig(dailyReturn, 'Daily return'));
      const pfiInstance = new Chartjs(pfIndexContainer.current, dataToConfig(portfolioIndex, 'Portfolio Index'));
      const pfvInstance = new Chartjs(pfValueContainer.current, dataToConfig(portfolioValue, 'Portfolio Value'));
      setContributionsInstance(contInstance);
      setDailyInstance(dInstance);
      setPFIndexInstance(pfiInstance);
      setPFValueInstance(pfvInstance);
    }
  }, [contributionsContainer]);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <canvas ref={contributionsContainer} />
          </Card>
        </Col>
        <Col>
          <Card>
            <canvas ref={dailyContainer} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <canvas ref={pfIndexContainer} />
          </Card>
        </Col>
        <Col>
          <Card>
            <canvas ref={pfValueContainer} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
