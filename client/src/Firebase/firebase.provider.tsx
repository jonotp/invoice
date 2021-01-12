import Firebase from "./firebase";
import FirebaseContext from "./firebase.context";
import React, { PropsWithChildren } from "react";

const FirebaseProvider = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;