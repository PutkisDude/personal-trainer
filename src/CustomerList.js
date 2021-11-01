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

    const columns = [
        {headerName: 'Person information', children: [
            {headerName: 'First name', field: 'firstname', sortable:true, filter:true, width:150},
            {headerName: 'Last name', field: 'lastname', sortable:true, filter:true, width: 150},
        ]},
        {headerName: 'Contact', children: [
            {field: 'email', sortable:false},
            {field: 'phone', sortable:false, width:160, columnGroupShow: 'open'}
        ]
        },
        {headerName: 'Address', children: [
            {field: 'city', sortable:true, width:120, columnGroupShow: 'close'},
            {headerName:'Street Address', field: 'streetaddress', columnGroupShow: 'open'},
            {field: 'postcode', sortable:true, columnGroupShow: 'open'}] }
    ]

    return(
            <div className="ag-theme-alpine-dark" style={{height:600, width:'100%'}}>
                <AgGridReact 
                defaultColdDef={{sortable:true, filter:true}}
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                />
            </div>
    )

}

export default CustomerList;