import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD-fbO6OwZEA9HxIrhOiPHoJY9BrJVKCaA",
    authDomain: "crwn-db-9e34f.firebaseapp.com",
    databaseURL: "https://crwn-db-9e34f.firebaseio.com",
    projectId: "crwn-db-9e34f",
    storageBucket: "crwn-db-9e34f.appspot.com",
    messagingSenderId: "749477446926",
    appId: "1:749477446926:web:a99810b03be1e34cd0c35f"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;