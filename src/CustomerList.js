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
        {headerName: 'First name', field: 'firstname', sortable:true, filter:true, width:150},
        {headerName: 'Last name', field: 'lastname', sortable:true, filter:true, width: 150},
        {field: 'phone', sortable:false, width:160},
        {field: 'email', sortable:false},
        {headerName: 'Address', children: [
            {field: 'city', sortable:true},
            {headerName:'Street Address', field: 'streetaddress'},
            {field: 'postcode', sortable:true}] }
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