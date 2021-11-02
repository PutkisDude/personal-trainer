import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

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
        lockPosition: true,
        floatingFilter: true
    }
    
    const columns = [
        {headerName: 'Person information', floatingFilter:true, children: [
            {headerName: 'First name',lockPosition: true, floatingFilter:true,field: 'firstname', width:150},
            {headerName: 'Last name', field: 'lastname', width: 150},
        ]},
        {headerName: 'Contact', children: [
            {field: 'email', sortable:false},
            {field: 'phone', sortable:false, width:160, columnGroupShow: 'open'}
        ]
        },
        {headerName: 'Address', children: [
            {field: 'city', width:120,  columnGroupShow: 'close'},
            {headerName:'Street Address', filter:false,field: 'streetaddress', columnGroupShow: 'open'},
            {field: 'postcode', filter:false,columnGroupShow: 'open'}] }
    ]

    return(
            <div className="ag-theme-balham-dark fullheight">
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