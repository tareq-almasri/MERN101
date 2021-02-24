import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  state = {
    arr: [ ]
  };

  componentDidMount() {
    fetch("http://localhost:5000/product-list/")
      .then(res => res.json())
      .then(arr => this.setState({ arr: arr }));
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "100%" }}>
        {this.state.arr.map(x => (
          <div key={x._id}>
            <img src={x.img} alt="some pic" />
            <p> {x.name} </p>
            <p> $ {x.price} </p>
            <Link to={`/product/${x._id}`}> view product </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Home
