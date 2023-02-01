import { ReactNode, useContext } from "react";
import ShareModalContext from "../contexts/shareModalContext";
import styles from "./Layout.module.scss";
import ShareModal from "./ShareModal";

type Children = { children: ReactNode };

const Layout = ({ children }: Children) => {
  const { shareModal, setShareModal } = useContext(ShareModalContext);

  const closeShareModal = () => {
    setShareModal({});
  };

  return (
    <>
      <div className={styles.layoutContainer}>
        <div>{children}</div>
      </div>
      {shareModal.projectId !== undefined && (
        <ShareModal closeShareModal={closeShareModal} />
      )}
    </>
  );
};

export default Layout;
