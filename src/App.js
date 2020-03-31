import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, CardGroup } from 'react-bootstrap';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import { firebaseConfig } from './config/firestore';
import Chart from './components/Chart';

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf fallback={<p>loading user investements...</p>} traceId="load-burrito-status">
        <Container>
          <CardGroup>
            <Chart />
          </CardGroup>
        </Container>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
}

export default App;
