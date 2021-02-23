import { Controller } from "stimulus"
import firebase from "firebase/app"
import "firebase/auth";

export default class extends Controller {
    static get targets() {
        return [ "phonenumber", "otp", "status", "button", "otpbutton" ]
        }

    initialize() {
        this.otpTarget.hidden = true;
        this.otpbuttonTarget.hidden = true;
    }

    login() {
        if (this.phonenumberTarget.hidden) {
            firebase.auth().signOut()
            .then(() => {
                this.phonenumberTarget.hidden = false
                this.buttonTarget.hidden = false
                this.statusTarget.innerHTML = "Log in with phone number (complete CAPTCHA first)"
                this.buttonTarget.innerHTML = "Log in"
            });
        }
        else {
            if (!window.firebaseConfig) {
                alert("Set config first!");
                return;
            }
            var username = this.phonenumberTarget.value;
            var appVerifier = window.recaptchaVerifier;

            this.statusTarget.innerHTML = "Enter the code SMSed to you"
            this.otpTarget.hidden = false;
            this.otpbuttonTarget.hidden = false;
            this.phonenumberTarget.hidden = true;
            this.buttonTarget.hidden = true;

            firebase.auth().signInWithPhoneNumber(username, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });

        }
    }

    sendcode() {
        var code = this.otpTarget.value;
        window.confirmationResult.confirm(code)
            .then((result) => {
            window.firebaseUser = result.user;

            this.otpTarget.hidden = true
            this.otpbuttonTarget.hidden = true
            this.statusTarget.innerHTML = `Logged in as ${this.phonenumberTarget.value}`
            this.buttonTarget.innerHTML = "Log out"
            this.buttonTarget.hidden = false;
            });
    }
}