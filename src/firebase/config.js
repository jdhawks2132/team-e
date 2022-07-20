import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDoosXb_VeZpiVa3nRD3MsQniYg4SuLTyk',
	authDomain: 'project-manager-a1379.firebaseapp.com',
	projectId: 'project-manager-a1379',
	storageBucket: 'project-manager-a1379.appspot.com',
	messagingSenderId: '1005875101008',
	appId: '1:1005875101008:web:c4b9097d65b02c5a7e4055',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
