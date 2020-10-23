import * as firebase from "@firebase/testing";
import * as path from "path";
import { setup, teardown, getFirestore } from "../helper";

let projectId: string;
const unspecifiedCollection = "users";
const docId = "Ad12398aasu";
const user = { uid: "Ad12398aasu", email: "test@invoice.com" };

beforeAll(async () => {
  const rulesPath = path.join(__dirname, "./firestore.rules");
  const setupObject = await setup(rulesPath, projectId);
  projectId = setupObject.projectId;
})

describe("Firestore unmatched rules test", () => {

  it("Can't read document from collection with unspecified rules", async () => {
    var db = getFirestore(projectId);
    var query = db.collection(unspecifiedCollection).doc(docId);
    await firebase.assertFails(query.get());
  })

  it("Can't write document from collection with unspecified rules", async () => {
    var db = getFirestore(projectId);
    var query = db.collection(unspecifiedCollection).doc(docId);
    await firebase.assertFails(query.set({ address: "16 test avenue" }));
  })

  it("Can't read from collection with a unspecified rules as a user", async () => {
    var db = getFirestore(projectId, user);
    var query = db.collection(unspecifiedCollection).doc(docId);
    await firebase.assertFails(query.get());
  })

  it("Can't write to a collection with unspecified rules as a user", async () => {
    var db = getFirestore(projectId, user);
    var query = db.collection(unspecifiedCollection).doc(docId);
    await firebase.assertFails(query.set({ address: "16 test avenue" }));
  })

})

afterAll(async () => {
  await teardown();
})