import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export class OrderList extends Component {
  static displayName = OrderList.name;

  constructor(props) {
    super(props);
    this.state = { order: [], orderDetail: [], loading: true };
  }

  componentDidMount() {
    this.populateOrderData();
    this.populateOrderDetailData();
  }

  static renderOrderTable(order, orderDetail) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
          <TableRow style={{ backgroundColor: '#f6d664' }}>
              <TableCell>Pizza name</TableCell>
              <TableCell>Price (EUR)</TableCell>
              <TableCell>Pizza toppings</TableCell>
              <TableCell>Order date</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {order.map(order => {
            // Initialize toppings as an empty string
            let toppings = "";

            // Find the orderDetail for the current order
            for (let i = 0; i < orderDetail.length; i++) {
              if (orderDetail[i] && orderDetail[i].orderId === order.id) {
                toppings += orderDetail[i].toppingName.toString() + ', ';          
              }
            }
  
            return (
              <TableRow key={order.id} sx={{ ':hover': { backgroundColor: '#f6d664' } }}>
                <TableCell>{order.pizzaName}</TableCell>
                <TableCell>{order.pizzaPrice}</TableCell>
                <TableCell>{toppings}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : OrderList.renderOrderTable(this.state.order, this.state.orderDetail);

    return (
      <div>
        <h1 id="tabelLabel" >Orders list</h1>
        <p>All created orders</p>
        {contents}
      </div>
    );
  }

  async populateOrderData() {
    const response = await fetch('orders');
    const data = await response.json();

     // Get the topping names from the orderDetailData
     for (const order of data) {
        // Fetch the topping name from the server
        const pizzaResponse = await fetch(`pizza/${order.pizzaId}`);
        const pizzaData = await pizzaResponse.json();
    
        // Add the topping name to the orderDetailData object
        order.pizzaName = pizzaData.name;
      }
    
    this.setState({ order: data, loading: false });
  }

  async populateOrderDetailData() {
    const response = await fetch('orderDetail');
    const orderDetailData = await response.json();
  
    // Get the topping names from the orderDetailData
    for (const orderDetail of orderDetailData) {
      // Fetch the topping name from the server
      const toppingResponse = await fetch(`toppings/${orderDetail.toppingsId}`);
      const toppingData = await toppingResponse.json();
  
      // Add the topping name to the orderDetailData object
      orderDetail.toppingName = toppingData.name;
    }
    
    // Update the state with the order detail data
    this.setState({ orderDetail: orderDetailData });
  }
}
