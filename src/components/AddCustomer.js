import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddCustomer(props){

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
        firstname : '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = e => {
        setCustomer({...customer, [e.target.name] : e.target.value})
    }

    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
    }

    return(
        <>
        <Button variant="contained" size="small" color="error" onClick={handleClickOpen} style={{margin:3}}> Add user</Button>

      <Dialog open={open} onClose={handleClose} style={{backgroundColor: 'red'}}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill Customer details
          </DialogContentText>
          <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="First name"
            fullWidth
            variant="standard"
          />
                    <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="Last name"
            fullWidth
            variant="standard"
          />
                    <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="Street address"
            fullWidth
            variant="standard"
          />
        <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="Postcode"
            fullWidth
            variant="standard"
          />
        <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
            variant="standard"
          />
        <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="Phone number"
            fullWidth
            variant="standard"
          />

        
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </>

    );
}

export default AddCustomer;