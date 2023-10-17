import React, { Component } from 'react';

export class PizzaOrder extends Component {
  static displayName = PizzaOrder.name;

  constructor(props) {
    super(props);
    this.state = {
      pizza: [],
      loading: true,
      selectedName: '',
      selectedPrice: '',
      selectedSize: '',
    };
  }

  componentDidMount() {
    this.populatePizzaData();
  }

  async populatePizzaData() {
    const response = await fetch('pizza');
    const data = await response.json();
    this.setState({ pizza: data, loading: false });
  }

  handleSelectNameChange = (event) => {
    this.setState({ selectedName: event.target.value });
  };

  handleSelectPriceChange = (event) => {
    this.setState({ selectedPrice: event.target.value });
  };

  handleSelectSizeChange = (event) => {
    this.setState({ selectedSize: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Pizza Order</h1>
        <p>Select pizza</p>
        <select
          value={this.state.selectedName}
          onChange={this.handleSelectNameChange}
        >
          <option value="">All names</option>
          {this.state.pizza.map((pizza) => (
            <option key={pizza.id}>{pizza.name}</option>
          ))},
        </select>
        <select
          value={this.state.selectedPrice}
          onChange={this.handleSelectPriceChange}
        >
          <option value="">All prices</option>
          {this.state.pizza.map((pizza) => (
            <option key={pizza.id}>{pizza.price}</option>
          ))},
        </select>
        <select
          value={this.state.selectedSize}
          onChange={this.handleSelectSizeChange}
        >
          <option value="">All sizes</option>
          {this.state.pizza.map((pizza) => (
            <option key={pizza.id}>{pizza.size}</option>
          ))},
        </select>
       
      </div>
    );
  }
}