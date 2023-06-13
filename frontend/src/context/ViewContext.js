import React, { createContext, useEffect, useReducer } from "react";

const initialActiveView = localStorage.getItem("activeView") || "tables";
let initialAdminView = false;
try {
  initialAdminView = JSON.parse(localStorage.getItem("adminView"));
  if (initialAdminView === null || initialAdminView === undefined) {
    initialAdminView = false;
  }
} catch (error) {
  initialAdminView = false;
}

const INITIAL_STATE = {
  activeView: initialActiveView,
  adminView: initialAdminView,
};

export const ViewContext = createContext(INITIAL_STATE);

const ViewReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_VIEW":
      localStorage.setItem("activeView", action.payload);
      return { ...state, activeView: action.payload };
    case "SET_ADMIN_VIEW":
      localStorage.setItem("adminView", JSON.stringify(action.payload));
      return { ...state, adminView: action.payload };
    default:
      return state;
  }
};

export const ViewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ViewReducer, INITIAL_STATE);

  const handleViewChange = (view, adminView) => {
    dispatch({ type: "SET_ACTIVE_VIEW", payload: view });
    dispatch({ type: "SET_ADMIN_VIEW", payload: adminView });
  };

  const handleLogout = () => {
    handleViewChange(state.activeView, false);
  };

  useEffect(() => {
    localStorage.setItem("activeView", state.activeView);
    localStorage.setItem("adminView", JSON.stringify(state.adminView));
  }, [state.activeView, state.adminView]);

  const contextValue = {
    activeView: state.activeView,
    adminView: state.adminView,
    handleViewChange,
    handleLogout,
  };

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
};
