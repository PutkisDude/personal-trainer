import React, { createContext, useState } from 'react';


export const SnackbarContext = createContext({
  setSnackbar: () => {
  },
  snackbar: {}
});
	
export const SnackbarValueContext = createContext({});
export const SnackbarSetContext = createContext(() => {});

export const SnackbarContainer = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    alertMsg: '',
    alertSeverity: 'success'
  });
 
  const handleSnackbarSet = (alertMsg, alertSeverity = 'success') => {
    setSnackbar({
      alertMsg, alertSeverity
    })
  };
 
  const contextValue = {
    setSnackbar: handleSnackbarSet,
    snackbar
  };
 
  return (
	  <SnackbarValueContext.Provider value={snackbar}>
      <SnackbarSetContext.Provider value={handleSnackbarSet}>
          {children}
      </SnackbarSetContext.Provider>
    </SnackbarValueContext.Provider>
    )
};