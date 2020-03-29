import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDV1qlxq8FpQ1Uhc17HUpmRYZlEzTRg9nk",
  authDomain: "crwb-db-46a49.firebaseapp.com",
  databaseURL: "https://crwb-db-46a49.firebaseio.com",
  projectId: "crwb-db-46a49",
  storageBucket: "crwb-db-46a49.appspot.com",
  messagingSenderId: "557182118840",
  appId: "1:557182118840:web:74cbb57d3cb0b365dfbd4d",
  measurementId: "G-144PP78YSN"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } else {
    console.log(`User with uid ${userAuth.uid} already exists`);
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
