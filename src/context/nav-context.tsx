import * as React from "react";

type Page = "dashboard" | "expenses" | "analytics";

interface NavContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavContext = React.createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = React.useState<Page>("dashboard");

  return (
    <NavContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = React.useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within NavProvider");
  }
  return context;
}
