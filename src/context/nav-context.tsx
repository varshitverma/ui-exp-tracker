import * as React from "react";

type Page = "dashboard" | "expenses" | "analytics";

interface NavContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  conversionRates: Record<string, number>;
  setConversionRates: (rates: Record<string, number>) => void;
}

const NavContext = React.createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = React.useState<Page>("dashboard");
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>("INR");
  const [conversionRates, setConversionRates] = React.useState<
    Record<string, number>
  >({});

  return (
    <NavContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCurrency,
        setSelectedCurrency,
        conversionRates,
        setConversionRates,
      }}
    >
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
