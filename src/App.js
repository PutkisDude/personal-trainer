import './App.css';
import React from 'react';
import AppBarNavi from './components/AppBarNavi';
import { SnackbarContainer } from './context/SnackbarContext';
import MySnackbar from './components/snackbar/MySnackbar';

function App() {


    return (
      <SnackbarContainer>
      <div className="fullheight">
        <AppBarNavi />
      </div>
      <MySnackbar />

      </SnackbarContainer>
    );
}

export default App;
