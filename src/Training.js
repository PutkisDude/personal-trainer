import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import { format } from 'date-fns'


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { fi } from "date-fns/locale";


function Training() {

    const [trainings, setTrainings] = useState();

    useEffect(() => {
        FetchTrainings();
    }, []) 

    const FetchTrainings = async () => {
        await fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName : 'Activity', field:'activity', width:140},
        {headerName : 'Date', field: 'date', width:190,
        cellRenderer : (data) => {
            return data.value ? format(new Date(data.value), 'dd.MM.yyyy HH:mm', {locale : fi}) : ''; // olio on eri aikavyöhykkeellä.
        }},
        {headerName : 'Duration (min)', field: 'duration', width : 130},
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