import { createContext, useState, useMemo, ReactNode } from "react";

type DeleteModal = {
  projectId: number | undefined;
};

const initDeleteModal: Partial<DeleteModal> = {
  projectId: undefined,
};

type DeleteModalContextProviderProps = { children: ReactNode };
type TypeContext = {
  deleteModal: Partial<DeleteModal>;
  setDeleteModal: (c: Partial<DeleteModal>) => void;
};

const DeleteModalContext = createContext<TypeContext>({
  deleteModal: initDeleteModal,
  setDeleteModal: () => {},
});

export function DeleteModalContextProvider({
  children,
}: DeleteModalContextProviderProps) {
  const [deleteModal, setDeleteModal] =
    useState<Partial<DeleteModal>>(initDeleteModal);
  const value = useMemo(
    () => ({
      deleteModal,
      setDeleteModal,
    }),
    [deleteModal]
  );
  return (
    <DeleteModalContext.Provider value={value}>
      {children}
    </DeleteModalContext.Provider>
  );
}

export default DeleteModalContext;
