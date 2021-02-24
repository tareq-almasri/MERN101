import React, { Component, Fragment } from "react";

class Cart extends Component {
  state = {
    arr: []
  };

  componentDidMount() {
    fetch("http://localhost:5000/shopping-cart")
      .then(res => res.json())
      .then(data => this.setState({ arr: data }));
  }

 
    updateQuantity = (id, event) => {
      fetch(`http://localhost:5000/shopping-cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: event.target.value }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          console.log( data );
          fetch("http://localhost:5000/shopping-cart")
          .then(res => res.json())
          .then(data => this.setState({ arr: data }));
        });
    };
  
    totalPrice=()=>{
      return this.state.arr.reduce((sum,x)=>{sum+=x.quantity*x.price; return sum},0)
    }

  deleteFromCart = (id) => {
    fetch(`http://localhost:5000/shopping-cart/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log( data );
        fetch("http://localhost:5000/shopping-cart")
        .then(res => res.json())
        .then(data => this.setState({ arr: data }));
      });;
  };

  render() {
    return (
      <Fragment>
        {this.state.arr.map(x => (
          <div
            key={x._id}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <img src={x.img} style={{ width: "40px" }} alt="some pic" />
            <p> {x.name} </p>
            <p> $ {x.price} </p>

            <input
              onChange={this.updateQuantity.bind(this, x._id)}
              type="number"
              min="1"
              value={x.quantity}
            />

            <button onClick={this.deleteFromCart.bind(this, x._id)}>
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
