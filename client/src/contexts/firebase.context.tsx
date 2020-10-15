import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import React, { createContext, PropsWithChildren } from "react";
import { IUser } from "../types";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    // For development purposes. Will store all data in emulated firestore
    if (process.env.NODE_ENV.toLowerCase() === "development") {
      this.db.settings({
        host: "localhost:3002",
        ssl: false,
      });
    }
  }

  // Auth API
  signUp = async (formUser: IUser, password: string, file: File | null) => {
    const createdUser = await this.auth.createUserWithEmailAndPassword(
      formUser.email,
      password
    );
    if (createdUser.user === null) {
      throw Error("User could not be created");
    }

    const imagePath =
      file !== null
        ? await this.uploadFile(
            file,
            `logo/${createdUser.user?.uid}_${Date.now()}`
          )
        : null;

    const storedUser: IUser =
      imagePath === null
        ? {
            ...formUser,
            userId: createdUser.user?.uid,
          }
        : {
            ...formUser,
            logo: imagePath,
            userId: createdUser.user?.uid,
          };

    const { id } = await this.db.collection("users").add(storedUser);
    const user = await this.db.collection("users").doc(id).get();
    return user.data();
  };

  signIn = async (email: string, password: string) => {
    const credentials = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (credentials.user === null) {
      throw new Error("User could not be found");
    }

    const user = await this.db
      .collection("users")
      .where("userId", "==", credentials.user?.uid)
      .limit(1)
      .get();
    return user.size <= 0 ? null : user.docs[0].data();
  };

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = (email: string) =>
    this.auth.sendPasswordResetEmail(email);

  updatePassword = (password: string) =>
    this.auth.currentUser?.updatePassword(password);

  getTokenId = async () => await this.auth.currentUser?.getIdToken(false);

  uploadFile = async (file: File, path: string) => {
    const metadata = {
      contentType: file.type,
    };

    const storageRef = this.storage.ref(`images/${path}`);
    await storageRef.put(file, metadata);
    return await storageRef.getDownloadURL();
  };
}

// Don't want to initialise it yet. Equivalent to setting a null instance
const FirebaseContext = createContext<Firebase | null>(null);
const FirebaseProvider = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { Firebase, FirebaseContext, FirebaseProvider };
