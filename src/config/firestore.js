import firebase from 'firebase';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyArGiRgGd2MfE65_9sjE2QX49gt1sP0GmA',
  authDomain: 'racional-exam.firebaseapp.com',
  databaseURL: '​https://racional-exam.firebaseio.com​',
  projectId: 'racional-exam',
  storageBucket: 'racional-exam.appspot.com',
  messagingSenderId: '669314004725',
  appId: '1:669314004725:web:48bd14a97d7db43c91f7bc',
};


const fbapp = firebase.initializeApp(firebaseConfig);
const db = fbapp.firestore();

export { firebaseConfig };

export default db;
