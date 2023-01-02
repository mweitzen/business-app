import React, { createContext, useContext, useState } from "react";

interface IDisplayContext {
  displaySidebar: boolean;
  setDisplaySidebar: (val: boolean) => void;
}

const initialState: IDisplayContext = {
  displaySidebar: false,
  setDisplaySidebar: () => {},
};

const DisplayContext = createContext<IDisplayContext>(initialState);

const DisplayProvider = ({ children }: { children: React.ReactNode }) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <DisplayContext.Provider
      value={{
        displaySidebar,
        setDisplaySidebar,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export default DisplayProvider;

export const useDisplayContext = () => useContext(DisplayContext);
