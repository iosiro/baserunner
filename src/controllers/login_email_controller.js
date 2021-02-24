import { Controller } from "stimulus"
import firebase from "firebase/app"
import "firebase/auth"

export default class extends Controller {

    static get targets() {
        return [ "email", "password", "status", "button" ]
        }

    login() {
        if (this.emailTarget.hidden) {
            firebase.auth().signOut()
            .then(() => {
                window.firebaseUser = null;
                this.emailTarget.hidden = false
                this.passwordTarget.hidden = false
                this.statusTarget.innerHTML = "Log in with email & password"
                this.buttonTarget.innerHTML = "Log in"
            });
        }
        else {
            if (!window.firebaseConfig) {
                alert("Set config first!");
                return;
            }
            var username = this.emailTarget.value
            var password = this.passwordTarget.value

            firebase.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                window.firebaseUser = userCredential.user;

                this.emailTarget.hidden = true
                this.passwordTarget.hidden = true
                this.statusTarget.innerHTML = `Logged in as ${this.emailTarget.value}`
                this.buttonTarget.innerHTML = "Log out"
            });
        }
    }
}