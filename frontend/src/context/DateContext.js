import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  date: null,
};

export const DateContext = createContext(INITIAL_STATE);

const DateReducer = (state, action) => {
  switch (action.type) {
    case "NEW_DATE":
      console.log("Dispatched Date:", action.payload.date);
      const newState = {
        ...state,
        date: action.payload.date,
      };
      console.log("Updated State:", newState);
      return newState;
    case "RESET_DATE":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const DateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DateReducer, INITIAL_STATE);

  return (
    <DateContext.Provider
      value={{
        date: state.date,
        dispatch,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
