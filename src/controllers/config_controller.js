import { Controller } from "stimulus"
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
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
        this.configTarget.hidden = false;
        this.displayTarget.hidden = true;
        this.displayTarget.innerHTML = "";
        this.buttonTarget.innerHTML = "Set config";
      }
      else {
        window.firebaseConfig = JSON5.parse(this.configTarget.value);
        firebase.initializeApp(window.firebaseConfig);
        window.db = firebase.firestore()

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