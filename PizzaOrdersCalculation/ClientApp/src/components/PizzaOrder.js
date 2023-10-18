import React, { Component } from "react";

export class PizzaOrder extends Component {
    static displayName = PizzaOrder.name;

    constructor(props) {
        super(props);
        this.state = {
            pizza: [],
            loading: true,
            selectedName: "",
            orderPrice: 0,
            pizzaPrice: 0,
            selectedSize: "",
            selectedId: "",
            toppings: [],
            orderDiscount: 1,
            toppingsPrice: 0,
            selectedToppings: [],
        };
        this.submitOrder = this.submitOrder.bind(this);
    }

    componentDidMount() {
        this.populatePizzaData();
        this.getToppings();
    }

    async populatePizzaData() {
        const response = await fetch("pizza");
        const data = await response.json();
        console.log(data);
        this.setState({ pizza: data, loading: false, selectedName: `${data[0].name} - ${data[0].size}`, selectedId: data[0].id, pizzaPrice: data[0].price,  orderPrice: (data[0].price).toFixed(2) });
    }

    async getToppings() {
        const response = await fetch("toppings");
        const data = await response.json();
        this.setState({ toppings: data });
    }

    handleSelectNameChange = (event) => {
        const selectedName = event.target.value;
        let orderCalculatedPrice;

        // Find the pizza object that matches the selected name and size
        const selectedPizza = this.state.pizza.find(pizza => {
            return `${pizza.name} - ${pizza.size}` === selectedName;
        });

        if (selectedPizza) {
            this.setState(
                {
                  selectedName: selectedName,
                  selectedId: selectedPizza.id,
                  pizzaPrice: selectedPizza.price,
                },
                async () => {
                    const orderPrice = await this.calculateOrderPrice(
                      this.state.pizzaPrice,
                      this.state.toppingsPrice,
                      this.state.orderDiscount
                    );
              
                    this.setState({ orderPrice: orderPrice });
                  }
                );
        }
    };

    handleSelectSizeChange = (event) => {
        this.setState({ selectedSize: event.target.value });
    };
    handleToppingsChange = (event) => {
        let toppingsTotalPrice = this.state.toppingsPrice;
        const selectedOptions = event.target.selectedOptions;
        const selectedToppings = Array.from(selectedOptions).map((option) => ({
            id: option.getAttribute("data-id"),
            name: option.value,
        }));

        this.setState((prevState) => ({
            selectedToppings: [...prevState.selectedToppings, ...selectedToppings],
          }), () => {
            this.setState({ toppingsPrice: toppingsTotalPrice + 1 }, () => {
              if (this.state.selectedToppings.length >= 3) {
                this.setState({ orderDiscount: 0.9 }, () => {
                    (async () => {
                        const orderPrice = await this.calculateOrderPrice(
                          this.state.pizzaPrice,
                          this.state.toppingsPrice,
                          this.state.orderDiscount
                        );
                  
                        this.setState({ orderPrice: orderPrice });
                      })();
                });
              } else {
                (async () => {
                  const orderPrice = await this.calculateOrderPrice(
                    this.state.pizzaPrice,
                    this.state.toppingsPrice,
                    this.state.orderDiscount
                  );
            
                  this.setState({ orderPrice: orderPrice });
                })();
              }
            });
          });
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

    isToppingDisabled = (toppingName) => {
        return this.state.selectedToppings.some(
            (selectedTopping) => selectedTopping.name === toppingName
        );
    };

    async calculateOrderPrice(pizzaPrice, toppingsPrice, orderDiscount){
        const request = {
            pizzaPrice: pizzaPrice,
            toppingsPrice: toppingsPrice,
            orderDiscount: orderDiscount,
        };
        try {
            const orderCalculationResponse = await fetch("discountCalculation/orderPrice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });
            const responseData = await orderCalculationResponse.json();
            console.log(responseData);
            return responseData;
            
        } catch (error) {
            // Handle errors
        }
        
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
                    <span className="select-label">Toppings</span>
                    <select
                        id="toppings-select"
                        multiple
                        onChange={this.handleToppingsChange}
                        disabled={this.state.loading}
                    >
                        {this.state.toppings &&
                            this.state.toppings.map((topping) => (
                                <option
                                    key={topping.id}
                                    value={topping.name}
                                    data-id={topping.id}
                                    disabled={this.isToppingDisabled(topping.name)}
                                >
                                    {topping.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <p>Selected Toppings:</p>
                    {this.state.selectedToppings && this.state.selectedToppings.length > 0 ? (
                        this.state.selectedToppings.map((topping, index) => (
                            <span key={topping.id}>{topping.name}, </span>
                        ))
                    ) : (
                        <span>No toppings selected</span>
                    )}
                </div>
                <div>
                    <p>Order price</p>
                    <span>{this.state.orderPrice}</span>
                </div>
                {this.state.isLoading && (
                    <div>Loading toppings...</div>
                )}

                <button onClick={this.submitOrder}>Submit Order</button>
            </div>

        );
    }

    async submitOrder() {
        let orderId;
        const today = new Date();
        const formattedDate = today.toISOString().substring(0, 10);
        console.log(formattedDate);

        // Prepare the order object
        const order = {
            pizzaName: this.state.selectedName,
            pizzaId: this.state.selectedId,
            pizzaPrice: this.state.orderPrice,
            OrderDate: formattedDate,
        };
        // Send the order data to the server
        const orderResponse = await fetch("orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        if (orderResponse.status === 200) {
            const responseData = await orderResponse.json();
            orderId = responseData.orderId;
            console.log(this.state.selectedToppings);

            for (const selectedTopping of this.state.selectedToppings) {
                console.log(orderId);
                const orderDetail = {
                    orderId: orderId,
                    toppingsId: selectedTopping.id,
                };

                // Send the order detail data to the server
                const orderDetailResponse = await fetch("orderDetail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderDetail),
                });
            }
        } else {
            alert('Order was not created');
        }
    }
}