import React, { Component } from 'react';

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
    console.log(orderDetail);
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Pizza name</th>
            <th>Price</th>
            <th>Pizza toppings</th>
            <th>Order date</th>
          </tr>
        </thead>
        <tbody>
          {order.map(order => {
            // Initialize toppings as an empty string
            let toppings = "";

            //console.log(order.id);
  
            // Find the orderDetail for the current order
            for (let i = 0; i < orderDetail.length; i++) {
              if (orderDetail[i] && orderDetail[i].orderId === order.id) {
                toppings += orderDetail[i].toppingName.toString() + ', ';          
              }
            }
  
            return (
              <tr key={order.id}>
                <td>{order.pizzaName}</td>
                <td>{order.pizzaPrice}</td>
                <td>{toppings}</td>
                <td>{order.orderDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    
      console.log(data);

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
  
    console.log(orderDetailData);
  
    // Update the state with the order detail data
    this.setState({ orderDetail: orderDetailData });
  }
}
