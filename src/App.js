import React, { useEffect, useState, useMemo } from "react";
import { Container } from "reactstrap";
import TableContainer from "./TableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { SelectColumnFilter } from "./filters";
import { mockData } from "./mockData";

const App = () => {
  
  const [rowItems, setRowItems] = useState([]);
  
  useEffect(() => {
    setRowItems(mockData);
  }, []);

  useEffect(()=>{
    console.log(rowItems)
  }, [rowItems])

  const updateState = (row, data) =>{
    const toggleSponsor = (row.original.sponsor=="true") ? "false": "true";
    const updatedData = data.map(item => {
      return item.name.first == row.original.name.first ? {
        ...item,
        sponsor: toggleSponsor
      }: item;
    })
    setRowItems(updatedData)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "name.title",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "First Name",
        accessor: "name.first",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Last Name",
        accessor: "name.last",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "City",
        accessor: "location.city",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Associated Sponsor",
        accessor: "sponsor",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ value, row, data }) => {
          return(
            <input type="checkbox" checked = {value=="true"? true: false} onChange={()=> updateState(row, data)}></input>
          )
        },
      },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={rowItems}/>
    </Container>
  );
};

export default App;
