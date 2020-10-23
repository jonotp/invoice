import * as firebase from "@firebase/testing";
import * as path from "path";
import { setup, teardown, getFirestore, getAdminFirestore } from "../helper";

let projectId: string;
const usersCollection = "users";
const user = { uid: "Agumon", name: "Tai", email: "tai@test.com" };
const differentUser = { uid: "Gabumon", name: "Matt", email: "matt@test.com" };

beforeAll(async () => {
  const rulesPath = path.join(__dirname, "./firestore.rules");
  const setupObject = await setup(rulesPath, projectId);
  projectId = setupObject.projectId;
})

describe("Firestore users read rules test", () => {

  it("Can't read document in the users without specifying rules or doc", async () => {
    const db = getFirestore(projectId, user);
    const query = db.collection(usersCollection);

    // Will return false because the query does not match the condition in the rules
    await firebase.assertFails(query.get());
  })

  it("Can't read document that does not exist", async () => {
    const db = getFirestore(projectId, user);
    const query = db.collection(usersCollection).doc(user.uid);

    // Will return false because the query does not match the condition in the rules
    await firebase.assertFails(query.get());
  })

  it("Can't read document in the user collection with different userId as our user", async () => {
    const adminDB = getAdminFirestore(projectId);
    const doc = { userId: differentUser.uid, ...differentUser };
    const testDoc = adminDB.collection(usersCollection).doc(differentUser.uid);
    await testDoc.set(doc);

    const db = getFirestore(projectId, user);
    const query = db.collection(usersCollection).doc(differentUser.uid);
    await firebase.assertFails(query.get());
  })

  it("Can read document in the user collection with the same userId as our user", async () => {
    var adminDB = getAdminFirestore(projectId);
    const doc = { userId: user.uid, ...user };
    const testDoc = adminDB.collection(usersCollection).doc(user.uid);
    await testDoc.set(doc);

    const db = getFirestore(projectId, user);
    const query = db.collection(usersCollection).doc(user.uid);
    await firebase.assertSucceeds(query.get());
  })

  it("Can't read documents in the users collection with no authenticated user", async () => {
    const db = getFirestore(projectId);
    const query = db.collection(usersCollection).where("userId", "==", "garbage");
    await firebase.assertFails(query.get());
  })

  it("Can read documents in the users collection with the same userId as our user  ", async () => {
    const db = getFirestore(projectId, user);
    const query = db.collection(usersCollection).where("userId", "==", user.uid);
    await firebase.assertSucceeds(query.get());
  })

  it("Can read documents in the users collection with the same userId as our user", async () => {
    const adminDB = getAdminFirestore(projectId);
    const doc = { userId: user.uid, ...user };
    const testDoc = adminDB.collection(usersCollection).doc(user.uid);
    await testDoc.set(doc);

    const db = getFirestore(projectId, user);
    const query = db.collection(usersCollection).where("userId", "==", user.uid);
    const result = await query.get();
    expect(result.size).toBe(1);
  })

})

describe("Firestore users create rules test", () => {

  it("Can't create document in users collection with unauthed user", async () => {
    const db = getFirestore(projectId);
    const query = db.collection(usersCollection).doc("testId");
    await firebase.assertFails(query.set({ userId: "testId", name: "tester", email: "test@test.com.au" }));
  })

  it("Can create document in users collection with authenticated user", async () => {
    const db = getFirestore(projectId, user);
    const doc = { userId: user.uid, ...user };
    const query = db.collection(usersCollection).doc(user.uid);
    await firebase.assertSucceeds(query.set(doc));
  })

})

describe("Firestore users update rules test", () => {

  it("Can't update document in users collection with unauthed user", async () => {
    const adminDB = getAdminFirestore(projectId);
    const doc = { userId: user.uid, ...user };
    const testDoc = adminDB.collection(usersCollection).doc(user.uid);
    await testDoc.set(doc);

    const db = getFirestore(projectId);
    const query = db.collection(usersCollection).doc(user.uid);
    const newDetails = {...doc, name:"Izzy", email:"izzy@test.com.au"};
    await firebase.assertFails(query.set(newDetails));
  })

  it("Can update document in users collection with same userId as our user", async () => {
    const db = getFirestore(projectId, user);
    const doc = { userId: user.uid, ...user };
    const testDoc = db.collection(usersCollection).doc(user.uid);
    await testDoc.set(doc);

    const query = db.collection(usersCollection).doc(user.uid);
    const newDetails = {...doc, name:"Izzy", email:"izzy@test.com.au"};
    await query.set({...newDetails});
    const result = await query.get();
    expect(result.data()).toMatchObject(newDetails);
  })

})

describe("Firestore users delete rules test", () => {

  it("Can't delete document in users collection with unauthed user", async () => {
    const adminDB = getAdminFirestore(projectId);
    const doc = { userId: user.uid, ...user };
    const testDoc = adminDB.collection(usersCollection).doc(user.uid);
    await testDoc.set(doc);

    const db = getFirestore(projectId);
    const query = db.collection(usersCollection).doc(user.uid);
    await firebase.assertFails(query.delete());
  })

  it("Can't delete document in users collection with same userId as our user", async () => {
    const adminDB = getAdminFirestore(projectId);
    const doc = { userId: user.uid, ...user };
    const testDoc = adminDB.collection(usersCollection).doc(user.uid);
    await testDoc.set(doc);

    const db = getFirestore(projectId,user);
    const query = db.collection(usersCollection).doc(user.uid);
    await firebase.assertFails(query.delete());
  })

})

afterAll(async () => {
  await teardown();
})