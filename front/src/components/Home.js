import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  state = {
    arr: [ ]
  };

  componentDidMount() {
    fetch("/product-list/")
      .then(res => res.json())
      .then(arr => this.setState({ arr }));
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {this.state.arr.map(x => (
          <div key={x.id}>
            <img src={x.img} alt="" />
            <p> {x.name} </p>
            <p> $ {x.price} </p>
            <Link to={`/product/${x.id}`}> view product </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Home
