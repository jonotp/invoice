import * as firebase from "@firebase/testing";

const setup = async (rules: string, auth?: object) => {

  // We are creating a temporary project with firebase so needs a unique projectId
  const projectId = `firestore-rules-${Date.now()}`
  const db = await firebase.initializeTestApp({ projectId: projectId, auth: auth }).firestore();
  const adminDB = await firebase.initializeAdminApp({ projectId: projectId }).firestore();
  await firebase.loadFirestoreRules({
    projectId: projectId,
    rules: rules,
  });

  return { db, adminDB, projectId };
}

const teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()));
}

export { setup, teardown };