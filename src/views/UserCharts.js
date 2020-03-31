import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Container } from 'react-bootstrap';
import { useFirestoreDocData, useFirestore } from 'reactfire';
import { useSelector } from 'react-redux';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Chart from '../components/Chart';
import Updated from '../components/Updated';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


export default function UserCharts() {
  const userRef = useFirestore().collection('investmentEvolutions').doc('user1');
  const { array: user } = useFirestoreDocData(userRef);
  const [updated, showUpdated] = useState(true);

  // Check user to detect data changes
  useEffect(() => {
    showUpdated(true);
  }, [user]);

  // Redux to show/hide Charts
  const showContributions = useSelector((state) => state.showContributions);
  const showDailyReturn = useSelector((state) => state.showDailyReturn);
  const showPFIndex = useSelector((state) => state.showPFIndex);
  const showPFValue = useSelector((state) => state.showPFValue);
  const startDate = useSelector((state) => state.startDate);
  const finishDate = useSelector((state) => state.finishDate);

  // Separate user data
  let contributions = user.map((data) => ({ y: data.contributions, x: data.date.seconds * 1000 }));
  let dailyReturn = user.map((data) => ({ y: data.dailyReturn, x: data.date.seconds * 1000 }));
  let portfolioIndex = user.map((data) => ({ y: data.portfolioIndex, x: data.date.seconds * 1000 }));
  let portfolioValue = user.map((data) => ({ y: data.portfolioValue, x: data.date.seconds * 1000 }));

  // Filter data if startDate and finishDate are setted
  // Data is marked as 2019, subtracting 1 year to startDate and finishDate to simulate a good filter
  if (startDate) {
    contributions = contributions.filter((el) => dayjs(el.x).isSameOrAfter(dayjs(startDate).subtract(1, 'year'), 'day'));
    dailyReturn = dailyReturn.filter((el) => dayjs(el.x).isSameOrAfter(dayjs(startDate).subtract(1, 'year'), 'day'));
    portfolioIndex = portfolioIndex.filter((el) => dayjs(el.x).isSameOrAfter(dayjs(startDate).subtract(1, 'year'), 'day'));
    portfolioValue = portfolioValue.filter((el) => dayjs(el.x).isSameOrAfter(dayjs(startDate).subtract(1, 'year'), 'day'));
  }

  if (finishDate) {
    contributions = contributions.filter((el) => dayjs(el.x).isSameOrBefore(dayjs(finishDate).subtract(1, 'year'), 'day'));
    dailyReturn = dailyReturn.filter((el) => dayjs(el.x).isSameOrBefore(dayjs(finishDate).subtract(1, 'year'), 'day'));
    portfolioIndex = portfolioIndex.filter((el) => dayjs(el.x).isSameOrBefore(dayjs(finishDate).subtract(1, 'year'), 'day'));
    portfolioValue = portfolioValue.filter((el) => dayjs(el.x).isSameOrBefore(dayjs(finishDate).subtract(1, 'year'), 'day'));
  }

  return (
    <Container>
      {updated && <Updated show={updated} showUpdated={showUpdated} />}
      {showContributions && <Chart data={contributions} title="Contributions" />}
      {showDailyReturn && <Chart data={dailyReturn} title="Daily Return" />}
      {showPFIndex && <Chart data={portfolioIndex} title="Portfolio Index" />}
      {showPFValue && <Chart data={portfolioValue} title="Portfolio Value" />}
    </Container>
  );
}
