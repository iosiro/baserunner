import { Controller } from "stimulus"

export default class extends Controller {

    static get targets() {
      return [ "query", "results" ]
    }

    run() {
      eval(this.queryTarget.value);
    }

    read() {
      this.queryTarget.value = `db.collection("==COLLECTION==").get().then(window.displayReadResults);
`
    }

    add() {
      this.queryTarget.value = `db.collection("==COLLECTION==").add({
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
      this.queryTarget.value = `db.collection("==COLLECTION==").doc("==ID==").set({
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
      this.queryTarget.value = `db.collection("==COLLECTION==").doc("==ID==").delete().then(() => {
    window.displayMessage("Document successfully deleted!");
}).catch((error) => {
    window.displayError(\`Error removing document: \${error}\`);
});
          `
    }
}