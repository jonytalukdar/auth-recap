import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSingIN = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage);
      });
  };
  const handleFacebookSingIN = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var accessToken = credential.accessToken;

        var user = result.user;

        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const handleGithubSingIN = () => {
    console.log('hello');
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;

        var user = result.user;
        console.log('github user', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  return (
    <div className="App">
      <button onClick={handleGoogleSingIN}>Sign In Using Google</button>
      <button onClick={handleFacebookSingIN}>Sign In Using Facebook</button>
      <button onClick={handleGithubSingIN}>Sign In Using Github</button>
      <h3>use name : {user.displayName}</h3>
      <h2>User Image</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
