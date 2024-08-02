import React, { createContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  canNavigate: boolean;
  setCanNavigate: (value: boolean) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  canNavigate: true,
  setCanNavigate: () => {},
});

export const NavigationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [canNavigate, setCanNavigate] = useState(true);

  return (
    <NavigationContext.Provider value={{ canNavigate, setCanNavigate }}>
      {children}
    </NavigationContext.Provider>
  );
};
