import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAGv2MlzNCw_aDVa0RDKjm6o_DmOLeq5wM",
    authDomain: "my-first-project-8b236.firebaseapp.com",
    projectId: "my-first-project-8b236",
    storageBucket: "my-first-project-8b236.appspot.com",
    messagingSenderId: "399628839566",
    appId: "1:399628839566:web:5b384994255c7d35c677df"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;