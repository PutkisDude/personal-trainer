import React, {useContext} from 'react';
import { SnackbarContext } from '../../context/SnackbarContext';
 
const Content = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const handleClick = () => {
    setSnackbar("testing", "error");
  };
 
  return (
    <div>
      <button onClick={handleClick}>Open simple snackbar</button>
    </div>
  );
};
 
export default Content;