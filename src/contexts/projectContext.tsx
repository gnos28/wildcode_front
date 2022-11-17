import { createContext, useState, useMemo, ReactNode } from "react";
// import { ExtProject } from "../interfaces";

type ExtProject = {
  name: string;
};
const initProject: ExtProject = {
  name: "",
};

type ProjectContextProviderProps = { children: ReactNode };
type TypeContext = {
  project: ExtProject;
  setProject: (c: ExtProject) => void;
};

const ProjectContext = createContext<TypeContext>({
  project: initProject,
  setProject: () => {},
});

export function ProjectContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [project, setProject] = useState<ExtProject>(initProject);
  const value = useMemo(
    () => ({
      project,
      setProject,
    }),
    [project]
  );
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export default ProjectContext;
