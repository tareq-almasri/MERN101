import React, { Component, Fragment } from "react";

class Cart extends Component {
  state = {
    arr: []
  };

  componentDidMount() {
    fetch("/shopping-cart")
      .then(res => res.json())
      .then(arr => this.setState({ arr }));
  }

 
    updateQuantity = (id, event) => {
      fetch(`/shopping-cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: event.target.value }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(arr => this.setState({ arr }));
    };
  
    totalPrice=()=>{
      return this.state.arr.reduce((sum,x)=>{sum+=x.quantity*x.price; return sum},0)
    }

  deleteFromCart = (id) => {
    fetch(`/shopping-cart/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(arr => this.setState({ arr }));
  };

  render() {
    return (
      <Fragment>
        {this.state.arr.map(x => (
          <div
            key={x.id}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <img src={x.img} style={{ width: "40px" }} alt="" />
            <p> {x.name} </p>
            <p> $ {x.price} </p>

            <input
              onChange={this.updateQuantity.bind(this, x.id)}
              type="number"
              min="1"
              value={x.quantity}
            />

            <button onClick={this.deleteFromCart.bind(this, x.id)}>
               Delete
            </button>
          </div>
        ))}
        <span> Total: </span>
        <input style={{margin: "50px"}}
          type="number"
          disabled
          value={this.totalPrice()}
        />$
      </Fragment>
    );
  }
}

export default Cart;
