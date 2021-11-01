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
        {field: 'firstname', sortable:true, filter:true},
        {field: 'lastname', sortable:true, filter:true},
        {field: 'phone', sortable:false},
        {field: 'email', sortable:false},
        {field: 'city', sortable: true, filter:true},
        {field: 'streetaddress', sortable: false},
        {field: 'postcode', sortable: false}
    ]

    return(
        <div>

            <div className="ag-theme-alpine-dark" style={{height:800, width:'100%'}}>
                <AgGridReact 
                style={{width:'100%', height:500}}
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                />
            </div>

        </div>
    )

}

export default CustomerList;