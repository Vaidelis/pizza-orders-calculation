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
            <th>Order id</th>
            <th>Price</th>
            <th>Pizza id</th>
            <th>Pizza toppings</th>
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
                //console.log(orderDetail[i].orderId);
            
                // If a matching orderDetail is found, join the toppings
                if (Array.isArray(orderDetail[i].toppingsId)) {
                    toppings += orderDetail[i].toppingsId.map(id => id.toString()).join(', ');
                  } else if (orderDetail[i].toppingsId) {
                    toppings += orderDetail[i].toppingsId.toString();
                  }
              }
            }
  
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.pizzaPrice}</td>
                <td>{order.pizzaId}</td>
                <td>{toppings}</td>
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
    this.setState({ order: data, loading: false });
  }

  async populateOrderDetailData() {
    const response = await fetch('orderDetail');
    const data = await response.json();
    this.setState({ orderDetail: data, loading: false });
  }
}
