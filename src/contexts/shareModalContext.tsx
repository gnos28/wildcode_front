import { createContext, useState, useMemo, ReactNode } from "react";

type ShareModal = {
  projectId: number | undefined;
};

const initShareModal: Partial<ShareModal> = {
  projectId: undefined,
};

type ShareModalContextProviderProps = { children: ReactNode };
type TypeContext = {
  shareModal: Partial<ShareModal>;
  setShareModal: (c: Partial<ShareModal>) => void;
};

const ShareModalContext = createContext<TypeContext>({
  shareModal: initShareModal,
  setShareModal: () => {},
});

export function ShareModalContextProvider({
  children,
}: ShareModalContextProviderProps) {
  const [shareModal, setShareModal] =
    useState<Partial<ShareModal>>(initShareModal);
  const value = useMemo(
    () => ({
      shareModal,
      setShareModal,
    }),
    [shareModal]
  );
  return (
    <ShareModalContext.Provider value={value}>
      {children}
    </ShareModalContext.Provider>
  );
}

export default ShareModalContext;
