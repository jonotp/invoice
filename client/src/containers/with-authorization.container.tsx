import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../contexts/firebase.context";
import * as ROUTES from "../routes";

const withAuthorization = (
  condition: (authUser: firebase.User | null) => boolean
) => (component: JSX.Element) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    console.log("Within authorization");
    firebaseContext?.auth.onAuthStateChanged((authUser) => {
      if (!condition(authUser)) {
        console.log("User is not authorized for this route");
        history.push(ROUTES.SIGN_UP);
      } else {
        console.log("User is authorized");
      }
      setIsLoading(false);
    });
  });

  // Cannot use UserContext to validate auth state because dispatch occurs
  // asynchronously on next re-render and will not be effective immediately 
  return !isLoading ? component : null;
};

export default withAuthorization;
