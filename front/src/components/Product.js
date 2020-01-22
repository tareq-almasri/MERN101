import React, { Component } from 'react'

class Product extends Component {
  state = {
    productObj: {}
  };

  componentDidMount(){
      const {id}=this.props.match.params
      fetch(`/product-view/${id}`)
        .then(res => res.json())
        .then(productObj => this.setState({ productObj }));
  }

  addToCart=()=>{

      const { id } = this.props.match.params;

      fetch(`/shopping-cart/${id}`, {
        method: "POST"
      })
        .then(response => response.json())
        .then(json => console.log(json));
  }

  render() {
    return (
      <div>
        <img src={this.state.productObj.img} />
        <p><strong> {this.state.productObj.name} </strong></p>
        <p><strong> $ {this.state.productObj.price} </strong></p>
        <p> {this.state.productObj.description} </p>
        <button onClick={this.addToCart.bind(this)} > Add to Cart </button>
      </div>
    );
  }
}

export default Product
