import React, { useContext } from "react";
import Alert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";

import { SnackbarContext } from "../../context/SnackbarContext";

export default function MySnackbar() {

    const { snackbar, setSnackbar } = useContext(SnackbarContext);

    const { alertMsg } = snackbar;

    const { alertSeverity } = snackbar;

    const handleClose = () => {
        setSnackbar("");
    }

return(<Snackbar
        open={!!alertMsg}
        autoHideDuration={1800}
        message={"yeye"}
        onClose={handleClose}
        >
    <Alert variant="filled" severity={alertSeverity}>
        {alertMsg}
    </Alert>
    </Snackbar>)

}