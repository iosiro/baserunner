import { Controller } from "stimulus"
import firebase from "firebase/app"
import "firebase/auth"

export default class extends Controller {

    static get targets() {
        return [ "gsignin", "gbutton", "status" ]
        }

    login() {
        console.log(window.googleUser);
        if (!window.firebaseConfig) {
            alert("Set config first!");
            return;
        }

        var credential = firebase.auth.GoogleAuthProvider.credential(window.googleUser.credential);
        firebase.auth().signInWithCredential(credential)
            .then((userCredential) => {
                window.firebaseUser = userCredential.user

                this.statusTarget.innerHTML = "Logged in with Google!"
            });
    }
}