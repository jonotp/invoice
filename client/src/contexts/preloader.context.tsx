import React, {
  createContext,
  PropsWithChildren,
  useState,
} from "react";

const PreloaderContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoading: false,
  setIsLoading: () => null,
});

const PreloaderContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <PreloaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export { PreloaderContext, PreloaderContextProvider };
