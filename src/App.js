import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import { firebaseConfig } from './config/firestore';
import NavBar from './components/NavBar';
import UserCharts from './views/UserCharts';

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
