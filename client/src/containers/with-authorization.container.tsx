import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../contexts/app.context";
import { FirebaseContext } from "../contexts/firebase.context";
import * as ROUTES from "../routes";

const withAuthorization = (
  condition: (authUser: firebase.User | null) => boolean
) => (component: JSX.Element) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const {state : {auth}} = useContext(AppContext);

  useEffect(() => {
    console.log("Within authorization");

    const listener = firebase?.auth.onAuthStateChanged((authUser) => {
      if (!condition(authUser)) {
        console.log("User is not authorized for this route");
        history.push(ROUTES.SIGN_IN);
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
  return !!auth ? component : null;
};

export default withAuthorization;
