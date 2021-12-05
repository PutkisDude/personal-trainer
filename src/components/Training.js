import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import moment from "moment";

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';


function Training() {

    const [trainings, setTrainings] = useState();

    useEffect(() => {
        FetchTrainings();
    }, []) 

    const FetchTrainings = async () => {
        await fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    function fullname(c) {
        try{
            return c.data.customer.firstname + ' ' + c.data.customer.lastname;

        }catch(e){
            console.log('data missing');
        }
    }

    const DeleteTraining = params => {
        if(window.confirm("are you sure?")){
            fetch('https://customerrest.herokuapp.com/api/trainings/' + params.data.id, {method:'DELETE'})
            .then(response => {
                if(response.ok) {
                    FetchTrainings();
                }else{alert("Fail")}
            })
            .catch(e => console.error(e))
        }

    }

    const columns = [
        {headerName : 'Activity', field:'activity', width:140},
        {headerName : 'Date', field: 'date', width:190,
        cellRenderer : (data) => {
            return data.value ? moment(data.value).utcOffset(data.value).format('llll') : '';
        }},
        {headerName : 'Duration (min)', field: 'duration', width : 130},
        {headerName: 'Customer', field: 'firstname', valueGetter: fullname},
        {headerName: 'Delete', sortable: false, editable: false, filter: false, width:65,
        cellRendererFramework: params => 
            <IconButton aria-label='delete' onClick={() => DeleteTraining(params)}>
                 <DeleteIcon color='error' fontSize="small" />
            </IconButton>
        }    
        ]



    const defaultCol = {
        resizable:true, 
        sortable:true, 
        filter:true, 
        lockPosition: true,
        floatingFilter: true,
        width: 120
    }

    return (
         <div className="ag-theme-balham-dark fullheight">
                <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                defaultColDef={defaultCol}
                pagination={true}
                paginationPageSize={10}
                />
            </div>
)

}

export default Training;