import React, { Component } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export class ListPizza extends Component {
  static displayName = ListPizza.name;

  constructor(props) {
    super(props);
    this.state = { pizza: [], loading: true };
  }

  componentDidMount() {
    this.populatePizzaData();
  }

  static renderPizzaTable(pizza) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f6d664' }}>
              <TableCell>Name</TableCell>
              <TableCell>Size (EUR)</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizza.map(pizza => (
              <TableRow key={pizza.id} sx={{ ':hover': { backgroundColor: '#f6d664' } }}>
                <TableCell>{pizza.name}</TableCell>
                <TableCell>{pizza.size}</TableCell>
                <TableCell>{pizza.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ListPizza.renderPizzaTable(this.state.pizza);

    return (
      <div>
        <h1 id="tabelLabel" >Pizza list</h1>
        <p>Available pizzas to buy</p>
        {contents}
      </div>
    );
  }

  async populatePizzaData() {
    const response = await fetch('pizza');
    const data = await response.json();
    this.setState({ pizza: data, loading: false });
  }
}
