import React, { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  activeView: localStorage.getItem("activeView") || "tables",
};

export const ViewContext = createContext(INITIAL_STATE);

const ViewReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_VIEW":
      localStorage.setItem("activeView", action.payload);
      return { ...state, activeView: action.payload };
    default:
      return state;
  }
};

export const ViewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ViewReducer, INITIAL_STATE);

  const handleViewChange = (view) => {
    dispatch({ type: "SET_ACTIVE_VIEW", payload: view });
  };

  useEffect(() => {
    // Update the active view in local storage when it changes
    localStorage.setItem("activeView", state.activeView);
  }, [state.activeView]);

  const contextValue = {
    activeView: state.activeView,
    handleViewChange,
  };

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
};
