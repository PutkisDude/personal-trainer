import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        FetchCustomers();
    }, [])

    const FetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }
    
    const defaultCol = {
        resizable:true, 
        sortable:true, 
        filter:true, 
        lockPosition: true
    }
    
    const columns = [
        {headerName: 'Person information', children: [
            {headerName: 'First name',lockPosition: true, field: 'firstname', width:150},
            {headerName: 'Last name', field: 'lastname', width: 150},
        ]},
        {headerName: 'Contact', children: [
            {field: 'email', sortable:false},
            {field: 'phone', sortable:false, width:160, columnGroupShow: 'open'}
        ]
        },
        {headerName: 'Address', children: [
            {field: 'city', width:120, columnGroupShow: 'close'},
            {headerName:'Street Address', field: 'streetaddress', columnGroupShow: 'open'},
            {field: 'postcode', columnGroupShow: 'open'}] }
    ]

    return(
            <div className="ag-theme-alpine-dark" style={{height:600, width:'100%'}}>
                <AgGridReact 
                rowData={customers}
                columnDefs={columns}
                defaultColDef={defaultCol}
                pagination={true}
                paginationPageSize={10}
                />
            </div>
    )

}

export default CustomerList;