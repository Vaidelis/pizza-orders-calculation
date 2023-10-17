import React, { Component } from "react";

export class PizzaOrder extends Component {
  static displayName = PizzaOrder.name;

  constructor(props) {
    super(props);
    this.state = {
      pizza: [],
      loading: true,
      selectedName: "",
      selectedPrice: "",
      selectedSize: "",
    };
  }

  componentDidMount() {
    this.populatePizzaData();
  }

  async populatePizzaData() {
    const response = await fetch("pizza");
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

  renderMergedSelect = () => {
    const mergedPizza = this.state.pizza.map((pizza) => ({
      id: pizza.id,
      name: `${pizza.name} - ${pizza.size}`,
    }));

    return (
      <select
        value={this.state.selectedName}
        onChange={this.handleSelectNameChange}
      >
        {mergedPizza.map((pizza) => (
          <option key={pizza.id}>{pizza.name}</option>
        ))}
      </select>
    );
  };

  render() {
    return (
      <div>
        <h1>Pizza Order</h1>
        <p>Select pizza</p>
        <div className="select-container">
          <span className="select-label">Pizza</span>
          {this.renderMergedSelect()}
        </div>
        <div className="select-container">
          <span className="select-label">Pizza Price</span>
          <select
            id="pizza-price-select"
            value={this.state.selectedPrice}
            onChange={this.handleSelectPriceChange}
          >
            <option value="">All prices</option>
            {this.state.pizza.map((pizza) => (
              <option key={pizza.id}>{pizza.price}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}