import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../contexts/firebase.context";
import * as ROUTES from "../routes";

const withAuthorization = (
  condition: (authUser: firebase.User | null) => boolean
) => (component: JSX.Element) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    console.log("Within authorization");

    const listener = firebase?.auth.onAuthStateChanged((authUser) => {
      if (!condition(authUser)) {
        console.log("User is not authorized for this route");
        history.push(ROUTES.SIGN_UP);
      } else {
        console.log("User is authorized");
      }
    });

    return () => {
      if (listener !== undefined) listener();
    };
  });

  // Cannot use UserContext to validate auth state because dispatch occurs
  // asynchronously on next re-render and will not be effective immediately
  return component;
};

export default withAuthorization;
