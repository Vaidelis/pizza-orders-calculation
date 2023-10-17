import React, { Component } from 'react';

export class OrderList extends Component {
  static displayName = OrderList.name;

  constructor(props) {
    super(props);
    this.state = { pizza: [], loading: true };
  }

  componentDidMount() {
    this.populateOrderData();
  }

  static renderOrderTable(pizza) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Order id</th>
            <th>Price</th>
            <th>Pizza id</th>
          </tr>
        </thead>
        <tbody>
          {pizza.map(pizza =>
            <tr key={pizza.id}>
              <td>{pizza.id}</td>
              <td>{pizza.pizzaPrice}</td>
              <td>{pizza.pizzaId}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : OrderList.renderOrderTable(this.state.pizza);

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
    console.log(data);
    this.setState({ pizza: data, loading: false });
  }
}
