import Firebase from "./firebase";
import { createContext } from "react";

// Don't want to initialise it yet. Equivalent to setting a null instance
const FirebaseContext = createContext<Firebase | null>(null);

export default FirebaseContext;
