import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// import moment from "moment";
import MomentUtils from "@date-io/moment";



function AddTraining(props){


    const [training, setTraining] = useState({
        date : new Date(),
        activity: '',
        duration: '',
        customer: ''
    })

    const handleClose = () => {
        props.closeWindow(false);
    }

    const inputChanged = e => {
        setTraining({...training, [e.target.name] : e.target.value})
    }

    const handleSave = () => {
        // props.add(customer);
        console.log("import works")
        console.log(training);
        handleClose();
        // prop.setCopen();
    }

    return(
        <div>
      <Dialog open={props.open} onClose={handleClose}
      style={{backgroundColor: 'red'}}>
        <DialogTitle>Add New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the information {training.customer}
          </DialogContentText>

          <LocalizationProvider dateAdapter={MomentUtils}>
           <MobileDateTimePicker
              value={training.date}
              onChange={(newValue) => {setTraining({...training, 'date': newValue})}}
             renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

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
            name="customer"
            value={training.customer}
            onChange={inputChanged}
            label="Customer"
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

/*
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
            variant="standard"
          /> */