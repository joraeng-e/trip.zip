import React, { ReactNode, createContext, useContext, useState } from 'react';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark');
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('DarkModeContext는 DarkModeProvider 써야함');
  }
  return context;
};
