import React, { Component } from 'react';

export class PizzaList extends Component {
  static displayName = PizzaList.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populatePizzaData();
  }

  static renderForecastsTable(forecasts) {
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
          {forecasts.map(forecast =>
            <tr key={forecast.id}>
              <td>{forecast.name}</td>
              <td>{forecast.size}</td>
              <td>{forecast.price}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : PizzaList.renderForecastsTable(this.state.forecasts);

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
    this.setState({ forecasts: data, loading: false });
  }
}
