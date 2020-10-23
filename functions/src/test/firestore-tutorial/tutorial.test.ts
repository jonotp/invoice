import * as firebase from "@firebase/testing";
import * as path from "path";
import { setup, teardown, getFirestore, getAdminFirestore } from "../helper";

/** 
 * NOTE:
 *  If testing with emulator, firestore emulator must be run on port 8080
 *  https://github.com/firebase/firebase-tools/issues/1867
 **/

let projectId: string;

const myId = "sponge_bob_12A";
const myAuth = { uid: myId, email: "spongebob@invoice.com" }
const theirId = "patrick_star_12A";

beforeAll(async () => {
  const rulesPath = path.join(__dirname, "./firestore.rules");
  const setupObject = await setup(rulesPath);
  projectId = setupObject.projectId;
})

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: projectId });
})

describe("Firestore testing tutorial", () => {

  it("Can read items in the read-only collection", async () => {
    const db = getFirestore(projectId);
    const testDoc = db.collection("readonly").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });

  it("Can't write to items in the read-only collection", async () => {
    const db = getFirestore(projectId);
    const testDoc = db.collection("readonly").doc("testDoc2");
    await firebase.assertFails(testDoc.set({ foo: "bar" }));
  })

  it("Can write to a user document with the same ID as our user", async () => {
    const db = getFirestore(projectId, myAuth);
    const testDoc = db.collection("testUsers").doc(myId);
    await firebase.assertSucceeds(testDoc.set({ foo: "bar" }));
  })

  it("Can't write to a user document with the different ID as our user", async () => {
    const db = getFirestore(projectId, myAuth);
    const testDoc = db.collection("testUsers").doc(theirId);
    await firebase.assertFails(testDoc.set({ foo: "bar" }));
  })

  it("Can read posts marked public", async () => {
    // Security rules don't analyse all the documents in the query 
    // It only proves that the query is allow given the underline 
    // data defined in the security rules
    const db = getFirestore(projectId, myAuth);
    const testQuery = db.collection("testPosts").where("authorId", "==", myId);
    await firebase.assertSucceeds(testQuery.get());
  });

  it("Can not query all posts", async () => {
    const db = getFirestore(projectId, myAuth);
    const testQuery = db.collection("testPosts");

    // Fails because the query won't work with all underlying data
    await firebase.assertFails(testQuery.get());
  })

  it("Can read a single public post", async () => {
    const adminDB = getAdminFirestore(projectId);
    const testDoc = adminDB.collection("testPosts").doc("public_post");
    await testDoc.set({ authorId: theirId, visibility: "public" });


    const db = getFirestore(projectId);
    const testRead = db.collection("testPosts").doc("public_post");
    expect(await firebase.assertSucceeds(testRead.get()));
  })

  it("Can read my private post", async () => {
    const adminDB = getAdminFirestore(projectId);
    const testDoc = adminDB.collection("testPosts").doc("private_post");
    await testDoc.set({ authorId: myId, visibility: "private" });

    const db = getFirestore(projectId, myAuth);
    const testRead = db.collection("testPosts").doc("private_post");
    await firebase.assertSucceeds(testRead.get());
  })

  it("Can't read their private post", async () => {
    const adminDB = getAdminFirestore(projectId);
    const testDoc = adminDB.collection("testPosts").doc("their_private_post");
    await testDoc.set({ authorId: theirId, visibility: "private" });

    const db = getFirestore(projectId, myAuth);
    const testRead = db.collection("testPosts").doc("their_private_post");
    await firebase.assertFails(testRead.get());
  })
});

afterAll(async () => {
  await teardown();
})