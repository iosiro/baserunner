import { Controller } from "stimulus"
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import JSON5 from "json5";

export default class extends Controller {

    static get targets() {
      return [ "config", "display", "button" ]
    }

    initialize() {
      this.displayTarget.hidden = true;
    }

    set() {

      if (this.configTarget.hidden) {
        if (window.firebaseUser) {
          alert("Sign out first!");
          return;
        }
        window.firebaseConfig = null;
        firebase.apps[0].delete();
        this.configTarget.hidden = false;
        this.displayTarget.hidden = true;
        this.displayTarget.innerHTML = "";
        this.buttonTarget.innerHTML = "Set config";
      }
      else {
        window.firebaseConfig = JSON5.parse(this.configTarget.value);
        firebase.initializeApp(window.firebaseConfig);
        window.cfs = firebase.firestore();
        if ("databaseURL" in window.firebaseConfig) {
          window.db = firebase.database();
        }
        window.storage = firebase.storage();

        this.configTarget.hidden = true;
        this.displayTarget.hidden = false;
        this.displayTarget.innerHTML = this.configTarget.value;
        this.buttonTarget.innerHTML = "Change config";

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('g-recaptcha', {
          'size': 'normal',
          'callback': (response) => {
          }
        });

        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
        });
      }
    }
}
