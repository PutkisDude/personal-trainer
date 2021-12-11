import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';

function AddTraining(props){

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({ date : new Date(), activity: '', duration: 0, customer : ' '})


    const handleOpen = () => {
      setTraining({...training, customer : props.customer.links[0].href})
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false);
    }

    const inputChanged = e => {
        setTraining({...training, [e.target.name] : e.target.value})
    }

    const dateInPutChanged = value => {
      setTraining({ ...training, date: value })
    }

    const handleSave = () => {

        setTraining({...training, customer : props.customer.links[0].href});
        
      fetch('https://customerrest.herokuapp.com/api/trainings', {method: 'POST', 
      headers: {'Content-type' : 'application/json'}, body: JSON.stringify(training) })
      .then(res => {
        handleClose();
        props.showMsg("Training added", "success")
      })
      .catch(e => console.error(e))
      props.showMsg("Something went wrong..", "error");
    }

    return(
        <div>
          <button variant="contained"onClick={handleOpen} className="btn btn-sm btn-success bi bi-calendar-plus" ></button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Customer {props.customer.firstname + ' ' + props.customer.lastname} - New Training</DialogTitle>
        <DialogContent>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <InputLabel>Date and Time</InputLabel>
           <MobileDateTimePicker
              value={training.date}
              format="dd.mm.yyyy hh:mm"
              variant="standard"
              fullWidth
              required
              name="date"
              onChange={(val) => dateInPutChanged(val)}
             renderInput={(props) => <TextField {...props} />}
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
            required
          />
                    <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration (mins)"
            fullWidth
            variant="standard"
            required
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