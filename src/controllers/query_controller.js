import { Controller } from "stimulus"

export default class extends Controller {

    static get targets() {
      return [ "query", "results" ]
    }

    run() {
      eval(this.queryTarget.value);
    }

    read() {
      this.queryTarget.value = `window.cfs.collection("==COLLECTION==").get().then(window.displayReadResults);
`
    }

    add() {
      this.queryTarget.value = `window.cfs.collection("==COLLECTION==").add({
   "==KEY==":"==VALUE==",
   "==KEY==":"==VALUE==",
})
.then((docRef) => {
    window.displayMessage(\`Document written with ID: \${docRef.id}\`);
})
.catch((error) => {
    window.displayError(\`Error adding document: \${error}\`);
});
`
    }

    modify() {
      this.queryTarget.value = `window.cfs.collection("==COLLECTION==").doc("==ID==").set({
    "==KEY==": "==VALUE=="
}, { merge: true })
.then(() => {
    window.displayMessage("Document successfully written!");
})
.catch((error) => {
    window.displayError(\`Error writing document \${error}\`);
});
`
    }

    delete() {
      this.queryTarget.value = `window.cfs.collection("==COLLECTION==").doc("==ID==").delete().then(() => {
    window.displayMessage("Document successfully deleted!");
}).catch((error) => {
    window.displayError(\`Error removing document: \${error}\`);
});
`
    }

    read_rtd() {
      this.queryTarget.value = `window.db.ref("==COLLECTION==").get().then(function(snapshot) {
  if (snapshot.exists()) {
    window.displayObject(snapshot);
  }
  else {
    window.displayMessage("No data available");
  }
}).catch(function(error) {
  window.displayError(error);
});
`
    }

    add_rtd() {
      this.queryTarget.value = ``
    }

    modify_rtd() {
      this.queryTarget.value = ``
    }

    delete_rtd() {
      this.queryTarget.value = ``
    }
}