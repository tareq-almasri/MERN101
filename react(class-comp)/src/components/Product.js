import React, { Component } from 'react'

class Product extends Component {
  state = {
    productObj: {}
  };

  componentDidMount(){
      const {id}=this.props.match.params
      fetch(`http://localhost:5000/product-view/${id}`)
        .then(res => res.json())
        .then(productObj => this.setState({ productObj }));
  }

  addToCart=()=>{

      const { id } = this.props.match.params;

      fetch(`http://localhost:5000/shopping-cart/${id}`, {
        method: "POST"
      })
        .then(response => response.json())
        .then(json => console.log(json));
  }

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
        <div style={{textAlign: "center"}}>
        <img src={this.state.productObj.img} />
        <p><strong> {this.state.productObj.name} </strong></p>
        <p><strong> $ {this.state.productObj.price} </strong></p>
        <p> {this.state.productObj.description} </p>
        <button onClick={this.addToCart} > Add to Cart </button>
      </div>
      </div>
    );
  }
}

export default Product
