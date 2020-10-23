import * as firebase from "@firebase/testing";
import * as fs from "fs";

const setup = async (rulesPath: string, projectId?: string) => {

  // We are creating a temporary project with firebase so needs a unique projectId
  const rules = fs.readFileSync(rulesPath, "utf8");
  projectId = projectId || `firestore-rules-${Date.now()}`
  await firebase.loadFirestoreRules({
    projectId: projectId,
    rules: rules,
  });

  return { projectId };
}

const teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()));
}

const getFirestore = (projectId: string, auth?: object) => {
  return firebase.initializeTestApp({ projectId: projectId, auth: auth }).firestore();
}

const getAdminFirestore = (projectId: string) => {
  return firebase.initializeAdminApp({ projectId: projectId }).firestore();
}
export { setup, teardown, getFirestore, getAdminFirestore };