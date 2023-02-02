import { createContext, useState, useMemo, ReactNode } from "react";

type ForceProjectListUpdateProviderProps = { children: ReactNode };
type TypeContext = {
  forceProjectListUpdate: boolean;
  setForceProjectListUpdate: (c: boolean) => void;
};

const ForceProjectListUpdateContext = createContext<TypeContext>({
  forceProjectListUpdate: false,
  setForceProjectListUpdate: () => {},
});

export function ForceProjectListUpdateContextProvider({
  children,
}: ForceProjectListUpdateProviderProps) {
  const [forceProjectListUpdate, setForceProjectListUpdate] =
    useState<boolean>(false);
  const value = useMemo(
    () => ({
      forceProjectListUpdate,
      setForceProjectListUpdate,
    }),
    [forceProjectListUpdate]
  );
  return (
    <ForceProjectListUpdateContext.Provider value={value}>
      {children}
    </ForceProjectListUpdateContext.Provider>
  );
}

export default ForceProjectListUpdateContext;
