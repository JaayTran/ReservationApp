import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  date: [],
};

export const DateContext = createContext(INITIAL_STATE);

const DateReducer = (state, action) => {
  switch (action.type) {
    case "NEW_DATE":
      return action.payload;
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
