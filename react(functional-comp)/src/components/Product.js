import React, { useState, useEffect } from "react";

export default function Product(props) {
  const [productObj, setProductObj] = useState({});

  useEffect(() => {
      const { id } = props.match.params;
      fetch(`http://localhost:5000/product-view/${id}`)
        .then((res) => res.json())
        .then((data) => setProductObj(data));
  },[]);

  const addToCart = () => {
    const { id } = props.match.params;

    fetch(`http://localhost:5000/shopping-cart/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
    <div style={{textAlign: "center"}}>
      <img src={productObj.img} alt="some pic" />
      <p>
        <strong> {productObj.name} </strong>
      </p>
      <p>
        <strong> $ {productObj.price} </strong>
      </p>
      <p> {productObj.description} </p>

      <button onClick={addToCart}> Add to Cart </button>
    </div>
    </div>
  );
}
