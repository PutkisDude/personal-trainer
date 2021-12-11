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
        `
     }
    return creRow;
}

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [sever, setSever] = useState("success");
    const [gridApi, setGridApi] = useState(null);

    useEffect(() => {
        FetchCustomers();
    }, [])

    const FetchCustomers = async () => {
        await fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const showMsg = (msg, sever) => {
        setSever(sever);
        setMsg(msg);
        setSnackOpen(true);
    }

    const exportCustomers = () => {
        var params = {
            skipGroups: true,
            fileName: "customers.csv",
            columnKeys : ['fname', 'lname', 'email', 'phone',  'city', 'addr', 'postc']
        };
        gridApi.exportDataAsCsv(params);
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
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
                    showMsg("Cancel Delete", "info")
            }
        }
            if (action === 'update'){
                params.api.stopEditing(false); // STOP EDITING = ACCEPT CHANGES -- WITHOUT THIS RESET VALUES
                UpdateCustomer(params.data);
            }
            if (action === 'cancel'){
                params.api.stopEditing(true); // STOP EDITING = CANCEL CHANGES -- RESET VALUES
                showMsg("Cancel changes", "info");
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
                showMsg("Customer added.", "success");
            }else{
                showMsg("Oops! Something went wrong", "error");
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
                showMsg("Updated customer", "success");
            }else{
                showMsg("Update failed", "error");
            }
        })
            .catch(e => console.error(e))
    }

    const DeleteCustomer = data => {
        fetch(data.links[0].href, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                FetchCustomers();
                showMsg(("Deleted customer " + data.firstname + " " + data.lastname), "success")
            }else{
                showMsg("Oops! Something went wrong", "error");
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
            {headerName: 'First name',lockPosition: true, floatingFilter:true,field: 'firstname', width:120, colId : 'fname'},
            {headerName: 'Last name', field: 'lastname', width: 120, colId : 'lname'},
        ]},
        {headerName: 'Contact', children: [
            {field: 'email', sortable:false, colId : 'email'},
            {field: 'phone', sortable:false, width:140, columnGroupShow: 'open', colId : 'phone'}
        ]
        },
        {headerName: 'Address', children: [
            {field: 'city', width:120,  columnGroupShow: 'close', colId: 'city'},
            {headerName:'Street Address', width: 150, filter:false, field: 'streetaddress', columnGroupShow: 'open', colId : 'addr'},
            {field: 'postcode', filter:false, width: 80, columnGroupShow: 'open', colId : 'postc'}] },
        
        {headerName: 'Actions', width:240,  children: [
            {headerName: 'Modify',
                width:80,
                editable:false, 
                filter:false, 
                sortable:false,
                field: 'links.self.href',
                colId : 'actions',
                cellRenderer: columnActions
                },
            {
                headerName: 'AT',
                width:45,
                editable: false,
                filter: false,
                sortable : false,
                field: 'links.self.href',
                colId : 'addtrain',
                cellRendererFramework : params => {
                    return (<AddTraining showMsg={showMsg} customer={params.data} />)
                }
            }
            ]}    
    ]

    return(
            <div className="ag-theme-balham-dark fullheight">
                <AddCustomer addCustomer={addCustomer} /><button onClick={() => exportCustomers()}>Export csv</button>
                <AgGridReact
                    rowData={customers}
                    onRowEditingStopped={editStops}
                    onRowEditingStarted={editStarts}
                    onCellClicked={actionActivated}
                    suppressClickEdit={true}
                    columnDefs={columns}
                    defaultColDef={defaultCol}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={12}
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