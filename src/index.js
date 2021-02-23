import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

window.firebaseConfig = null;
window.db = null;
window.firebaseUser = null;
window.uid = null;
window.confirmationResult = null;

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

