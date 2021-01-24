import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { IInvoice, IUser } from "../types";

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
    if (app.apps.length <= 0) {
      app.initializeApp(config);
    }

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    // For development purposes. Will store all data in emulated firestore
    // if (process.env.NODE_ENV.toLowerCase() === "development") {
    //   this.db.settings({
    //     host: "localhost:8080",
    //     ssl: false,
    //   });
    // }
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

    await this.db
      .collection("users")
      .doc(createdUser.user?.uid)
      .set(storedUser);

    return await this.getUser(createdUser.user?.uid);
  };

  signIn = async (email: string, password: string) => {
    const credentials = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (credentials.user === null) {
      throw new Error("User could not be found");
    }

    return await this.getUser(credentials.user?.uid);
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

  getUser = async (userId: string) => {
    const user = await this.db.collection("users").doc(userId).get();
    return user.data();
  };

  updateUser = async (userId: string, user: IUser) => {
    this.db.collection("users").doc(userId).set(user);
    return await this.getUser(userId);
  };

  saveInvoice = async (invoice: IInvoice, file: File | null) => {

    const updatedInvoice: IInvoice =
    {
      ...invoice,
      supplier: {
        ...invoice.supplier,
        
        // TODO: set the upload file in the logo-uploader component
        // If a new logo was attached then the image needs to be uploaded to storage
        // before saving
        logo: invoice.supplier.logo?.match("^blob") && file !== null 
          ? await this.uploadFile( file, `logo/${this.auth.currentUser?.uid}_${Date.now()}`) 
          : invoice.supplier.logo

      }
    };

    this.db.collection("invoices").doc(invoice.invoiceId).set(updatedInvoice);
    return updatedInvoice;
  }
}

export default Firebase;