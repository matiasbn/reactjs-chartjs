import React from 'react';
import day from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { FirebaseAppProvider, SuspenseWithPerf, useFirestoreDocData, useFirestore } from 'reactfire';
import { useSelector } from 'react-redux';
import { firebaseConfig } from './config/firestore';
import Chart from './components/Chart';
import NavBar from './components/NavBar';

function UserCharts() {
  const userRef = useFirestore().collection('investmentEvolutions').doc('user1');
  const { array: user } = useFirestoreDocData(userRef);
  const contributions = user.map((data) => ({ y: data.contributions, x: day(data.date.seconds * 1000).format('MMM D') }));
  const dailyReturn = user.map((data) => ({ y: data.dailyReturn, x: day(data.date.seconds * 1000).format('MMM D') }));
  const portfolioIndex = user.map((data) => ({ y: data.portfolioIndex, x: day(data.date.seconds * 1000).format('MMM D') }));
  const portfolioValue = user.map((data) => ({ y: data.portfolioValue, x: day(data.date.seconds * 1000).format('MMM D') }));
  const showContributions = useSelector((state) => state.showContributions);
  const showDailyReturn = useSelector((state) => state.showDailyReturn);
  const showPFIndex = useSelector((state) => state.showPFIndex);
  const showPFValue = useSelector((state) => state.showPFValue);
  return (
    <Container>
      {showContributions && <Chart data={contributions} title="Contributions" />}
      {showDailyReturn && <Chart data={dailyReturn} title="Daily Return" />}
      {showPFIndex && <Chart data={portfolioIndex} title="Portfolio Index" />}
      {showPFValue && <Chart data={portfolioValue} title="Portfolio Value" />}
    </Container>

  );
}

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf fallback={<p>loading user investements...</p>} traceId="load-user-status">
        <NavBar />
        <UserCharts />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
}

export default App;
