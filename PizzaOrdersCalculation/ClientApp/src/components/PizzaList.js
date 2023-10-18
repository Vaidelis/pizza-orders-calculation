import React, { Component } from 'react';

export class PizzaList extends Component {
  static displayName = PizzaList.name;

  constructor(props) {
    super(props);
    this.state = { pizza: [], loading: true };
  }

  componentDidMount() {
    this.populatePizzaData();
  }

  static renderPizzaTable(pizza) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {pizza.map(pizza =>
            <tr key={pizza.id}>
              <td>{pizza.name}</td>
              <td>{pizza.size}</td>
              <td>{pizza.price}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : PizzaList.renderPizzaTable(this.state.pizza);

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
