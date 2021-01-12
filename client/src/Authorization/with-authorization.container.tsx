import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App/app.context";
import FirebaseContext from "../Firebase/firebase.context";
import * as ROUTES from "../routes";

const withAuthorization = (
  condition: (authUser: firebase.User | null) => boolean
) => (component: JSX.Element) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const {state : {auth}} = useContext(AppContext);

  useEffect(() => {
    const listener = firebase?.auth.onAuthStateChanged((authUser) => {
      if(authUser === null) {
        console.log("Unauthenticated user")
        history.push(ROUTES.SIGN_IN);
      }
      else if (!condition(authUser)) {
        console.log("User is not authorized for this route");
        history.push(ROUTES.NOT_FOUND);
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
