import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import '@firebase/firestore-compat'

const config = {
	apiKey: "AIzaSyCm4PqFUx72tEvXu-attpwd87hhj3toKKw",
	authDomain: "itmapp-fee6e.firebaseapp.com",
	projectId: "itmapp-fee6e",
	storageBucket: "itmapp-fee6e.appspot.com",
	messagingSenderId: "430646209929",
	appId: "1:430646209929:web:9b3a9b1a891c1c9a770558",
	measurementId: "G-Y90ZV2ZYFY"
};

firebase.initializeApp(config);

const storage = firebase.storage();
const db = firebase.firestore();

export { storage, db,  firebase as default };
