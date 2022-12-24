import React, { createContext, useContext, useState } from "react";

interface IThemeContext {
  mode: "dark" | "light";
  toggleMode: () => void;
}

const initialState: IThemeContext = {
  mode: "light",
  toggleMode: () => {},
};

const ThemeContext = createContext<IThemeContext>(initialState);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"dark" | "light">("light");
  function toggleMode() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => useContext(ThemeContext);
