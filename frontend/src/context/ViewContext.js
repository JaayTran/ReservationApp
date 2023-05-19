import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState("tables");

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const contextValue = {
    activeView,
    handleViewChange,
  };

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
};
