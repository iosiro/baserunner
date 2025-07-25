import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

window.firebaseConfig = null;
window.cfs = null;
window.db = null;
window.storage = null;
window.firebaseUser = null;
window.uid = null;
window.confirmationResult = null;

window.displayReadResults = function(querySnapshot) {
  var rows = "";
  querySnapshot.forEach((doc) => {
    var row = `${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`;
    console.log(row);
    rows = `${rows}\n${row}`
  });
  document.getElementById("query-results").innerHTML = rows;
};

window.displayObject = function(snapshot) {
  var obj = JSON.stringify(snapshot.val(), null, 2);
  console.log(obj)
  document.getElementById("query-results").innerText = obj;
}

window.displayMessage = function(message) {
  console.log(message)
  document.getElementById("query-results").innerText = message;
}

window.displayError = function(message) {
  console.error(message)
  document.getElementById("query-results").innerText = message;
}

window.displayStorageDownload = function(url) {
  var message = `Download URL: ${url}`;
  console.log(message);
  
  // Create a download link
  var downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.textContent = `Download file`;
  downloadLink.style.display = 'block';
  downloadLink.style.marginTop = '10px';
  downloadLink.style.padding = '10px';
  downloadLink.style.backgroundColor = '#3d8bfd';
  downloadLink.style.color = 'white';
  downloadLink.style.textDecoration = 'none';
  downloadLink.style.borderRadius = '5px';
  
  document.getElementById("query-results").appendChild(downloadLink);
}

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

