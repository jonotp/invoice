import React, { PropsWithChildren } from "react";
import { FirebaseProvider } from "../contexts/firebase.context";
import { UserContextProvder } from "../contexts/user.context";

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <FirebaseProvider>
      <UserContextProvder>
        {children}
      </UserContextProvder>
    </FirebaseProvider>
  );
};

export default Providers;
