import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props){

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = useState({
        date : '',
        activity: '',
        duration: '',
        customer: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        props.closeWindow(false);
    }

    const inputChanged = e => {
        setTraining({...training, [e.target.name] : e.target.value})
    }

    const handleSave = () => {
        // props.add(customer);
        console.log("import works")
        handleClose();
        // prop.setCopen();
    }

    //


    return(
        <div>
      <Dialog open={props.open} onClose={handleClose}
      style={{backgroundColor: 'red'}}>
        <DialogTitle>Add New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the information
          </DialogContentText>
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
            variant="standard"
          />
                    <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
                    <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration (mins)"
            fullWidth
            variant="standard"
          />
        <TextField
            margin="dense"
            name="postcode"
            value={training.customer}
            onChange={inputChanged}
            label="Postcode"
            fullWidth
            variant="standard"
          />
        
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </div>

    );
}

export default AddTraining;