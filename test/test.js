const assert = require("assert");
const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "wiz-invoice"
const myId = "sponge_bob_12A";
const theirId = "patrick_star_12A";
const myAuth = {uid: myId, email:"spongebob@invoice.com"}

function getFirestore(auth){
  return firebase.initializeTestApp({projectId:MY_PROJECT_ID,auth:auth}).firestore();
}

function getAdminFirestore(){
  return firebase.initializeAdminApp({projectId:MY_PROJECT_ID}).firestore();
}

// Mocha functions run before each individual test
beforeEach(async () => {
  await firebase.clearFirestoreData({projectId:MY_PROJECT_ID});
})

describe("Mocha testing", () => {
  it("Can do basic addition", () => {
    assert.strictEqual(2 + 2, 4);
  });

  // Firestore emulator must be running for firebase assert to work
  // Firestore emulator must also run on port 8080
  // https://github.com/firebase/firebase-tools/issues/1867
  it("Can read items in the read-only collection", async () => {
      const db = getFirestore(null);
      const testDoc = db.collection("readonly").doc("testDoc");
      await firebase.assertSucceeds(testDoc.get());
  });

  it("Can't write to items in the read-only collection", async () => {
      const db = getFirestore(null);
      const testDoc = db.collection("readonly").doc("testDoc2");
      await firebase.assertFails(testDoc.set({foo:"bar"}));
  })

  it("Can write to a user document with the same ID as our user", async() => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("testUsers").doc(myId);
      await firebase.assertSucceeds(testDoc.set({foo:"bar"}));
  })

  it("Can't write to a user document with the different ID as our user", async() => {
      const db = getFirestore(myAuth);
      const testDoc = db.collection("testUsers").doc(theirId);
      await firebase.assertFails(testDoc.set({foo:"bar"}));
  })

  it("Can read posts marked public", async () =>{
    // Security don't analyse all the documents in the query 
    // It only proves that the query is allow given the underline 
    // data defined in the security rules
    const db = getFirestore(myAuth);
    const testQuery = db.collection("testPosts").where("authorId", "==", myId);
    await firebase.assertSucceeds(testQuery.get());
  });

  it ("Can not query all posts", async () => {
    const db = getFirestore(myAuth);
    const testQuery = db.collection("testPosts");
    // Fails because the query won't work with all underlying data
    await firebase.assertFails(testQuery.get());
  })

  it("Can read a single public post", async() => {
    const adminDB = getAdminFirestore();
    const testDoc = adminDB.collection("testPosts").doc("public_post");
    await testDoc.set({authorId:theirId, visibility: "public"});
  

    const db = getFirestore(null);
    const testRead = db.collection("testPosts").doc("public_post");
    await firebase.assertSucceeds(testRead.get());
  })

  it("Can read my private post", async() => {
    const adminDB = getAdminFirestore();
    const testDoc = adminDB.collection("testPosts").doc("private_post");
    await testDoc.set({authorId:myId, visibility: "private"});
  

    const db = getFirestore(myAuth);
    const testRead = db.collection("testPosts").doc("private_post");
    await firebase.assertSucceeds(testRead.get());
  })

  it("Can't read their private post", async () => {
    const adminDB = getAdminFirestore();
    const testDoc = adminDB.collection("testPosts").doc("their_private_post");
    await testDoc.set({authorId:theirId, visibility: "private"});
  

    const db = getFirestore(myAuth);
    const testRead = db.collection("testPosts").doc("their_private_post");
    await firebase.assertFails(testRead.get());
  })
});

// Mocha functions which are performed at the end when all the tests have run
after(async () => {
  await firebase.clearFirestoreData({projectId:MY_PROJECT_ID});
  console.log("WOOOHOO finished everything!");
})