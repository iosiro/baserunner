import { Controller } from "stimulus"

export default class extends Controller {

    static get targets() {
      return [ "query", "display" ]
    }

    run() {
      eval(this.queryTarget.value);
      this.displayTarget.innerHTML = "Check the console for results.";
    }

    read() {
      this.queryTarget.value = `db.collection("==COLLECTION==").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(\`\${doc.id} => \${JSON.stringify(doc.data())}\`);
  });
});
`
    }

    add() {
      this.queryTarget.value = `db.collection("==COLLECTION==").add({
   "==KEY==":"==VALUE==",
   "==KEY==":"==VALUE==",
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
`
    }

    modify() {
      this.queryTarget.value = `db.collection("==COLLECTION==").doc("==ID==").set({
    "==KEY==": "==VALUE=="
}, { merge: true })
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
`
    }

    delete() {
      this.queryTarget.value = `db.collection("==COLLECTION==").doc("==ID==").delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
          `
    }
}