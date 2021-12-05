import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

const columnActions = params => {
    let creRow = document.createElement("div");

    let editingCells = params.api.getEditingCells();

    let isCurrentRowEditing = editingCells.some((cell) => {
        return cell.rowIndex === params.node.rowIndex;
    });


    if (isCurrentRowEditing) {
        creRow.innerHTML = `
        <button class="btn btn-sm btn-success bi bi-check-circle"" data-action="update"></button>
        <button class="btn btn-sm btn-danger bi bi-x-circle" data-action="cancel"></button>
        `
    }else {
        creRow.innerHTML = `
        <button data-action="del"class="bi btn-danger bi-trash btn btn-sm"></button>
        <button data-action="edit" class="btn btn-sm btn-info bi bi-pencil-square square"></button>
        <button data-action="addtraining" class="btn btn-sm btn-success bi bi-calendar-plus"></button>
        `
     }
    return creRow;
}

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [sever, setSever] = useState("success");
    const [addCustOpen, setCustOpen] = useState(false);

    useEffect(() => {
        FetchCustomers();
    }, [])

    const FetchCustomers = async () => {
        await fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const actionActivated = params => {
        if (params.column.colId === 'actions' && params.event.target.dataset.action) {
            let action = params.event.target.dataset.action;
            if (action === 'edit'){
                params.api.startEditingCell({
                    rowIndex : params.node.rowIndex,
                    colKey : params.columnApi.getDisplayedCenterColumns()[0].colId
                })
            }
            if (action === 'del'){
                if (window.confirm("Are you sure?")){  // MUI dialogilla olisin voinut tehdä nätimmänkin :)
                DeleteCustomer(params.data);
                } else {
                setMsg("Cancel delete");
                setSever("info");
                setSnackOpen(true);
            }
        }
            if (action === 'addtraining'){
                console.log("works")
                setCustOpen(true)
                console.log(params.data.links)
                return <AddTraining />
            }

            if (action === 'update'){
                params.api.stopEditing(false); // STOP EDITING = ACCEPT CHANGES -- WITHOUT THIS RESET VALUES
                UpdateCustomer(params.data);
            }
            if (action === 'cancel'){
                params.api.stopEditing(true); // STOP EDITING = CANCEL CHANGES -- RESET VALUES
                setSever("info")
                setMsg("Cancel changes")
                setSnackOpen(true);
            }
        }   
    }

    const editStarts = params => {
        params.api.refreshCells({
          columns: ["actions"],
          rowNodes: [params.node],
          force: true
        });
      }
    const editStops = params =>  {
        params.api.refreshCells({
          columns: ["actions"],
          rowNodes: [params.node],
          force: true
        });
      }

    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok){
                FetchCustomers();
                setMsg("Customer added.");
                setSever("success");
                setSnackOpen(true);
            }else{
                setMsg("Oops! Something went wrong!");
                setSever("error");
                setSnackOpen(true);
            }
        }).catch(e => console.error(e))
        
    }

    const UpdateCustomer = data => {
        fetch(data.links[0].href, {method: "PUT",
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(data)
            })
        .then(response => {
            if(response.ok){
                FetchCustomers();
                setSever("success")
                setMsg("Updated customer");
                setSnackOpen(true);
            }else{
                setSever("error")
                setMsg("Update failed");
                setSnackOpen(true);
            }
        })
            .catch(e => console.error(e))
    }

    const DeleteCustomer = data => {
        fetch(data.links[0].href, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                FetchCustomers();
                setSever('success')
                setMsg("Deleted customer: "+ data.firstname + " " + data.lastname);
                setSnackOpen(true);
            }else{
                setSever("error");
                setMsg("Oops! Something went wrong");
                setSnackOpen(true);
            }
        })
    }
    
    const defaultCol = {
        resizable:true, 
        sortable:true, 
        filter:true, 
        lockPosition: true,
        floatingFilter: true,
        editable: true
    }
    
    const columns = [
        
        {headerName: 'Person information', floatingFilter:true, children: [
            {headerName: 'First name',lockPosition: true, floatingFilter:true,field: 'firstname', width:120},
            {headerName: 'Last name', field: 'lastname', width: 120},
        ]},
        {headerName: 'Contact', children: [
            {field: 'email', sortable:false},
            {field: 'phone', sortable:false, width:140, columnGroupShow: 'open'}
        ]
        },
        {headerName: 'Address', children: [
            {field: 'city', width:120,  columnGroupShow: 'close'},
            {headerName:'Street Address', width: 150, filter:false, field: 'streetaddress', columnGroupShow: 'open'},
            {field: 'postcode', filter:false, width: 80, columnGroupShow: 'open'}] },
        
        {headerName: 'Customer', children: [
            {headerName: 'Actions',
                width:120,
                editable:false, 
                filter:false, 
                sortable:false,
                field: 'links.self.href',
                colId : 'actions',
                cellRenderer: columnActions
            }
            ]}    
    ]

    return(
            <div className="ag-theme-balham-dark fullheight">
                <AddCustomer addCustomer={addCustomer} />
                <AddTraining closeWindow={setCustOpen} open={addCustOpen} />
                <AgGridReact
                    rowData={customers}
                    onRowEditingStopped={editStops}
                    onRowEditingStarted={editStarts}
                    onCellClicked={actionActivated}
                    suppressClickEdit={true}
                    columnDefs={columns}
                    defaultColDef={defaultCol}
                    pagination={true}
                    paginationPageSize={10}
                    editType="fullRow"
                />
                
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={1800}
                    onClose={() => setSnackOpen(false)}
                    message={msg}
                >
                    <Alert variant="filled" severity={sever}>{msg}</Alert>
                </Snackbar>
            </div>
    )

}

export default CustomerList;